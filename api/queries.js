const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cognixia-test',
    password: '',
    port: 5432
})

const getBooks = (request, response) => {
    pool.query(`SELECT * FROM books ORDER BY book_id ASC`, (error, results) => {
        if (error) {
            throw error;
        }

        response.status(200).json(results.rows);
    })
}

const getBook = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(`SELECT * FROM books WHERE book_id = $1`, [id], (error, results) => {
        if (error) {
            throw error;
        }

        response.status(200).json(results.rows);
    })
}

// const findBookByISBN = async (isbn) => {
//     await pool.query(`SELECT * FROM books WHERE isbn = $1 LIMIT 1`, [isbn], (error, results) => {
//         if (error) {
//             throw error;
//         }

//         console.log(results.rows);
//         return results.rows;
//     })
// }

const createBook = (request, response) => {
    const { isbn, title, author } = request.body;

    // const book = findBookByISBN(isbn);
    // console.log(book);
    
    pool.query(`INSERT INTO books(isbn, title, author) VALUES ($1, $2, $3)`, [isbn, title, author], (error, results) => {
        if (error) {
            response.status(409).send(`Book with ISBN: ${isbn} already exists`);
        }

        response.status(201).send(`book added`);
    })

}

const updateBook = (request, response) => {
    const id = parseInt(request.params.id);
    const { title, author, isbn } = request.body;

    pool.query(`UPDATE books SET title=$1, author=$2, isbn=$3 WHERE book_id=$4`, [title, author, isbn, id], (error, results) => {
        if (error) {
            throw error;
        }

        response.status(200).send(`Book modified.`);
    })
}

const deleteBook = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(`DELETE FROM books WHERE book_id = $1`, [id], (error, results) => {
        if (error) {
            throw error;
        }

        response.status(200).send(`Book deleted.`)
    })
}

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const db = require('./api/queries');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres'})
})

app.get('/books', db.getBooks);

app.get('/books/:id', db.getBook);

app.post('/books', db.createBook);

app.patch('/books/:id', db.updateBook);

app.delete('/books/:id', db.deleteBook);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
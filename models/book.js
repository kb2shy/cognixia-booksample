module.exports = class Book {
    constructor(isbn, title, author) {
        this._isbn = isbn;
        this._title = title;
        this._author = author;
    }

    get isbn() {
        return this._isbn;
    }

    get title() {
        return this._title;
    }

    get author() {
        return this._author
    }

    set isbn(isbn) {
        this._isbn = isbn;
    }

    set title(title) {
        this._title = title;
    }

    set author(author) {
        this._author = author;
    }
}
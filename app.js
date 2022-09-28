// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'Book One',
                author: 'Barack Obama',
                isbn: '4078829121'
            },
            {
                title: 'Book Two',
                author: 'Michelle Obama',
                isbn: '3129932013'
            }
        ];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.classList.add('alert')
        div.classList.add(className)
        div.classList.add('mt-2')
        div.innerText += message;
        const formTop = document.querySelector('#book-form');
        formTop.prepend(div);

        // Vanish after 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}
// Store Class: Handles Storage 

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {

    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill out all fields.', 'alert-danger')
    } else {
        // Instatiate book
        const book = new Book(title, author, isbn);

        UI.addBookToList(book);
        UI.clearFields();
        UI.showAlert('Book sucessfully added!', 'alert-success')
    }
}) 

// Event: Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    UI.showAlert('Book removed!', 'alert-success');
})
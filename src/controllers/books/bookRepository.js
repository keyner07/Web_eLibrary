const mongoose = require('mongoose');
const Book = require('../../models/bookModel');


function listAllBooks(){
    try {
        return Book.find({isActive: true},{_id:0});
    }catch(err){
        console.error(`[bookRepository][listAllBooks] ${err}`);
    }
}

function createBook(Book) {
    let addBook = new Book({
        title: Book.title,
        author: Book.author,
        urlTxt: Book.urlTxt,
        urlMp3: Book.urlMp3,
        isActive: Book.isActive
    })
    try {
        return addBook.save();
    }
    catch(err) {
        console.error(`[bookRepository][createBook] ${err}`);
    }
}
// db.products.update({tipo:"HDD"},{$set:{cantidad:10}},{multi:true});

function updateBook(idBook, Book) {
    
}

function validationBook(book) {
    if(book.title){
        
    }
}

function deleteBook(idBook){
    try {
        return Book.deleteOne({_id: idBook});

    } catch(err) {
        console.error(`[bookRepository][deleteBook] ${err}`);
    }
}

module.exports = {
    listAllBooks,
    createBook,
    deleteBook
}
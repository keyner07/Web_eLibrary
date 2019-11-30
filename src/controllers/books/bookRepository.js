const mongoose = require('mongoose');
const bookModel= require('../../models/bookModel');


function listAllBooks(){
    try {
        return bookModel.find({isActive: true}, {  isActive:0, __v: 0});
    }catch(err){
        console.error(`[bookRepository][listAllBooks] ${err}`);
    }
}

function getBook(idBook) {
    try {
        return bookModel.findOne({_id: idBook, isActive: true}, { isActive: 0, __v: 0});
    }catch(err){
        console.error(`[getBook][bookRepository] ${err}`);
    }
}

function createBook(Book) {
    let addBook = new bookModel({
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
        return bookModel.updateOne({_id: idBook}, {$set:{isActive: false}});

    } catch(err) {
        console.error(`[bookRepository][deleteBook] ${err}`);
    }
}
function searchBook(query) {
    try {
        return bookModel.find({ title: { $regex: `.*${query}.*`}}, { isActive: true, __v: 0});
    }catch(err) {
        console.error(`[searchBook][bookRepository] ${err}`);
    }
}

module.exports = {
    listAllBooks,
    create: createBook,
    deleteBook,
    findBook: getBook,
    search: searchBook
}
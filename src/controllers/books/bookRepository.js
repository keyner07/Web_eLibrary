const mongoose = require('mongoose');
const bookModel= require('../../models/bookModel');

// Esta funcion interactua con la DB y busca todos los libros disponibles.
function listAllBooks(){
    try {
        return bookModel.find({isActive: true}, {  isActive:0, __v: 0});
    }catch(err){
        console.error(`[bookRepository][listAllBooks] ${err}`);
    }
}

// Esta funcion busca un libro por medio del id.
function getBook(idBook) {
    try {
        return bookModel.findOne({_id: idBook, isActive: true}, { isActive: 0, __v: 0});
    }catch(err){
        console.error(`[getBook][bookRepository] ${err}`);
    }
}

// Esta funcion guarda los datos del libro en la DB.
function createBook(Book) {
    let addBook = new bookModel({
        title: Book.title,
        author: Book.author,
        urlTxt: Book.urlTxt,
        urlMp3: Book.urlMp3,
        isActive: Book.isActive,
        createdBy: Book.createdBy
    })
    try {
        return addBook.save({__v: 0, isActive: 0});
    }
    catch(err) {
        console.error(`[bookRepository][createBook] ${err}`);
    }
}
// db.products.update({tipo:"HDD"},{$set:{cantidad:10}},{multi:true});

function updateBook(idBook, title, author) {
    try {
        if(title && author){
            return bookModel.updateOne({_id: idBook}, {$set: { title: updateBook.title, author: updateBook.author}});
        }
        else if(author) {
            return bookModel.updateOne({_id: idBook}, {$set: { author: updateBook.author}});
        }
        else if( title){
            return bookModel.updateOne({_id: idBook}, {$set: { title: updateBook.title}});
        }
    } catch(err) {
        console.error(`[bookRepository][updateBook] ${err}`);
    }
}


// Aqui eliminamos el libro.
function deleteBook(idBook){
    try {
        return bookModel.updateOne({_id: idBook}, {$set:{isActive: false}});

    } catch(err) {
        console.error(`[bookRepository][deleteBook] ${err}`);
    }
}

// Aqui buscamos un libro por el titulo.
function searchBook(query) {
    const userRegex = new RegExp(query, 'i');
    // { $regex: `/.*${query}.*/i`}
    let query1 = `/^${query}/`
    try {
        return bookModel.find({ title: query1 }, { isActive: 0, __v: 0});
    }catch(err) {
        console.error(`[searchBook][bookRepository] ${err}`);
    }
}

module.exports = {
    listAllBooks,
    create: createBook,
    deleteBook,
    findBook: getBook,
    search: searchBook,
    updateBook
}
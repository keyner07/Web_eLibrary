const Book = require('./book').Book;
const bookCTRL = require('./bookRepository');
const services = require('../../auth/services');
const uploadGCS = require('../../GCS/uploadFileGCS');


// Aqui mostramos todos los libros disponibles.
exports.AllBooks = async function(req, res, next) {
    try {
        let result = await bookCTRL.listAllBooks();
        res
            .status(200)
            .send( result );
    } catch(err) {
        res
            .status(500)
            .json({ message: 'Ha ocurrido un error'});
    }
}

// Aqui guardamos los datos del libro en el objecto Book y lo guardamos en la base de datos.
exports.createBook = async function(req, res, next) {
    let createBook = new Book(req.body.title, req.body.author, req.body.publicUrlTxt, req.body.publicUrlmp3, true, req.createdBy);
    try {
        const resultBook = await bookCTRL.create(createBook);
        res
            .status(200)
            .json( resultBook )
            .end();
            // console.log(resultBook);
    }catch(err) {
        console.log(err);
        res
            .status(500)
            .json({ message: 'Ha ocurrido un error book network'});
            next();
    }
}

// Aqui borramos el libro de la base de datos.
exports.deleteBook = async function(req, res, next) {
    try {
        let result = await bookCTRL.deleteBook(req.params.idBook);
        res
            .status(200)
            .json( result );
    }catch(err){
        console.error(`[deleteBook][bookNetwork] ${err}`);
        res
            .status(500)
            .json({ message: 'Ha ocurrido un error. '})
            next();
    }
}

// Buscamos un libro por su id.
exports.findBookId = async function(req, res, next) {
    try {
        let result = await bookCTRL.findBook(req.params.idBook);
        res 
            .status(200)
            .json( result );
    }catch(err) {
        res
            .status(500)
            .json({ message: 'Ha ocurrido un error. '});
    }
}

// Para buscar un libro por su titulo.
exports.searchBook = async function(req, res, next) {
    console.log(req.query.search);
    try {
        let result = await bookCTRL.search(req.query.search);
        res
            .status(200)
            .json( result );
    }catch(err) {
        res
            .status(500)
            .json({ message: 'Estamos trabajando'});
            next();
    }
}

// Para editar un libro ya sea el titulo o el autor
exports.updateBook = async function(req, res, next) {
    try {
        let result = await bookCTRL.updateBook(req.params.idBook, req.body.title, req.body.author);
        res
            .status(200)
            .json({ result });
    } catch(err) {
        res
            .status(500)
            .json({ message: 'Ha ocurrido un error'});
            next();
    }
}


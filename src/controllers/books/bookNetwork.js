const Book = require('./book').Book;
const bookCTRL = require('./bookRepository');
const services = require('../../auth/services');
const uploadGCS = require('../../GCS/uploadFileGCS');


exports.AllBooks = async function(req, res, next) {
    try {
        let result = await bookCTRL.listAllBooks();
        res
            .status(200)
            .send({ result });
    } catch(err) {
        res
            .status(500)
            .json({ message: 'Ha ocurrido un error'});
    }
}
exports.createBook = async function(req, res, next) {
    let createBook = new Book(req.body.title, req.body.author, req.body.publicUrlTxt, req.body.publicUrlmp3, true);
    try {
        // console.log(req.body);
        const resultBook = await bookCTRL.create(createBook);
        res
            .status(200)
            .json({ resultBook })
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

exports.deleteBook = async function(req, res, next) {
    try {
        let result = await bookCTRL.deleteBook(req.query.idBook);
        res
            .status(200)
            .json({ result });
    }catch(err){
        console.error(`[deleteBook][bookNetwork] ${err}`);
        res
            .status(500)
            .json({ message: 'Ha ocurrido un error. '})
            next();
    }
}

exports.findBookId = async function(req, res, next) {
    try {
        let result = await bookCTRL.findBook(req.params.idBook);
        res 
            .status(200)
            .json({ result });
    }catch(err) {
        res
            .status(500)
            .json({ message: 'Ha ocurrido un error. '});
    }
}

exports.searchBook = async function(req, res, next) {
    console.log(req.query.search);
    try {
        let result = await bookCTRL.search(req.query.search);
        res
            .status(200)
            .json({ result });
    }catch(err) {
        res
            .status(500)
            .json({ message: 'Ha  ocurrido un error'});
            next();
    }
}


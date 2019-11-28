const Book = require('./book').Book;
const bookCTRL = require('./bookRepository');
const services = require('../../auth/services');
const uploadGCS = require('../../GCS/uploadFileGCS');


exports.AllBooks = async function(req, res, next) {
    res.json({message: 'Perfecto'});
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


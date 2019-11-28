const Book = require('./book').Book;
const bookCTRL = require('./bookRepository');
const services = require('../../auth/services');
const uploadGCS = require('../../GCS/uploadFileGCS');


exports.AllBooks = async function(req, res, next) {
    res.json({message: 'Perfecto'});
}


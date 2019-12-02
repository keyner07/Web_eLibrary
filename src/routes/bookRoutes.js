const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/middleware');
const multer = require('multer');
const { memoryStorage } = require('multer');
const upload = require('../GCS/uploadFileGCS');
const bookNetwork = require('../controllers/books/bookNetwork');
const TTS = require('../GCS/text-to-speech');

// Uso multer para que procese el archivo y lo guarde en 
// req.files.
const m = multer({
  storage: memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no mayor a 5mb el archivo txt
  }
});

// Procesa el archivo txt, lo sube a Google cloud Storage, tambien sube el audio generado y guarda los datos en la base de datos.
  router.post("/uploadBook", middleware.ensureAuthenticated,middleware.isAdmin, m.single("file"),upload.UploadFile,TTS.uploadAudio, bookNetwork.createBook);

// Esta es la ruta que muestra todos los libros disponibles.
  router.get('/listBook', middleware.ensureAuthenticated, bookNetwork.AllBooks);

// Esta ruta elimina el libro de la base de datos.
  router.delete('/:idBook', middleware.ensureAuthenticated, middleware.isAdmin, bookNetwork.deleteBook);

// Con esta ruta se puede ver un libro en especifico.
  router.get('/:idBook', middleware.ensureAuthenticated, bookNetwork.findBookId);

// Con esta ruta buscamos un libro por su titulo.
  router.get('/searchBook', middleware.ensureAuthenticated, bookNetwork.searchBook);

// Esta ruta es para editar un libro ya sea por titulo o autor
router.put('/:idBook', middleware.ensureAuthenticated, middleware.isAdmin, bookNetwork.updateBook);



module.exports = router;

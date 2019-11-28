const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/middleware');
const multer = require('multer');
const { memoryStorage } = require('multer');
const upload = require('../GCS/uploadFileGCS');
const bookNetwork = require('../controllers/books/bookNetwork');
const TTS = require('../GCS/text-to-speech');

// Multer is required to process file uploads and make them available via
// req.files.
const m = multer({
  storage: memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024 // no larger than 5mb
  }
});

// Process the file upload and upload to Google Cloud Storage.
  router.post("/upload", middleware.ensureAuthenticated,middleware.isAdmin, m.single("file"),upload.UploadFile,TTS.uploadAudio, bookNetwork.createBook);

  router.get('/m', middleware.ensureAuthenticated, bookNetwork.AllBooks);
  router.delete('/deleteBook', middleware.ensureAuthenticated, middleware.isAdmin, bookNetwork.deleteBook)



module.exports = router;

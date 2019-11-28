const { Storage } = require('@google-cloud/storage');
const express = require('express');
const path = require('path');
const moment = require('moment');
const TTS = require('./text-to-speech');

// Instantiate a storage client

exports.UploadFile = async function(req, res, next) {
  console.log(req.file.buffer);
    const googleCloudStorage = new Storage({
      projectId: process.env.GCLOUD_PROJECT,
      keyFilename: process.env.GCS_KEYFILE
    });
    let reqFileName = req.file.originalname
    let originalName = path.basename(reqFileName, path.extname(reqFileName))
    let extension = path.extname(reqFileName);
    // A bucket is a container for objects (files).
    const bucket = googleCloudStorage.bucket(process.env.GCS_BUCKET);
    let fileName = `${originalName}${moment().unix()}${extension}`
      // Create a new blob in the bucket and upload the file data.
      const blob = bucket.file(fileName);

      // Make sure to set the contentType metadata for the browser to be able
      // to render the image instead of downloading the file (default behavior)
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype
        }
      });

      blobStream.on("error", err => {
        next(err);
        return;
      });

      blobStream.on("finish", () => {
        // The public URL can be used to directly access the file via HTTP.
        // const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          // res.status(200).json({ message: `Success!\n Image uploaded to ${publicUrl}`});
          next();
        });

      blobStream.end(req.file.buffer);
}
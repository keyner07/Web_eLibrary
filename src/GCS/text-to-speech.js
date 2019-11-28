const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const { Storage } = require('@google-cloud/storage');
const moment = require('moment');

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: process.env.GCS_KEYFILE_TTS
});

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
exports.uploadAudio = async function(req,res, next) {
  let string = Buffer.from(req.file.buffer, 'hex').toString('utf8')
    const request = {
      input: {text: string},
      voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},
      audioConfig: {audioEncoding: 'MP3'},
    };
    const [response] = await client.synthesizeSpeech(request);

    //Google cloud Storage
    const storage = new Storage({
      projectId: process.env.GCLOUD_PROJECT,
      keyFilename: process.env.GCS_KEYFILE_TTS
    });

    const bucket = storage.bucket(process.env.GCS_BUCKET);
    let fileName = `${moment().unix()}.mp3`
    const blob = bucket.file(fileName);

    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: 'audio/mp3'
      }
    });

    blobStream.on("error", err => {
      console.log(err);
      return;
    });

    blobStream.on("finish", () => {
            // const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            //  console.log({ message: `Success!\n Image uploaded to ${publicUrl}`});
            next();
    });
    blobStream.end(response.audioContent);
  }

  module.exports = {
    uploadAudio
  }


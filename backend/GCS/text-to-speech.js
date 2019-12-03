const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const { Storage } = require('@google-cloud/storage');
const moment = require('moment');

// Aqui inicializamos el cliente Text To Speech
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: process.env.GCS_KEYFILE_TTS
});

// Este es el middleware para la creacion y subida del audio.
 exports.uploadAudio = async function (req, res, next) {
  let string = Buffer.from(req.file.buffer, 'hex').toString('utf8')
    const request = {
      input: {text: string},
      voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},
      audioConfig: {audioEncoding: 'MP3'},
    };
    const [response] = await client.synthesizeSpeech(request);

    //Aqui nos autenticamos con Google cloud Storage
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
      next();
    });

    blobStream.on("finish", () => {
            publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            // console.log(`[TTS] ${publicUrl}`)
            req.body.publicUrlmp3 = publicUrl;
            next();
    });
    blobStream.end(response.audioContent);
  }




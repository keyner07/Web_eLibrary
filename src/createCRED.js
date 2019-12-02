var fs=require('fs');
require('dotenv').config();

fs.writeFile(process.env.GCP_KEY_FILE, process.env.CREDS, (err) => {});
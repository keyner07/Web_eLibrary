const db = require('mongoose');



db.Promise = global.Promise;
async function connect(stringConnect) {
    await db.connect( stringConnect, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'web_eLibrary',
    });
    console.log('[db] Conectada con exito');
}

module.exports = connect;
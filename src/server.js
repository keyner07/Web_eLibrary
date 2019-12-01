const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const router = require('./routes/routes');
const db = require('./database/db');
// const middleware = require('./middlewares/middleware');

// const user = require('./routes/userRoutes');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', router);

// Con esto hacemos la conexion a la base de datos.
db(process.env.DATABASE_CONNECT_LOCALLY);


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Aqui le decimos a NodeJS en que puerto escuchara.
app.listen(process.env.PORT, ()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`);
})
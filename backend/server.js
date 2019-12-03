const express = require('express');
const bodyParser = require('body-parser');
const expressCache = require('express-cache-controller');
require('dotenv').config();
const cors = require('cors');
const router = require('./routes/routes');
const db = require('./database/db');
// const middleware = require('./middlewares/middleware');

// const user = require('./routes/userRoutes');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressCache());
app.use('/', router);

// Con esto hacemos la conexion a la base de datos.
db(process.env.DATABASE_CONNECT);

app.use(cors());
// app.use((req, res, next) => {
//     // res.header('Access-Control-Allow-Origin', '*', 'http://localhost:4200');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });


// Aqui le decimos a NodeJS en que puerto escuchara.
app.listen(process.env.PORT, ()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`);
})
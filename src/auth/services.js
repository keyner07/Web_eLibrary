const jwt = require('jsonwebtoken');
const moment = require('moment');


// Etsa funcion crea el JWT recibiendo un object User
function signToken(user){
    let payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(15, "minutes").unix(),
        admin: user.isAdmin
    }
    return jwt.sign(payload, process.env.SECRET_TOKEN_JWT);
}

// Esta funcion verifica el token y devuelve el payload(Los datos que se han guardado en el JWT)
function verifyToken(token){
    return jwt.verify(token, process.env.SECRET_TOKEN_JWT);
}


module.exports = {
    createToken: signToken,
    verifyToken
}
// Este es el npm que usamos para encriptar la password
const bcrypt = require('bcryptjs');

// Este es la funcion que encripta la password
function hashPassword(password) {
    let hash = bcrypt.hashSync(password);
    return hash;
}

// Esta funcion compara las dos password para ver si son iguales.
function comparePassword(password, passwordUser){
    let  result = bcrypt.compareSync(password, passwordUser);
    return result;
}

module.exports = {
    hashPassword,
    comparePassword
}
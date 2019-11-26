const bcrypt = require('bcryptjs');

function hashPassword(password) {
    let hash = bcrypt.hashSync(password);
    return hash;
}


function comparePassword(password, passwordUser){
    let  result = bcrypt.compareSync(password, passwordUser);
    return result;
}

module.exports = {
    hashPassword,
    comparePassword
}
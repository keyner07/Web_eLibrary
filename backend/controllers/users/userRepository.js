const mongoose = require('mongoose');
const User = require('../../models/userModel');
const encryption = require('../../auth/encryption');

// Aqui creamos un usuario
function userSignUp(userOb){
    let registerUser = new User({
        name: userOb.name,
        email: userOb.email,
        password: encryption.hashPassword(userOb.password),
        isAdmin: userOb.isAdmin
    });
    try {
        const resultUser = registerUser.save();
        return resultUser;
    }catch(err) {
        console.error(`[ERRORuserRepository] ${err}`);
    }
}

// Aqui verificamos un usuario.
function userSignIn(emailUser){
    let userData = User.findOne({ email: emailUser})
    return userData;
}

module.exports = {
    userSignUp,
    userSignIn
}


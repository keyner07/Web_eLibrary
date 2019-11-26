const mongoose = require('mongoose');
const User = require('../../models/userModel');
const service = require('../../auth/services');
const encryption = require('../../auth/encryption');


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

function userSignIn(emailUser){
    let userData = User.findOne({ email: emailUser})
    return userData;
}

module.exports = {
    userSignUp,
    userSignIn
}


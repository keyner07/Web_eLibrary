const userCTRL = require('./userRepository');
const User = require('./User').User;
const services = require('../../auth/services');
const encryption = require('../../auth/encryption');


// Aqui guardamos los datos en el objecto y lo guardamos en la base de datos.
exports.signUp = async function(req,res, next) {
    let registerUser = new User(req.body.name, req.body.email, req.body.password, (req.body.isAdmin == 1));
    try {
        const resultUser = await userCTRL.userSignUp(registerUser);
        res
            .status(201)
            .json({ message: 'Correct', token: services.createToken(resultUser)});
    }catch(err){
        res.status(500).json({message: `Ha ocurrido un error ${err}`});
        next();
    }
}


// Aqui verificamos los datos del usuario que quiere hacer login.
exports.singIn = async function(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    try {
        let userData = await userCTRL.userSignIn(email);
        if(userData){
                const resultPassword = encryption.comparePassword(password, userData.password);
                if(resultPassword){
                    res
                        .status(200)
                        .json({
                            message: `Accedio correctamente`,
                            token: services.createToken(userData)
                        })
                    }}
         }catch(err) {
             res.status(500).json({message: 'Ha ocurrido un error'});
             next();
            console.error(`[userNetwork][SignIn] ${err}`)
         }
}

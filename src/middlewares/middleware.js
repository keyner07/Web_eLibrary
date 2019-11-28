const jwt = require('../auth/services');
const moment = require('moment');

exports.ensureAuthenticated = function(req, res, next) {
  try {
  if(!req.headers.authorization) {
    return res
      .status(403)
      .json({message: "No tiene autorizacion"});
  }
  
  let token = req.headers.authorization.split(" ")[1];
  let payload = jwt.verifyToken(token);
  
  if(payload.exp <= moment().unix()) {
     return res
     	.status(401)
        .json({message: "El token ha expirado"});
  }
 
  req.body.payload= payload;
  next();
}catch(err) {
  res
    .status(401)
    .json({message: 'Acceso denegado'});
}
}

exports.isAdmin = async function(req, res, next){
  console.log(req.body.payload.admin);
  if(req.body.payload.admin){
    next();
  }else{
    res.status(401).json({ message: "No es admin"});
  }
}
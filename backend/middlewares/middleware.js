const jwt = require('../auth/services');
const moment = require('moment');

// Con este middleware verificamos las credenciales del JWT
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

// Aqui verificamos si es admin.
exports.isAdmin = async function(req, res, next){
  // console.log(req.body.payload.sub);
  if(req.body.payload.admin){
    req.createdBy = req.body.payload.sub;
    next();
  }else{
    res.status(401).json({ message: "No es admin"});
  }
}
const jwt = require('jsonwebtoken');
const moment = require('moment');

exports.ensureAuthenticated = function(req, res, next) {
  if(!req.headers.authorization) {
    return res
      .status(403)
      .json({message: "No tiene autorizacion"});
  }
  
  let token = req.headers.authorization.split(" ")[1];
  let payload = jwt.decode(token);
  
  if(payload.exp <= moment().unix()) {
     return res
     	.status(401)
        .json({message: "El token ha expirado"});
  }
  
  req.body= {
      sub: payload.sub,
      isAdmin: payload.admin
  }
  next();
}
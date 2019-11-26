const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/middleware');



router.get('/books',middleware.ensureAuthenticated, function(req, res) {
    console.log(req.body);
    if(req.body.admin){
        res.status(200).json({message: 'Eres admin'})
    }
    else if(!req.body.admin){
        res.json({message: 'No eres admin'})
    }
    else {
        res.json({message: 'No esta autorizado'})
    }
} );

module.exports = router;

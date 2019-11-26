const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/middleware');



router.get('/books',middleware.ensureAuthenticated, function(req, res) {
    if(req.body.isAdmin){
        res.status(200).json({message: 'Eres admin'})
    }
    else if(!req.body.isAdmin){
        res.json({message: 'No eres admin'})
    }
    else {
        res.json({message: 'No esta autorizado'})
    }
} );

module.exports = router;

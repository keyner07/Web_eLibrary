const express = require('express');
const router = express.Router();
const userNetwork = require('../controllers/users/userNetwork');
const bookRoutes = require('./bookRoutes');

// Creacion de un usuario.
router.post('/Sign-Up', userNetwork.signUp);

// Login de un usuario.
router.post('/Sign-In', userNetwork.singIn);

// Aqui mandamos las rutas al archivo bookRoutes.
router.use('/user', bookRoutes);

module.exports = router;
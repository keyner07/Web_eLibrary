const express = require('express');
const router = express.Router();
const userNetwork = require('../controllers/users/userNetwork');
const bookRoutes = require('./bookRoutes');

router.post('/Sign-Up', userNetwork.signUp);
router.post('/Sign-In', userNetwork.singIn);
router.use('/user', bookRoutes);

module.exports = router;
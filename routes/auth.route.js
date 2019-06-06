var express = require('express');
var router = express.Router();

const authController = require('../controllers/auth.controller')

/* GET home page. */
router.get('/register', authController.register);


module.exports = router;

const express = require("express");
const router = express.Router();
const userController = require('../controller/user_controller');

//to login
router.post('/login', userController.login);


//to register
router.post('/register',userController.register);

module.exports = router;
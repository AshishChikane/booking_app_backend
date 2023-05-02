const express = require("express");
const router = express.Router();
const userController = require('../controller/user_controller');

//to login
router.post('/login', userController.login);


//to register
router.post('/register',userController.register);


//to get profile
router.get('/profile',userController.getUser);

//to logout the user profile
router.post('/logout',userController.logoutUser);

module.exports = router;
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// to bcrypt in 10mili sec
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecretKey = 'SECRETTOKENKEYFORUSER' //jwt secret token key


//register user api
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const response = await User.create({ name, email, password: bcrypt.hashSync(password, bcryptSalt) });
        res.json(response);
    } catch (err) {
        res.status(422).json(err)
    }
}

//login user api
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await User.findOne({ email });
        // console.log(response);
        if (response) {
            const verifyPassword = bcrypt.compareSync(password, response.password)
            if (verifyPassword) {
                // console.log(verifyPassword);
                jwt.sign({email:response.email,id:response._id} ,jwtSecretKey,{},(err,token)=>{
                    if(err) throw err;
                    res.cookie('token',token).json("Login Successfull");
                })
            } else {
                res.status(422).json("Login Failed Incorrect Credentials");
            }
        } else {
            console.log("not found");
        }
    } catch (err) {
        res.status(400).json(err)
    }
}


module.exports = {
    login,
    register
}


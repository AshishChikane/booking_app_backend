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
        if (response) {
            const verifyPassword = bcrypt.compareSync(password, response.password)
            if (verifyPassword) {
                jwt.sign({email:response.email,id:response._id,name:response.name} ,jwtSecretKey,{},(err,token)=>{
                    if(err) throw err;
                    res.cookie('token',token).json();
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

const getUser = async (req,res) => {
    try{
        //after login token is generated and we are sending to cookies
        // to access it we are calling this api
        const {token} = req.cookies;
        if(token){
            jwt.verify(token,jwtSecretKey,{},(err,userData)=>{
                if(err) throw err;      //if error occurs
                res.json(userData)      // to send the data 
            })
        }else{
            res.json(null)
        }
    }catch(err){
        res.status(400).json(err)
    }
}

const logoutUser = async (req,res)=>{
    try{
        res.cookie('token','').json(true)
    }catch(err){
        throw err;
    }
}

module.exports = {
    login,
    register,
    getUser,
    logoutUser
}


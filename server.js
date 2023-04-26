const express = require('express');
const mongoose = require("mongoose");
const User = require('./models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();
const app = express();

// to bcrypt in 10mili sec
const bcryptSalt = bcrypt.genSaltSync(10);

const cors = require('cors');
const port = 4000;

//cors
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));


//mongoose
mongoose.connect(process.env.MONGO_URL);


// to parse the input
app.use(express.json());

// testing purpose
app.get('/test', (req, res) => {
    res.json("hello there");
});


//register form
app.post('/register', async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const response = await User.create({ name, email, password: bcrypt.hashSync(password, bcryptSalt) });
        res.json(response);

    } catch (err) {
        throw (err)
    }

})

app.listen(port, () => {
    console.log("Server is running on port ", port);
})
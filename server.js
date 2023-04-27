const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;
require('./config/db.config');          //database connection
//cors
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));


// to parse the input
app.use(express.json());

//Routes
const user = require('./routers/user');

//Calling routes
app.use('/user',user)

app.listen(port, () => {
    console.log("Server is running on port ", port);
})
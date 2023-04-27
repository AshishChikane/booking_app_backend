const mongoose = require("mongoose");
require('dotenv').config();

//mongoose
mongoose.connect(process.env.MONGO_URL);


const db = mongoose.connection;
db.on("error",console.error.bind(console,"Mongodb Connection error:"));
db.once("open",function(){
    console.log("Mongodb Connection Sucessfull");
})

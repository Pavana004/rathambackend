const express = require("express");
const app = express();
const port =  process.env.PORT||5000;
const mongoose = require("mongoose");
const router = require("./Api/router");
const cors = require("cors");
require("dotenv").config();

const URI = process.env.DBCONNECTION;







//connecting with database

mongoose.connect(URI,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("database start")
    }
});





//middleware
app.use(express.json());
app.use(cors())
app.use("/api",router);






//port

app.listen(port,console.log("sever port start"))
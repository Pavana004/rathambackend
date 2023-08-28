const mongoose = require("mongoose");


const deanSchema  = mongoose.Schema({
   
       deanUniversityId : {type:String,require:true},
       password : {type:String,require:true},
 
       
      

});

module.exports = mongoose.model("dean",deanSchema );
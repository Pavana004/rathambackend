const mongoose = require("mongoose");


const studentSchema  = mongoose.Schema({
   
       universityId : {type:String,require:true},
       password : {type:String,require:true},
 
       
      

});

module.exports = mongoose.model("student",studentSchema );
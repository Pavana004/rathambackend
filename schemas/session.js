const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    date: {type:String,require:true},
    time: {type:String,require:true},
    startTime: {type:Date,require:true},
    booked: {type:Boolean,require:true},
    studentID: {type:String,require:true},
});

module.exports = mongoose.model('Session', sessionSchema);
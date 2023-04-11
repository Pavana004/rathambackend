const mongoose = require("mongoose");


const schema = mongoose.Schema({

       usercomments: { type: String, require: true },



});

module.exports = mongoose.model("test_1", schema);
const mongoose = require("mongoose");



const transactionSchema = mongoose.Schema({


    senderAddress: {type: String, required: true},
    receiverAddress: {type: String, required: true},
    amount: {type: String, required: true},
    currency: {type: String, required: true},
    
},
    { timestamps: true, }
);

module.exports = mongoose.model("transactionSchema", transactionSchema);
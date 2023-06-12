const mongoose = require("mongoose");



const userSchema = mongoose.Schema({


       walletAddress: { type: String, require: true },
       userName: { type: String, require: true },
       holdings: {
              BTC: Number,
              ETH: Number,
              LTC: Number,
              USDT: Number,
              XRP: Number,
              STETH: Number,
              SOL: Number,
              TRX: Number,
              DAI: Number,
              LEO: Number,
              LINK: Number,

       },
       balance: { type: Number, require: true },
       payments: { type: String, require: true },   
       senderAddress: {type: String, required: true},
       receiverAddress: {type: String, required: true},
       amount: {type: Number, required: true},
       currency: {type: String, required: true},
},
       { timestamps: true, }
);

module.exports = mongoose.model("userSchema", userSchema);



const mongoose = require("mongoose");



const exchangeSchema = mongoose.Schema({


    BTC: { type: Number, require: true },
    ETH: { type: Number, require: true },
    LTC: { type: Number, require: true },
    USDT: { type: Number, require: true },
    XRP: { type: Number, require: true },
    STETH: { type: Number, require: true },
    SOL: { type: Number, require: true },
    TRX: { type: Number, require: true },
    DAI: { type: Number, require: true },
    LEO: { type: Number, require: true },
    LINK: { type: Number, require: true },

},
    { timestamps: true, }
);

module.exports = mongoose.model("exchangeSchema", exchangeSchema);

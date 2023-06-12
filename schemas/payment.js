const mongoose = require("mongoose");



const paymentsSchema = mongoose.Schema({


    senderWalletId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    receiverWalletId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    description: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("paymentsSchema", paymentsSchema);
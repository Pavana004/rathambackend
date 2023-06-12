const router = require("express").Router();
const user = require("../schemas/model");
const exchangeData = require("../schemas/exchangeModel");
const transaction = require("../schemas/transaction");
const paymentsTransaction = require("../schemas/payment")


// Userwallet Api


router.post("/userwallet", async (req, res) => {

    try {

        const data = new user({
            userName: req.body.userName,
            walletAddress: req.body.walletAddress,
            holdings: {
                BTC: req.body.holdings.BTC,
                ETH: req.body.holdings.ETH,
                LTC: req.body.holdings.LTC,
                USDT: req.body.holdings.USDT,
                XRP: req.body.holdings.XRP,
                STETH: req.body.holdings.STETH,
                SOL: req.body.holdings.SOL,
                TRX: req.body.holdings.TRX,
                DAI: req.body.holdings.DAI,
                LEO: req.body.holdings.LEO,
                LINK: req.body.holdings.LINK,
            },
            balance: req.body.balance,
            payments: req.body.payments,
            senderAddress: req.body.senderAddress,
            receiverAddress: req.body.receiverAddress,
            amount: req.body.amount,
            currency: req.body.currency,

        });
        const userWalletSaveData = await data.save();
        res.status(201).json(userWalletSaveData);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

});

router.get("/userwalletget", async (_, res) => {

    try {

        const userWallet = await user.find();
        res.status(200).json(userWallet);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

});

router.get("/userwalletid/:id", async (req, res) => {

    try {

        const userid = await user.findById(req.params.id);
        if (!userid) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(userid);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });

    }


})



// Exchange Api

router.post("/exchangepost", async (req, res) => {

    try {

        const data = new exchangeData(req.body);
        const exchangeSave = await data.save();
        res.status(201).json(exchangeSave);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

});




router.get("/exchangeget", async (_, res) => {

    try {

        const exchangeApi = await exchangeData.find();
        res.status(200).json(exchangeApi);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

});

router.delete("/exdelete/:id", async (req, res) => {
    try {

        await exchangeData.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete done....!!!")

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
})



// Transaction Api

router.post("/transactionpost", async (req, res) => {

    try {

        const data = new transaction(req.body);
        const transactionSave = await data.save();
        res.status(201).json(transactionSave);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

});

router.get("/transactionget", async (_, res) => {

    try {

        const transactionget = await transaction.find();
        res.status(200).json(transactionget);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

});


router.get("/usertransactionid/:id", async (req, res) => {

    try {

        const userTransactionid = await transaction.findById(req.params.id);
        if (!userTransactionid) {
            return res.status(404).json({ error: 'There is no transaction ' });
        }
        res.json(userTransactionid);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });

    }


});


router.post("/paymentpost", async (req, res) => {

    try {

        const paymentMethod = new paymentsTransaction(req.body);
        const savedPayment = await paymentMethod.save();
        res.status(201).json({
            success: true,
            message: 'Payment submitted successfully',
            payment: savedPayment
        });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });

    }


});



router.get("/paymentget", async (_, res) => {
    try {

        const paymentGetMethod = await paymentsTransaction.find();
        res.status(200).json(paymentGetMethod);


    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
})







module.exports = router;
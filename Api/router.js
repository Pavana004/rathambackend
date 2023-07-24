const router = require("express").Router();
const user = require("../schemas/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//register

router.post("/register", async (req, res) => {

    try {
        let emailExit = await user.findOne({ email: req.body.email })
        if (emailExit) {
            return res.status(400).json("Email already taken");
        }
        let psHash = await bcrypt.hash(req.body.password, 10);
        const data = new user({
            name: req.body.name,
            email: req.body.email,
            password: psHash,
        });
        let result = await data.save();
        res.json(result);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

});

//login

router.post("/login", async (req, res) => {
    try {
        let userExit = await user.findOne({ email: req.body.email })
        if (!userExit) {
            return res.status(400).json("Your Email Wrong");
        }
        let passwordValidation = await bcrypt.compare(req.body.password, userExit.password);
        if (!passwordValidation) {
            return res.status(400).json("Your Password Wrong");
        }
        const userToken = jwt.sign({ email: userExit.email, name: userExit.name,id:userExit._id }, "userinfoSecretId",{expiresIn:"2d"});
        res.header("auth",userToken).send(userToken);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });

    }
})




module.exports = router;
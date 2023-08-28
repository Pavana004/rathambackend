const jwt = require("jsonwebtoken");



const validuser = (req, res, next) => {
    const token = req.header("auth");
    if (!token) return res.status(401).send("Your not authentication");

    const data = jwt.verify(token, "userinfoSecretId")
    if (!data) return res.status(403).send("Token is not validation");
    req.user = data;
    next();

}
module.exports = validuser;
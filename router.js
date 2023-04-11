const router = require("express").Router();
const user = require("./model")






router.post("/commets", async (req, res) => {
  
    try {
        const data = new user({
            usercomments: req.body.usercomments,
        });
        const result = await data.save();
        res.json(result);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

});


router.get("/commetsget", async (_, res) => {
  
    try {
        const data = await user.find()
        res.json(data);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

});





module.exports = router;
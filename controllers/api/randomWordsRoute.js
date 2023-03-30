const router = require("express").Router();
const randomWords = require("random-words");

router.get("/", (req, res) => {
    res.send(randomWords({exactly: 200, join: " "}));
});

module.exports = router;

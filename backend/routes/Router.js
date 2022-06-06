const router = require("express").Router()

// test
router.get("/", (req, res) => {
    res.send("API working")
})

module.exports = router
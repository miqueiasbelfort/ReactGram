const router = require("express").Router()

router.use("/api/users", require("./UserRoutes"))

// test
router.get("/", (req, res) => {
    res.send("API working")
})

module.exports = router
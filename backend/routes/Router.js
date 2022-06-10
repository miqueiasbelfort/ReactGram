const router = require("express").Router()

router.use("/api/users", require("./UserRoutes"))
router.use("/api/photos", require("./PhotoRoutes"))

module.exports = router
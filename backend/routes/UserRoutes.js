const router = require("express").Router()

//controller
const {register} = require('../controllers/UserController')

//routes
router.post("/register", register)

module.exports = router

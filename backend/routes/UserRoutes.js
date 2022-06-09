const router = require("express").Router()

//controller
const {register, login, getCurrentUser} = require('../controllers/UserController')

//middlewares
const validate = require("../middlewares/handleValidation")
const {userCreateValidation, loginValidation} = require("../middlewares/userValidation")
const authGuard = require("../middlewares/authGuard")

//routes
router.post("/register", userCreateValidation(), validate, register)
router.post("/login", loginValidation(), validate, login)
router.get("/profile", authGuard, getCurrentUser)

module.exports = router

const router = require("express").Router()

//controller
const {register, login, getCurrentUser, update, getUserById} = require('../controllers/UserController')

//middlewares
const validate = require("../middlewares/handleValidation")
const {userCreateValidation, loginValidation, userUpdateValidation} = require("../middlewares/userValidation")
const authGuard = require("../middlewares/authGuard")
const {ImageUpload} = require("../middlewares/ImageUpload")

//routes
router.post("/register", userCreateValidation(), validate, register)
router.post("/login", loginValidation(), validate, login)
router.get("/profile", authGuard, getCurrentUser)
router.put("/", authGuard, userUpdateValidation(), validate, ImageUpload.single("profileImage"), update)
router.get("/:id", getUserById)


module.exports = router

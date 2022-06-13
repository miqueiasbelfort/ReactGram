const router = require("express").Router()

//controller
const {insertPhoto, deletePhoto, getAllPhotos} = require("../controllers/PhotoController")

// middlewares
const {photoInsertValidation} = require("../middlewares/photoValidation")
const authGuard = require("../middlewares/authGuard")
const validate = require("../middlewares/handleValidation")
const {ImageUpload} = require("../middlewares/ImageUpload")

//routes
router.post("/", authGuard, ImageUpload.single("image"), photoInsertValidation(), validate, insertPhoto)
router.delete("/:id", authGuard, deletePhoto)
router.get("/", authGuard, getAllPhotos)

module.exports = router
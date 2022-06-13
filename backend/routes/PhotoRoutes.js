const router = require("express").Router()

//controller
const {
    insertPhoto, 
    deletePhoto, 
    getAllPhotos, 
    getUserPhotos,
    getPhotoById,
    updatePhoto
} = require("../controllers/PhotoController")

// middlewares
const {photoInsertValidation, photoUpdatedValidation} = require("../middlewares/photoValidation")
const authGuard = require("../middlewares/authGuard")
const validate = require("../middlewares/handleValidation")
const {ImageUpload} = require("../middlewares/ImageUpload")

//routes
router.post("/", authGuard, ImageUpload.single("image"), photoInsertValidation(), validate, insertPhoto)
router.delete("/:id", authGuard, deletePhoto)
router.get("/", authGuard, getAllPhotos)
router.get("/user/:id", authGuard, getUserPhotos)
router.get("/:id", authGuard, getPhotoById)
router.put("/:id", authGuard, photoUpdatedValidation(), validate, updatePhoto)

module.exports = router
const multer = require("multer")
const path = require("path")

// Destination to store image
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = ""

        if(req.baseUrl.includes("users")){
            folder = "users"
        } else if(req.baseUrl.includes("photos")){
            folder = "photos"
        }

        cb(null, `uploads/${folder}/`) //Image destine
    },
    filename: (req, file, cb) => {

        cb(null, Data.now() + path.extname(file.originalname)) // name of photo (para projetos maiores criar um id unico seria melhor)

    }
})

const ImageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg)$/)){
            // upload only png and jpg Formats
            return cb(new Error("Por favor, envie apenas png ou jpg!"))
        }
        cb(undefined, true)
    }
})

module.exports = {ImageUpload}
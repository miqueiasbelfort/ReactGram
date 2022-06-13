const Photo = require("../models/Photo")
const User = require("../models/User")
const mongoose = require("mongoose")

//Insert a photo, with an user related to it
const insertPhoto = async(req, res) => {

    const {title} = req.body
    const image = req.file.filename

    const reqUser = req.user
    const user = await User.findById(reqUser._id)

    //create a photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name
    })

    //if photo was create successfully, return data
    if(!newPhoto){
        res.status(422).json({errors: ["Por favor tente mais tarde."]})
        return
    }

    res.status(201).json(newPhoto)
}

// Remove a photo fom DB
const deletePhoto = async (req, res) => {
    const {id} = req.params

    const reqUser = req.user

    try {
        
        const photo = await Photo.findById(mongoose.Types.ObjectId(id))

        //check if photo exists
        if(!photo){
            res.status(404).json({errors: ["Foto não encontrada!"]})
            return
        }

        //check if photo belongs to user
        if(!photo.userId.equals(reqUser._id)){
            res.status(422).json({errors: ["Ocorreu um erro, por favor tente novamente mais tarde."]})
            return
        }

        await Photo.findByIdAndDelete(photo._id)
        res.status(200).json({id: photo._id, message: "Foto excluida com sucesso."})


    } catch (error) {
        res.status(404).json({errors: ["Foto não encontrado."]})
    }
}

// Get all photos
const getAllPhotos = async (req, res) => {

    // Os mais novos no topo
    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec()

    return res.status(200).json(photos)

}

//Get user photos
const getUserPhotos = async (req, res) => {

    const {id} = req.params

    const userPhotos = await Photo.find({userId: id})
        .sort([["createdAt", -1]])
        .exec()

    return res.status(200).json(userPhotos)
 
}

//Get photo by ID
const getPhotoById = async (req, res) => {
    const {id} = req.params
    const photo = await Photo.findById(mongoose.Types.ObjectId(id))

    //check if photo exists
    if(!photo){
        res.status(404).json({errors: ["Foto não encontrada."]})
        return
    }

    res.status(200).json(photo)
}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById
}
require("dotenv").config()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Generate user token
const generateToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
};

// Register use an sign in
const register = async (req, res) => {
    const {name, email, password} = req.body

    //check if user exist
    const user = await User.findOne({email})
    if(user){
        res.status(422).json({errors: ["E-mail já cadastrado!"]})
        return
    }

    // create hash
    const salt = await bcrypt.genSalt()
    const passowrdHash = await bcrypt.hash(password, salt)

    // create user
    const newUser = await User.create({
        name, 
        email,
        password: passowrdHash
    })

    // if user was create successfully
    if(!newUser){
        res.status(422).json({errors: ["Houve um erro, por favor tente mais tarde."]})
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    });

}
const login = async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    //check if user exists
    if(!user){
        res.status(404).json({errors: ["Usuário não encontrado."]})
        return
    }

    //checl if password matches
    if(!(await bcrypt.compare(password, user.password))){
        res.status(422).json({errors: ["Senha incorreta."]})
        return
    }

    //return user with token
    res.status(200).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id)
    })
}
//Get current logged in user
const getCurrentUser = async (req, res) => {
    const user = req.user
    res.status(200).json(user)
}
const update = async (req, res) => {
    res.send("update")
}

module.exports = {
    register,
    login,
    getCurrentUser,
    update
}
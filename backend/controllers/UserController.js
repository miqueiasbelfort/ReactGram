require("dotenv").config()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const secretJwt = process.env.JWT_SCRET

// generate user token
const generateToken = (id) => {
    return jwt.sign({id}, secretJwt, {
        expiresIn: "7d"
    })
}

// Register use an sign in
const register = async (req, res) => {
    const {name, email, password} = req.body

    //check if user exist
    const user = await User.findOne({email})
    if(user){
        res.status(422).json({error: ["E-mail já cadastrado!"]})
        return
    }

    // create hash
    const salt = await bcrypt.genSalt(10)
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
        token: generateToken(newUser._id)
    })

}
const login = async (req, res) => {
    res.send("login")
}

module.exports = {
    register,
    login
}
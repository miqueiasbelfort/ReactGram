require("dotenv").config()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const secretJwt = process.env.JWT_SCRET

// generate user token
const generateToken = (id) => {
    return jwt.sing({id}, secretJwt, {
        expiresIn: "7d"
    })
}

// Register use an sign in
const register = async (req, res) => {
    res.send("register")
}

module.exports = {
    register
}
const User = require("../models/User")
const jwt = require("jsonwebtoken")

const authGuard = async (req, res, next) => {

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    //checlif header has a token
    if(!token){
        return res.status(401).json({errors: ["Acesso negado!"]})
    }

    try {
        
        const verifield = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(verifield.id).select("-password")
        next()

    } catch (error) {
        res.status(401).json({errors: ["Token inválido."]})
    }

}

module.exports = authGuard
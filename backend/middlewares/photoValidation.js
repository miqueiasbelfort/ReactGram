const {body} = require("express-validator")

const photoInsertValidation = () => {
    return [
        body("title")
            .not()
            .equals("undefined")
            .withMessage("Insira um titulo.")
            .isString()
            .withMessage("Insira um titulo.")
            .isLength({min: 3})
            .withMessage("O título preica ter no mínimo 3 caracters."),
        body("image")
            .custom((value, {req}) => {
                if(!req.file){
                    throw new Error("A imagem é obrigatória.")
                }
                return true
            })
    ]
}

module.exports = {
    photoInsertValidation
}
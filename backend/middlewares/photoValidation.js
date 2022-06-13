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

const photoUpdatedValidation = () => {
    return [
        body("title")
            .optional()
            .isString()
            .withMessage("O titulo é obrigatório.")
            .isLength({min: 3})
            .withMessage("O título preica ter no mínimo 3 caracters."),
    ]
}

const commentValidation = () => {
    return [
        body("comment")
            .isString()
            .withMessage("O comentario é obrigatório.")
    ]
}

module.exports = {
    photoInsertValidation,
    photoUpdatedValidation,
    commentValidation
}
const {body} = require("express-validator")

const userCreateValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O nome é obrigatório.")
            .isLength({min: 3})
            .withMessage("O nome precisa ter no mínimo 3 caracters."),
        body("email")
            .isString()
            .withMessage("O e-mail é obrogatório.")
            .isEmail()
            .withMessage("Insira um e-mail valido."),
        body("password")
            .isString()
            .withMessage("A senha é obrigatori.")
            .isLength({min: 5})
            .withMessage("A senha precisa ter no mínimo 5 caracters."),
        body("confirmPassword")
            .isString()
            .withMessage("Por favor confirme sua senha.")
            .custom((value, {req}) => {
                if(value != req.body.password){
                    throw new Error("As senhas não são iguais.")
                }
                return true
            })
    ]
}
const loginValidation = () => {
    return [
        body("email")
          .isString()
          .withMessage("O e-mail é obrigatório.")
          .isEmail()
          .withMessage("Insira um e-mail válido"),
        body("password").isString().withMessage("A senha é obrigatória."),
    ];
}

const userUpdateValidation = () =>{
    return [
        body("name")
            .optional()
            .isLength({min: 3})
            .withMessage("O nome precisa ter min de 3 caracteres."),
        body("password")
            .optional()
            .isLength({min: 5})
            .withMessage("A senha precisa conter no mínino 5 caracteres.")
    
    ]   
}

module.exports = {
    userCreateValidation,
    loginValidation,
    userUpdateValidation
}
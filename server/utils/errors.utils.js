module.exports.signUpErrors = (err) => {
    let errors = { name:"", email:"", password:"Mauvais mot de passe"}

    if(err.message.includes("name"))
        errors.name = "Ce nom est incorrect"

    if(err.message.includes("email"))
        errors.email = "Ce mail est incorrect"

    if(err.message.includes("password"))
        errors.password = "Mot de passe trop court, minimum 6 caractères"
    
    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("name"))
        errors.name = "Nom déjà pris"

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("mail"))
        errors.name = "Mail déjà pris"

    return errors
}

module.exports.signInErrors = (err) => {
    let errors = {email:"", password:""}

    if(err.message.includes("email"))
        errors.email = "Email inconnu"

    if(err.message.includes("password"))
        errors.password = "mot de passe inconnu"
}

module.exports.uploadErrors = (err) => {
    let errors = { format:"", maxSize:""}

    if (err.message.includes("invalid file"))
        errors.format = "format incompatible"

    if(err.message.includes("max size"))
        errors.format = "taille maximal dépassée"

    return errors
}
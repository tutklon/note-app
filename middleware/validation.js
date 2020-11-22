module.exports.registerValidation = (username, email , password) => {
    const errors = [];
    if(username === "") {
        errors.push({message: "Please fill the username area"});
    }
    if(email === "") {
        errors.push({message: "Please fill the E-mail area"});
    }
    if (password === "") {
        errors.push({message: "Please fill the password area"});
    }
    if (password.length < 6) {
        errors.push({message: "Password Minimum length must be 6"});
    }
    return errors;
}
module.exports.validateMail = (email) => {
    const errors = [];
    if (email) {
        errors.push({message: "This E-mail is used , Please try another"});
    }
    return errors;
}
module.exports.loginValidation = (email , password) => {
    const errors = [];
    if(email === "") {
        errors.push({message: "Plase fill the usernmae area"});
    }
    if(password === "") {
        errors.push({message: "Plase fill the password area"});
    }
    if (password.length < 6) {
        errors.push({message: "This password is not true"});
    }
    return errors;
}
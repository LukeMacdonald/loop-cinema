const bcrypt = require("bcrypt")
const saltRounds = 10


exports.hashedPassword = async (password) =>{
    return await bcrypt.hash(password, saltRounds);
}

exports.validateLogin = async (hashedPassword, suppliedPassword) =>{
   return await bcrypt.compare(hashedPassword, suppliedPassword)
}
exports.validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
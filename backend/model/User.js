const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');


const userSchame = mongoose.Schema({
// email unique:true
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
})

// activation uniqueValidator for email
userSchame.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchame);
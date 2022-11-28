const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
var mongodbErrorHandler = require('mongoose-mongodb-errors');


const userSchame = mongoose.Schema({
// email unique:true
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
})

// activation uniqueValidator for email
userSchame.plugin(uniqueValidator);
//for Mongoose-MongoDB-Errors
userSchame.plugin(mongodbErrorHandler);

module.exports = mongoose.model('user', userSchame);


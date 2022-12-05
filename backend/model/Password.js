const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();


passwordSchema
    .is().min(6)
    .is().max(20)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()

// passwordSchema
//     .is().min(2)

module.exports = passwordSchema;

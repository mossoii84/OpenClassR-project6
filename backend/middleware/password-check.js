const passwordSchema = require('../model/Password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'Password invalid' });
    } else {
        next();
    }
};
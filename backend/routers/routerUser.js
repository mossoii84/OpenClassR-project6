const express = require('express');
const router = express.Router();

// passwordSchema
const passwordCheck = require('../middleware/password-check');
const userCtrl = require('../controller/controllerUser')


router.post('/signup', passwordCheck, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router
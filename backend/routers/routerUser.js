const express = require('express');
const router = express.Router();

// passwordSchema
const passwordCheck = require('../middleware/password-check');
const userCtrl = require('../controller/controllerUser')
const rateLimit = require('../middleware/rateLimit');

router.post('/signup', rateLimit, passwordCheck, userCtrl.signup);
router.post('/login', rateLimit, userCtrl.login);

module.exports = router
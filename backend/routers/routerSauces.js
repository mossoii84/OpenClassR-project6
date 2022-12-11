const express = require('express');
const router = express.Router();

// authentification clients
const auth = require('../middleware/auth');
// controller sauces
const saucesController = require('../controller/controllerSauces')
// for image
const multer = require('../middleware/multer-config');


// route and methode for sauces
router.get('/sauces', auth, saucesController.getAllSaucesList);
router.get('/sauces/:id', auth,saucesController.getOneSouce);

router.post('/sauces', auth, multer, saucesController.creerOneSauce);
router.put('/sauces/:id', auth, multer, saucesController.putOneSauce);
router.delete('/sauces/:id', auth, multer, saucesController.deleteSauce)

router.post('/sauces/:id/like', auth, saucesController.likeDislike)

module.exports = router
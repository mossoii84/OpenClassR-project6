// https://helmetjs.github.io/
// dotenv
// express-rate-limit
// password-validator
// mongoose-mongodb-errors

const express = require('express');
const helmet = require('helmet');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const rateLimit = require("express-rate-limit");
const app = express();

const userRoutes = require('./routers/routerUser');
const saucesRoutes = require('./routers/routerSauces');

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP"
});


// connect via .env
mongoose.connect(process.env.My_BD,
  {   useNewUrlParser: true,
      useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !!!!'));


   // very important
   app.use(express.json()); 
   app.use(limiter);
// This sets custom options for the `referrerPolicy` middleware.
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));




// CORS 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



// user route
app.use('/api/auth', userRoutes);

// sauce route
app.use('/api', saucesRoutes)

// for image
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./routers/routerUser');
const saucesRoutes = require('./routers/routerSauces');

// connect BD
mongoose.connect('mongodb+srv://user:user@cluster0.1gz0n7s.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// very important
  app.use(express.json()); 

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

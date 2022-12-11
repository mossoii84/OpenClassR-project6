const User= require('../model/User');
const bcrypt = require('bcrypt'); //import modul bcrypt
const jwt = require('jsonwebtoken'); 
require('dotenv').config();


exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
      })
    .catch(error => {res.status(500).json({ error });
    });
};

//checking(verifier) login password client he join via form
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) //find his email in the database
        .then(data => {
            if (!data) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            bcrypt.compare(req.body.password, data.password) //compare data from forms and database
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: data._id,
                        token: jwt.sign(    //cree token
                            { userId: data._id },
                            process.env.TOKEN_SECRET,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(403).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};





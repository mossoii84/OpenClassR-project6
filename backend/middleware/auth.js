const jwt = require('jsonwebtoken'); 

// compare token on the pages
module.exports = (req, res, next) => {
   try {

       //bearer 
       const token = req.headers.authorization.split(' ')[1];

       const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

       // extract the user id from our token
       const userId = decodedToken.userId;
       
       if (req.body.userId  && (req.body.userId != userId)) {
        throw 'Invalid user ID';
      }
       else {
        authUser = userId; // donne value notre UserId pour utilisé apres dans la controller
        next();
      }
   
   } catch(error) {
       res.status(401).json({ error });
   }
};
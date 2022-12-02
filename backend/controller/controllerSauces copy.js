const Sauce= require('../model/Sauce');

//modul - to manage the file system (images) 
const fs = require('fs');


exports.getAllSaucesList = (req, res, next) => {
        Sauce.find() // Find all in database
            .then(sauces => res.status(200).json(sauces))
            .catch(error => res.status(400).json({ error }));
    };


exports.getOneSouce = (req,res,next)=> {
    Sauce.findOne({ _id: req.params.id })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(400).json({ error }));
 }



// Cree Sauce avec image
exports.creerOneSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    // ...sauceObject - all link in Modul sauces(name,image ect) короткая запись
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
          likes: 0,
          dislikes: 0,
          usersLiked: [],
          usersDisliked: [],
    });
    sauce.save()
        .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
        .catch(error => { res.status(400).json( { error })})
};



//PUT sauce - нужно сделать
exports.putOneSauce = (req, res, next) => {
        const sauceObject = req.file ? {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };

        Sauce.findOne({_id: req.params.id})
            .then((sauce) => {

                if (sauce.userId != authUser) {
                    res.status(403).json({ message : 'unauthorized request'});
                } 
                else {
                    if(sauceObject.imageUrl){
                    const filename = sauce.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => { //delete image if we have new image
                    Sauce.updateOne({ _id: req.params.id}, { ...sauceObject,
                        _id: req.params.id})
                        .then(() => res.status(200).json({message : 'Objet modifié!'}))
                        .catch(error => res.status(401).json({ error }));
                
                         })
                    } else {
                        Sauce.updateOne({ _id: req.params.id}, { ...sauceObject,
                            _id: req.params.id})
                            .then(() => res.status(200).json({message : 'Objet modifié!'}))
                            .catch(error => res.status(401).json({ error }));
                    }
        }
        })
            .catch((error) => {res.status(400).json({ error }); });
        
    };



// Delete
    exports.deleteSauce = (req, res, next) => {
        Sauce.findOne({_id: req.params.id})
            .then((sauce) => {
                if(sauce.userId.includes(req.body.userId)){ //or utilisé authUser()
                    res.status(401).json({message: 'Not authorized'});
                }
                else{           
                    const filename = sauce.imageUrl.split('/images/')[1];
                 fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                             .then(() => { res.status(200).json({message: 'Objet supprimé !'})
                         })
                          .catch(error => res.status(401).json({ error }));                     
                        })
                        }         
            })
     };




     //Like-Dislike
     exports.likeDislike = (req,res,next)=>{
     Sauce.findOne({_id: req.params.id})
         .then(data =>{
              // if this client no have like/dislike in array 
             if(!data.usersLiked.includes(req.body.userId) &&
                !data.usersDisliked.includes(req.body.userId) ){
                if(req.body.like==1){
                 data.usersLiked.push(req.body.userId)
                 data.likes +=req.body.like
                }
                 else if(req.body.like ==-1){
                    data.usersDisliked.push(req.body.userId)
                    data.dislikes -=req.body.like
                 }
             }
             else if(req.body.like == 0 && data.usersLiked.includes(req.body.userId) ) {
                data.usersLiked.splice(req.body.userId, 1)
                data.likes -=1
             }
             else if(req.body.like == 0 && data.usersDisliked.includes(req.body.userId)){
                 data.usersDisliked.splice(req.body.userId,1)
                 data.dislikes -=1
             }

             data.save()
             .then(() => { res.status(200).json({message: 'сохранили !'})})
    
         })

             .catch((error) => { res.status(400).json({ error });
       });

     }

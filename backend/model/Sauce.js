//импортируем сюда монгуст
const mongoose = require('mongoose');


const schemaSauce = mongoose.Schema({
    userId:{ type: String, require:true },
    name: { type: String, require:true  },
    manufacturer:{type: String, require:true},
    description: { type: String, require:true },
    mainPepper:{type:String, require:true},
    imageUrl: { type: String, require:true },
    heat: { type: Number, require:true },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked:{  type: [String] },  //Array
    usersDisliked:{  type: [String]}
});

module.exports = mongoose.model('sauce', schemaSauce);

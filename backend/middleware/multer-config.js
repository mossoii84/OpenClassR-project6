const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};



const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    callback(null, 'images');
  },

  filename: (req, file, callback) => {
    //const name = file.originalname.split(' ').join('_');
    const name = file.originalname.split('.').slice(0,-1).join('.');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + '-' + Date.now() + '.' + extension);
  }
});

if(!MIME_TYPES){
  alert("Hello world!");
}

module.exports = multer({storage: storage}).single('image');


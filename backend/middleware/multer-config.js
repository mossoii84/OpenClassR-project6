const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage =  multer({
  storage: multer.diskStorage(
  {
    destination: (req, file, callback) => {
    callback(null, 'images');
  },

  filename: (req, file, callback) => {
    //const name = file.originalname.split(' ').join('_');
    const name = file.originalname.split('.').slice(0,-1).join('.');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + '-' + Date.now() + '.' + extension);
  }
}),
  fileFilter: function(req, file, callback){
                 // Ограничение типа загрузки файла, загрузить только картинки формата PNG
        if(    (MIME_TYPES[file.mimetype] === 'jpg')  
            || (MIME_TYPES[file.mimetype] === 'jpeg')
            || (MIME_TYPES[file.mimetype] === 'png')
          ){
          callback(null, true)
           } 
        else {
          //callback(null, false)
          callback(new Error('Cette extension n accepte pas'), false)
        }
    }
});


module.exports = storage.single('image');
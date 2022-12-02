// const multer = require('multer');


// //заблокирвоать другие форматы 
// // https://expressjs.com/en/resources/middleware/multer.html
// // https://russianblogs.com/article/54413307494/



// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg',
//   'image/png': 'png'
// };

// const storage = multer.diskStorage(
//   {
//     destination: (req, file, callback) => {
//     callback(null, 'images');
//   },

//   filename: (req, file, callback) => {
//     //const name = file.originalname.split(' ').join('_');
//     const name = file.originalname.split('.').slice(0,-1).join('.');
//     const extension = MIME_TYPES[file.mimetype];
//     callback(null, name + '-' + Date.now() + '.' + extension);
//   }
// });


// module.exports = multer({storage: storage}).single('image');



// НОВОЕ РАБОТАНЕТ
// const loadImage  = multer({
//     // //доп параметр лимита
//     // limits:{
//     //     // Ограниченный размер файла 10 КБ
//     //     fileSize: 1000*1000,  //1000кб(1mb)
//     //              // ограничить количество файлов
//     //     files: 1
//     // },
//     storage: multer.diskStorage({
//             destination: (req, file, callback) => {
//             callback(null, 'images');
//         },
//         filename: (req, file, callback) => {
//             const name = file.originalname.split('.').slice(0,-1).join('.');
//             const extension = MIME_TYPES[file.mimetype];
//             callback(null, name + '-' + Date.now() + '.' + extension);
//         }
//     }),
//     //доп параметр проверки
//     fileFilter: function(req, file, callback){
//                  // Ограничение типа загрузки файла, загрузить только картинки формата PNG
//         if(    (MIME_TYPES[file.mimetype] === 'jpg')  
//             || (MIME_TYPES[file.mimetype] === 'jpeg')
//             || (MIME_TYPES[file.mimetype] === 'png')
//           ){
//           callback(null, true)
//         } else {
//           //callback(null, false)
//           callback(new Error('I don\'t have a clue!'), false)
//          // callback(console.log('I don\'t have a clue!'))
//         }
//     }
//   });
  
  
//   module.exports = loadImage.single('image');
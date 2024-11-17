const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);  
    } else {
        cb(new Error('Invalid file type. Only .jpg and .png are allowed!'), false);  
    }
};

const uploadFile = multer({
    storage: storage,
    fileFilter: fileFilter
}).single('file');  


module.exports = uploadFile;

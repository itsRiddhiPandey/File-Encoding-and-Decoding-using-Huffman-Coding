// server/config/multer.js
const multer = require('multer');
const path = require('path');

// Define storage and file naming
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// File upload middleware
const upload = multer({
    storage,
    limits: { fileSize: 1000000 }, // 1MB max file size
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('textfile'); // Single file upload with fieldname 'textfile'

// Check if the file is a text file
function checkFileType(file, cb) {
    const filetypes = /txt/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = file.mimetype === 'text/plain';

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Text files only!');
    }
}

module.exports = upload;

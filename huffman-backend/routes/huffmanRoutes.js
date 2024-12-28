// const express = require('express');
// const router = express.Router();
// const { compressFile, decompressFile } = require('../controllers/huffmanController');
// const upload = require('../config/multer');

// router.post('/compress', upload, compressFile);
// router.post('/decompress', upload, decompressFile);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { compressFile, decompressFile } = require('../controllers/huffmanController');
const upload = require('../config/multer'); // Import the configured multer instance

// Compress route using the pre-configured upload middleware
router.post('/compress', upload, compressFile);

// Decompress route using the pre-configured upload middleware
router.post('/decompress', upload, decompressFile);

module.exports = router;


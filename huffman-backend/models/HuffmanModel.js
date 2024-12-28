// server/models/HuffmanModel.js
const mongoose = require('mongoose');

const HuffmanSchema = new mongoose.Schema({
    originalData: { type: String, required: true },
    compressedData: { type: String, required: true },
    huffmanTree: { type: Object, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Huffman', HuffmanSchema);

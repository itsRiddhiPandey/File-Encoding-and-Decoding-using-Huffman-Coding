// const fs = require('fs');
// const path = require('path');
// const { buildHuffmanTree, generateCodes, encodeData, decodeData } = require('../utils/huffmanUtils');

// exports.compressFile = (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const filePath = req.file.path;

//     // Read the uploaded text file
//     fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) return res.status(500).json({ error: 'Error reading file' });

//         // Step 1: Build Huffman Tree and encode data
//         const { huffmanTree } = buildHuffmanTree(data);
//         const codes = generateCodes(huffmanTree);
//         const compressedData = encodeData(data, codes);

//         // Write the compressed data to a new file
//         const compressedFilePath = path.join('uploads', `compressed-${Date.now()}.txt`);
//         fs.writeFile(compressedFilePath, compressedData, (err) => {
//             if (err) return res.status(500).json({ error: 'Error writing compressed file' });

//             // Respond with download link for the compressed file
//             res.download(compressedFilePath);
//         });
//     });
// };

// exports.decompressFile = (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const filePath = req.file.path;

//     // Read the uploaded compressed file
//     fs.readFile(filePath, 'utf8', (err, compressedData) => {
//         if (err) return res.status(500).json({ error: 'Error reading file' });

//         // For simplicity, we're using the same hardcoded Huffman tree used earlier
//         const huffmanTree = {}; // Add your Huffman tree reconstruction logic here

//         const originalData = decodeData(compressedData, huffmanTree);

//         // Write the decompressed data to a new file
//         const decompressedFilePath = path.join('uploads', `decompressed-${Date.now()}.txt`);
//         fs.writeFile(decompressedFilePath, originalData, (err) => {
//             if (err) return res.status(500).json({ error: 'Error writing decompressed file' });

//             // Respond with download link for the decompressed file
//             res.download(decompressedFilePath);
//         });
//     });
// };


const fs = require('fs');
const path = require('path');
const { buildHuffmanTree, generateCodes, encodeData, decodeData } = require('../utils/huffmanUtils');

// Compress File
exports.compressFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;

    // Read the uploaded text file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error reading file' });

        // Step 1: Build Huffman Tree and encode data
        const { huffmanTree, frequencyTable } = buildHuffmanTree(data);
        const codes = generateCodes(huffmanTree);
        const compressedData = encodeData(data, codes);

        // Create a compressed file that contains both the frequency table and the compressed binary data
        const compressedFileContent = JSON.stringify({
            frequencyTable,
            compressedData
        });

        // Write the compressed data to a new file
        const compressedFilePath = path.join('uploads', `compressed-${Date.now()}.txt`);
        fs.writeFile(compressedFilePath, compressedFileContent, (err) => {
            if (err) return res.status(500).json({ error: 'Error writing compressed file' });

            // Respond with download link for the compressed file
            res.download(compressedFilePath);
        });
    });
};

// Decompress File
exports.decompressFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;

    // Read the uploaded compressed file (in binary form)
    fs.readFile(filePath, 'utf8', (err, compressedFileContent) => {
        if (err) return res.status(500).json({ error: 'Error reading file' });

        // Parse the compressed file content to get the frequency table and compressed binary data
        const { frequencyTable, compressedData } = JSON.parse(compressedFileContent);

        // Rebuild the Huffman Tree using the frequency table
        const { huffmanTree } = buildHuffmanTreeFromFrequencyTable(frequencyTable);

        // Decode the binary compressed data using the reconstructed Huffman tree
        const originalData = decodeData(compressedData, huffmanTree);

        // Write the decompressed data to a new text file
        const decompressedFilePath = path.join('uploads', `decompressed-${Date.now()}.txt`);
        fs.writeFile(decompressedFilePath, originalData, (err) => {
            if (err) return res.status(500).json({ error: 'Error writing decompressed file' });

            // Respond with download link for the decompressed text file
            res.download(decompressedFilePath);
        });
    });
};

// Function to rebuild Huffman tree from frequency table
function buildHuffmanTreeFromFrequencyTable(frequencyTable) {
    let heap = Object.keys(frequencyTable).map(char => ({
        char,
        freq: frequencyTable[char],
        left: null,
        right: null
    }));

    while (heap.length > 1) {
        heap.sort((a, b) => a.freq - b.freq);
        const left = heap.shift();
        const right = heap.shift();
        heap.push({
            char: null,
            freq: left.freq + right.freq,
            left,
            right
        });
    }

    return { huffmanTree: heap[0] };
}

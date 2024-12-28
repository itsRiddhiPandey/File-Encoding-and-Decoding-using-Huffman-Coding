// Build Huffman Tree
function buildHuffmanTree(data) {
    // Step 1: Calculate Frequency
    let frequency = {};
    for (let char of data) {
        frequency[char] = (frequency[char] || 0) + 1;
    }

    // Step 2: Create a priority queue (min-heap)
    let heap = Object.keys(frequency).map(char => ({
        char,
        freq: frequency[char],
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

    return { huffmanTree: heap[0], frequencyTable: frequency };
}

// Generate Huffman Codes
function generateCodes(tree, prefix = '', codeTable = {}) {
    if (tree.char !== null) {
        codeTable[tree.char] = prefix;
        return;
    }
    generateCodes(tree.left, prefix + '0', codeTable);
    generateCodes(tree.right, prefix + '1', codeTable);
    return codeTable;
}

// Encode data using Huffman Codes
function encodeData(data, codes) {
    return data.split('').map(char => codes[char]).join('');
}

// Decode data using Huffman Tree
function decodeData(encodedData, tree) {
    let decodedData = '';
    let node = tree;
    for (let bit of encodedData) {
        node = bit === '0' ? node.left : node.right;
        if (node.char) {
            decodedData += node.char;
            node = tree;
        }
    }
    return decodedData;
}

module.exports = { buildHuffmanTree, generateCodes, encodeData, decodeData };

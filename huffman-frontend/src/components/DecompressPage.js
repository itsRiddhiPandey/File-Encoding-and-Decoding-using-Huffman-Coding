import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackgroundAnimation from './BackgroundAnimation'; // Adjust the path as necessary
import './styles/DecompressPage.css'; // Ensure the correct path for the CSS

const DecompressPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const canvas = document.getElementById('background-canvas');
        new BackgroundAnimation(canvas);
    }, []);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('textfile', selectedFile);

        try {
            const response = await axios.post('http://localhost:5000/api/huffman/decompress', formData, {
                responseType: 'blob',
            });
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'decompressed-file.txt');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error during decompression:', error);
        }
    };

    return (
        <div className="decompress-page">
            <canvas id="background-canvas"></canvas>
            <div className="decompress-content">
                <h1>Decode File</h1>
                <p>Select a Huffman encoded binary file to decode it!</p> {/* Added instruction */}
                <input type="file" onChange={handleFileChange} />
                <p>{selectedFile ? selectedFile.name : 'No file chosen'}</p>
                <button onClick={handleFileUpload} disabled={!selectedFile}>
                    Decode and Download
                </button>
                <p>Please wait after uploading so that your file can be decoded.</p> {/* Added loading instruction */}
            </div>
        </div>
    );
};

export default DecompressPage;

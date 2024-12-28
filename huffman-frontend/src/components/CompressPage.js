import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackgroundAnimation from './BackgroundAnimation'; // Use the BackgroundAnimation for the canvas
import './styles/CompressPage.css'; // Ensure the CSS path is correct

const CompressPage = () => {
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
            const response = await axios.post('http://localhost:5000/api/huffman/compress', formData, {
                responseType: 'blob',
            });
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'compressed-file.txt');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error during compression:', error);
        }
    };

    return (
        <div className="compress-page">
            <canvas id="background-canvas"></canvas>
            <div className="compress-content">
                <h1>ENCODE YOUR FILE</h1>
                <p>Select any text-based file to encode it!</p>
                <input type="file" onChange={handleFileChange} />
                <p>{selectedFile ? selectedFile.name : 'No file chosen'}</p>
                <button onClick={handleFileUpload} disabled={!selectedFile}>
                    Encode and Download
                </button>
                <p>Please wait after uploading so that your file gets encoded.</p>
            </div>
        </div>
    );
};

export default CompressPage;

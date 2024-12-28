import React from 'react';
import { Link } from 'react-router-dom';
import './styles/HomePage.css'; // Ensure this path is correct
import Background from './Background';

const HomePage = () => {
    return (
        <div className="homepage">
            <Background /> {/* Add background component */}
            <div className="content">
                <h1 className="main-title">FILE ENCODING AND DECODING</h1>
                <p className="sub-title">using</p>
                <h2 className="highlight-title">HUFFMAN CODING</h2>
                <div className="buttons">
                    <Link to="/compress">
                        <button className="action-button">ENCODE</button>
                    </Link>
                    <Link to="/decompress">
                        <button className="action-button">DECODE</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

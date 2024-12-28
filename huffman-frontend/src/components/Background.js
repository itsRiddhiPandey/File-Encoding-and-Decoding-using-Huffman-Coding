import React, { useEffect } from 'react';
import BackgroundAnimation from './BackgroundAnimation';

const Background = () => {
    useEffect(() => {
        const canvas = document.getElementById('canvas');
        new BackgroundAnimation(canvas);
    }, []);

    return (
        <div className="background">
            <canvas id="canvas"></canvas>
        </div>
    );
};

export default Background;

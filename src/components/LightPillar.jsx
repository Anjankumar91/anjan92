import React from 'react';
import './LightPillar.css';

const LightPillar = () => {
    return (
        <div className="light-pillar-container">
            <div className="light-beam-outer" />
            <div className="light-beam-glow" />
            <div className="light-beam-core" />
        </div>
    );
};

export default LightPillar;

import React, { memo } from 'react';
import './AuroraBackground.css';

const AuroraBackground = memo(() => {
    return (
        <div className="aurora-container">
            <div className="aurora-blob blob-1" />
            <div className="aurora-blob blob-2" />
            <div className="aurora-blob blob-3" />
        </div>
    );
});

export default AuroraBackground;

import React from 'react';

/**
 * PremiumCard - A quiet, glass-panel container.
 * Styles are handled in index.css (.premium-card)
 */
const PremiumCard = ({ children, className = '', variant = 'default' }) => {

    // We can keep 'variant' if needed for future, but currently sticking to "Quiet Luxury" default.
    return (
        <div className={`premium-card ${className}`}>
            <div className="premium-content">
                {children}
            </div>
        </div>
    );
};

export default PremiumCard;

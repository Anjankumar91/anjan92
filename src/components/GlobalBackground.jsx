import React, { memo } from 'react';

const GlobalBackground = memo(() => {
    return (
        <div className="global-bg">

            {/* Layer 2: Glowing Planet Particles (Overlay) */}
            <iframe
                src="https://my.spline.design/glowingplanetparticles-nhVHji30IRoa5HBGe8yeDiTs"
                frameBorder="0"
                width="100%"
                height="100%"
                title="Particles Spline"
                loading="lazy"
                scrolling="no"
                allow="autoplay; fullscreen"
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    mixBlendMode: 'screen',
                    opacity: 1, // Full opacity
                    filter: 'brightness(1.1) contrast(1.1) saturate(1.1)', // Final visibility
                    pointerEvents: 'none',
                    transform: 'translate3d(0, 0, 0)', // Force GPU
                    backfaceVisibility: 'hidden',
                    perspective: '1000px',
                    willChange: 'transform'
                }}
            ></iframe>
        </div>
    );
});

export default GlobalBackground;





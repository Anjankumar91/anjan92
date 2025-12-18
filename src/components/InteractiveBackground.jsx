import { useEffect, useRef } from 'react';
import bgImage from '../assets/portfolio-bg.jpg';

const InteractiveBackground = () => {
    const bgRef = useRef(null);
    const spotlightRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = clientX / window.innerWidth;
            const y = clientY / window.innerHeight;

            // Parallax Effect (Background moves slightly opposite to mouse)
            // Range: -20px to +20px
            const moveX = -(x - 0.5) * 40;
            const moveY = -(y - 0.5) * 40;

            if (bgRef.current) {
                bgRef.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`; // Scale 1.1 to prevent edges showing
            }

            // Spotlight Effect (Follows mouse)
            if (spotlightRef.current) {
                // We update the CSS variable for the gradient position
                spotlightRef.current.style.background = `
                    radial-gradient(
                        600px circle at ${clientX}px ${clientY}px, 
                        rgba(255, 255, 255, 0.03), 
                        transparent 40%
                    )
                `;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            {/* Parallax Background Image */}
            <div
                ref={bgRef}
                className="global-bg"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    // Initial styles ensuring it covers and has room to move
                    width: '100vw',
                    height: '100vh',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: -3,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.1s ease-out', // Smooth out the mouse movement slightly
                    willChange: 'transform'
                }}
            />

            {/* Dynamic Spotlight Layer */}
            <div
                ref={spotlightRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: -2,
                    pointerEvents: 'none',
                    mixBlendMode: 'overlay',
                    willChange: 'background'
                }}
            />

            {/* The existing color overlay is separate and handled by CSS classes in index.css 
                or we can render it here if we want to bundle it all. 
                For now, we let App.jsx render the .global-overlay for the hue shifts, 
                and this component handles the texture/movement. 
            */}
        </>
    );
};

export default InteractiveBackground;

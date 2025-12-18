import { useEffect, useRef } from 'react';
import bgImage from '../assets/portfolio-bg.jpg';

const ThreeDBackground = () => {
    const bgRef = useRef(null);

    // References for physics state (no re-renders needed)
    const state = useRef({
        mouseX: 0,
        mouseY: 0,
        currentRotateX: 0,
        currentRotateY: 0,
        targetRotateX: 0,
        targetRotateY: 0
    });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            // Normalize mouse position -1 to 1
            const x = (e.clientX / innerWidth) * 2 - 1;
            const y = (e.clientY / innerHeight) * 2 - 1;

            state.current.mouseX = x;
            state.current.mouseY = y;

            // Maximum rotation in degrees - Increased for visibility
            const MAX_ROTATION = 10;

            // Invert logic: Move mouse RIGHT -> Image tilts RIGHT (RotateY positive)?
            // Actually usually: Mouse RIGHT -> Look RIGHT -> Left side comes closer -> rotateY(pos)
            state.current.targetRotateY = x * MAX_ROTATION;
            state.current.targetRotateX = -y * MAX_ROTATION; // Mouse UP -> Tilt UP -> rotateX(pos)
        };

        let animationFrameId;

        const loop = () => {
            // Lerp factor (Smoothing). 0.05 = Very smooth/slow, 0.2 = Responsive
            const ease = 0.08; // Slightly faster response

            // Interpolate current towards target
            state.current.currentRotateX += (state.current.targetRotateX - state.current.currentRotateX) * ease;
            state.current.currentRotateY += (state.current.targetRotateY - state.current.currentRotateY) * ease;

            if (bgRef.current) {
                const { currentRotateX, currentRotateY } = state.current;
                // Apply the 3D transform
                // Perspective: Gives the 3D depth perception
                // Scale: 1.2 ensures edges don't show when tilting significantly
                bgRef.current.style.transform = `
                    perspective(800px)
                    rotateX(${currentRotateX}deg)
                    rotateY(${currentRotateY}deg)
                    scale(1.2)
                `;
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        window.addEventListener('mousemove', handleMouseMove);
        loop();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div
            ref={bgRef}
            className="global-bg"
            style={{
                backgroundImage: `url(${bgImage})`,
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -3,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                willChange: 'transform',
                // Important: Transform origin center for symmetrical tilt
                transformOrigin: 'center center'
            }}
        />
    );
};

export default ThreeDBackground;

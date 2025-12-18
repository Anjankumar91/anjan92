import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const SmoothScroll = () => {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.05, // Ultra smooth (lower = smoother)
            duration: 1.5, // Longer scroll duration
            wheelMultiplier: 0.8, // Slightly suppressed wheel for control
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: true, // Force smooth on touch/mobile
            touchMultiplier: 1.5,
        });

        window.lenis = lenis; // Expose for anchor links

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return null;
};

export default SmoothScroll;

import React, { createContext, useContext, useState, useEffect } from 'react';

const ScrollContext = createContext();

export const useScrollContext = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState('hero');
    const [scrollSpeed, setScrollSpeed] = useState(0);

    useEffect(() => {
        // Simple scroll speed tracker
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = Math.abs(currentScrollY - lastScrollY);

            // Damping logic: normalize speed (0 to 1 range roughly)
            const speed = Math.min(delta / 50, 1);
            setScrollSpeed(speed);

            lastScrollY = currentScrollY;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScroll);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        // Reset speed when stopped
        const interval = setInterval(() => {
            if (window.scrollY === lastScrollY) setScrollSpeed(0);
        }, 100);

        return () => {
            window.removeEventListener('scroll', onScroll);
            clearInterval(interval);
        };
    }, []);

    // Function to register a section's viewport entry
    const registerSection = (id) => {
        setActiveSection(id);
    };

    return (
        <ScrollContext.Provider value={{ activeSection, registerSection, scrollSpeed }}>
            {children}
        </ScrollContext.Provider>
    );
};

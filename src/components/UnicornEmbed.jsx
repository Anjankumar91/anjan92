import React, { useEffect, useRef } from 'react';
import './UnicornEmbed.css';

const PROJECT_ID = "zJNneFFw0PJrAByW0IaF"; // The Robot/Hologram Face

const UnicornEmbed = ({ hue = 0 }) => {
    const containerRef = useRef(null);
    const scriptLoaded = useRef(false);

    useEffect(() => {
        // Prevent double injection
        if (scriptLoaded.current) return;

        // 1. Inject the Container Div manually to ensure we control it
        const container = containerRef.current;
        if (!container) return;

        // Create the special div Unicorn looks for
        const unicornDiv = document.createElement('div');
        unicornDiv.setAttribute('data-us-project', PROJECT_ID);
        // Force it to be responsive 100%
        unicornDiv.style.width = '100%';
        unicornDiv.style.height = '100%';
        container.appendChild(unicornDiv);

        // 2. Load the Script
        if (!window.UnicornStudio) {
            window.UnicornStudio = { isInitialized: false };
            const script = document.createElement('script');
            script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.5.3/dist/unicornStudio.umd.js";
            script.onload = () => {
                if (!window.UnicornStudio.isInitialized) {
                    window.UnicornStudio.init();
                    window.UnicornStudio.isInitialized = true;
                }
            };
            document.body.appendChild(script);
            if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
                // If script existed but wasn't init (rare case)
                window.UnicornStudio.init();
                window.UnicornStudio.isInitialized = true;
            }
        };

        // 3. NUCLEAR OPTION: MutationObserver to hunt down the logo
        // Sometimes CSS isn't enough if they use shadow DOM or random classes.
        // We look for any link pointing to unicorn.studio
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element
                        // Check the node itself
                        if (node.tagName === 'A' && (node.href.includes('unicorn.studio') || node.href.includes('unicorn'))) {
                            node.style.display = 'none';
                            node.remove(); // Bye bye
                        }
                        // Check children
                        const links = node.querySelectorAll && node.querySelectorAll('a[href*="unicorn"]');
                        if (links) {
                            links.forEach(link => {
                                link.style.display = 'none';
                                link.remove();
                            });
                        }
                    }
                });
            });
        });

        // Watch the entire body for added nodes
        observer.observe(document.body, { childList: true, subtree: true });

        // Cleanup
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className="unicorn-embed-container"
            style={{
                // Color Shifting Magic
                filter: `hue-rotate(${hue}deg) brightness(1.2)`
            }}
        >
            {/* The script will inject the canvas here */}
        </div>
    );
};

export default UnicornEmbed;

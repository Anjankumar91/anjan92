import { useState } from 'react';
import { motion } from 'framer-motion';
import './LandingOverlay.css';

const LandingOverlay = ({ onSkip }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <motion.div
            className="landing-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
        >
            <button
                onClick={onSkip}
                className="premium-enter-btn"
                style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
            >
                ENTER PORTFOLIO
            </button>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 1 }}
                className="spline-container"
                style={{ width: '100%', height: '100%' }}
            >
                <iframe
                    src="https://my.spline.design/nexbotrobotcharacterconcept-kLwr8f6hgKgaa5gmU6oB00Si"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    id="aura-spline"
                    title="Intro Scene"
                    onLoad={() => setIsLoaded(true)}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                ></iframe>
            </motion.div>

            {!isLoaded && (
                <div className="loading-spinner" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    fontFamily: 'monospace'
                }}>
                    🚀 Loading Experience... 🚀
                </div>
            )}
        </motion.div>
    );
};

export default LandingOverlay;


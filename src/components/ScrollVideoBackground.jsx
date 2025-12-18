import { useEffect, useRef, useState } from 'react';
import videoSrc from '../assets/background-video.mp4';

const ScrollVideoBackground = () => {
    const videoRef = useRef(null);
    const [duration, setDuration] = useState(0);

    // Physics State
    const state = useRef({
        targetTime: 0,
        currentTime: 0
    });

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Metadata load handler
        const handleLoadedMetadata = () => {
            setDuration(video.duration);
            // Ensure it starts at 0 and paused
            video.currentTime = 0;
            video.pause();
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);

        // Scroll Handler to calculate Target Time
        const handleScroll = () => {
            if (!duration) return;

            // Calculate how far down we are (0.0 to 1.0)
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            // Guard against divide by zero or negative
            const rawPercent = Math.max(0, Math.min(1, scrollTop / (scrollHeight || 1)));

            // Map percentage to video duration
            state.current.targetTime = rawPercent * duration;
        };

        window.addEventListener('scroll', handleScroll);

        // Animation Loop for Smooth Seeking (Lerp)
        let animationFrameId;
        const loop = () => {
            // Smoothness factor (0.1 = responsive but smooth, 0.05 = very lazy/cinematic)
            const ease = 0.1;

            if (Math.abs(state.current.targetTime - state.current.currentTime) > 0.01) {
                // Interpolate
                state.current.currentTime += (state.current.targetTime - state.current.currentTime) * ease;

                // Update video
                if (videoRef.current) {
                    // Check if video is ready
                    if (videoRef.current.readyState >= 2) {
                        videoRef.current.currentTime = state.current.currentTime;
                    }
                }
            }

            animationFrameId = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (video) video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            cancelAnimationFrame(animationFrameId);
        };
    }, [duration]);

    return (
        <div className="global-bg" style={{ overflow: 'hidden' }}>
            <video
                ref={videoRef}
                src={videoSrc}
                muted
                playsInline
                preload="auto"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100vw',
                    height: '100vh',
                    objectFit: 'cover', // Ensures it covers the screen
                    transform: 'translate(-50%, -50%)',
                    zIndex: -3
                }}
            />
            {/* Darken overlay to ensure text readability on top of video */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.5)',
                zIndex: -2
            }} />
        </div>
    );
};

export default ScrollVideoBackground;

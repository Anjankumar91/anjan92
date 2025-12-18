import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, useMotionTemplate } from 'framer-motion';

/**
 * FadeIn - Bi-directional fade up on scroll (replays on re-entry)
 */
export const FadeIn = ({ children, delay = 0, duration = 0.8, y = 30, className = '' }) => (
    <motion.div
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-50px" }} // Replays every time
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: 'opacity, transform' }}
        className={className}
    >
        {children}
    </motion.div>
);

/**
 * SlideIn - Slide from left or right
 */
export const SlideIn = ({ children, direction = 'left', delay = 0, className = '' }) => {
    const x = direction === 'left' ? -100 : 100;
    return (
        <motion.div
            initial={{ opacity: 0, x }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/**
 * RevealText - Word by word reveal
 */
export const RevealText = ({ text, className = '', delay = 0 }) => {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: delay }
        })
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", damping: 12, stiffness: 100 },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: { type: "spring", damping: 12, stiffness: 100 },
        },
    };

    return (
        <motion.div
            style={{ overflow: "hidden", display: "inline-block" }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }} // Replays
            className={className}
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    style={{ marginRight: "0.25em", display: "inline-block" }}
                    key={index}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

/**
 * ParallaxItem - Moves relative to scroll speed
 */
export const ParallaxItem = ({ children, speed = 1, className = '' }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Increased range from 50 to 100 to make it more visible
    const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);

    // Removed opacity fade to ensure it's always visible for debugging/usage
    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    );
};

/**
 * ScaleOnScroll - Scales element based on viewport position
 */
export const ScaleOnScroll = ({ children, className = '' }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1 0"]
    });

    // Scale from 0.8 to 1 then stays or slightly zooms out
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.95]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.3, 1, 1, 0.5]);

    return (
        <motion.div ref={ref} style={{ scale, opacity }} className={className}>
            {children}
        </motion.div>
    );
};

/**
 * TiltCard - 3D Tilt + Scroll Parallax
 */
export const TiltCard = ({ children, className = '' }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Butter Smooth Physics (Lower stiffness = heavier/slower follow)
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [20, -20]), { stiffness: 100, damping: 30 }); // Increased range
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-20, 20]), { stiffness: 100, damping: 30 }); // Increased range

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set((clientX - left) / width - 0.5);
        y.set((clientY - top) / height - 0.5);
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
        mouseX.set(0);
        mouseY.set(0);
    }

    // Dynamic Spotlight Gradient
    const spotlightBackground = useMotionTemplate`radial-gradient(
        600px circle at ${mouseX}px ${mouseY}px, 
        rgba(255, 255, 255, 0.1), 
        transparent 80%
    )`;

    // Enhanced Scroll Effect: 3D perspective shift on scroll
    const { scrollYProgress } = useScroll({ target: ref, offset: ["0 1", "1 0"] });
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
    const rotateScroll = useTransform(scrollYProgress, [0, 1], [5, -5]); // Slight twist

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1200, // Deeper perspective
                rotateX,
                rotateY,
                rotateZ: rotateScroll,
                scale,
                transformStyle: "preserve-3d"
            }}
            className={className}
        >
            {/* Spotlight Layer */}
            <motion.div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: "inherit",
                    background: spotlightBackground,
                    opacity: 0, // Hidden by default
                    zIndex: 2,
                    pointerEvents: "none"
                }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            />

            <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
                {children}
            </div>
        </motion.div>
    );
};

/**
 * ScrollProgressLine - Global progress bar
 */
/**
 * StaggerContainer - Orchestrates child animations
 */
export const StaggerContainer = ({ children, className = '', staggerDelay = 0.1, delay = 0 }) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        transition={{ staggerChildren: staggerDelay, delayChildren: delay }}
        className={className}
    >
        {children}
    </motion.div>
);

/**
 * Float - Continuous vertical floating animation
 */
export const Float = ({ children, amplitude = 10, duration = 3, className = '' }) => (
    <motion.div
        animate={{ y: [amplitude * -1, amplitude, amplitude * -1] }}
        transition={{
            duration,
            ease: "easeInOut",
            repeat: Infinity,
        }}
        className={className}
    >
        {children}
    </motion.div>
);

/**
 * BlurReveal - Blurs in from high blur to sharp
 */
export const BlurReveal = ({ children, delay = 0, className = '' }) => (
    <motion.div
        initial={{ filter: "blur(10px)", opacity: 0, scale: 0.95 }}
        whileInView={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} // Premium ease
        className={className}
    >
        {children}
    </motion.div>
);

/**
 * ScaleIn - Soft scale up focus effect
 */
export const ScaleIn = ({ children, from = 0.95, to = 1, duration = 0.6, className = '' }) => (
    <motion.div
        initial={{ scale: from, opacity: 0 }}
        whileInView={{ scale: to, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }} // Once true for these to avoid jarring re-scale
        transition={{ duration, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

/**
 * TextMaskReveal - Line by line reveal from hidden overflow
 */
export const TextMaskReveal = ({
    text,
    className = '',
    delay = 0,
    direction = 'up' // up, down
}) => {
    return (
        <div style={{ overflow: 'hidden', display: 'inline-block' }} className={className}>
            <motion.div
                initial={{ y: direction === 'up' ? "100%" : "-100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
            >
                {text}
            </motion.div>
        </div>
    );
};

/**
 * CountUp - Animates number from 0 to N
 */
export const CountUp = ({ end, duration = 2, suffix = '', className = '' }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    // Simple state-based count up for React (or use useSpring output)
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (inView) {
            let start = 0;
            const increment = end / (duration * 60);
            const timer = setInterval(() => {
                start += increment;
                if (start > end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 1000 / 60);
            return () => clearInterval(timer);
        }
    }, [inView, end, duration]);

    return <span ref={ref} className={className}>{count}{suffix}</span>;
};

/**
 * ScrollProgressLine - Global progress bar
 */
export const ScrollProgressLine = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <motion.div
            style={{
                scaleX,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'var(--accent-neon)',
                transformOrigin: '0%',
                zIndex: 1000
            }}
        />
    );
};

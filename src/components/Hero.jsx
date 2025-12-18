import React from 'react';
import './Hero.css';
import { FadeIn, RevealText, ParallaxItem } from './MotionWrappers';

const Hero = () => {
    return (
        <section className="hero-container" id="hero">
            <div className="hero-content">
                <FadeIn delay={0.2}>
                    <ParallaxItem speed={-0.2}>
                        <h1 className="hero-title">
                            Hi, I'm <br />
                            <span className="highlight-text">
                                <RevealText text="Venkat Anjan Kumar" delay={0.4} />
                            </span>
                        </h1>
                    </ParallaxItem>
                </FadeIn>

                <FadeIn delay={0.6}>
                    <ParallaxItem speed={-0.1}>
                        <h2 className="hero-subtitle">
                            Data Analyst & Developer
                        </h2>
                    </ParallaxItem>
                </FadeIn>

                <FadeIn delay={0.8}>
                    <p className="hero-description">
                        I transform data into actionable insights and build responsive web applications.
                        Passionate about Power BI, React, and creating impactful digital experiences.
                    </p>
                </FadeIn>

                <FadeIn delay={1.0} className="hero-btns">
                    <a href="#projects" className="btn btn-primary">
                        View Projects
                    </a>
                    <a href="#contact" className="btn btn-outline">
                        Contact Me
                    </a>
                </FadeIn>
            </div>
        </section>
    );
};

export default Hero;

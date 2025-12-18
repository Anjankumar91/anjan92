import React from 'react';
import './Resume.css';
import { FaFileDownload } from 'react-icons/fa';
import PremiumCard from './PremiumCard';
import { ParallaxItem } from './MotionWrappers';

const Resume = () => {
    return (
        <section className="resume-section" id="resume">
            <h2 className="section-title">Resume</h2>
            <div className="resume-wrapper"> {/* Changed from resume-container to avoid conflict or just usage choice */}
                <ParallaxItem speed={0.5}>
                    <PremiumCard className="resume-container">
                        <div className="resume-content">
                            <h3>Professional Experience</h3>
                            <p>
                                Detailed professional history is available in the downloadable resume.
                                Includes experience with full-stack development, data analysis, and cloud technologies.
                            </p>
                            <div className="resume-btn-container">
                                <a href="/resume.pdf" className="btn btn-primary" download="My_Resume.pdf" target="_blank" rel="noopener noreferrer">
                                    <FaFileDownload style={{ marginRight: '8px' }} /> Download Resume
                                </a>
                            </div>
                            <p className="resume-note" style={{ fontSize: '0.8rem', color: '#666', marginTop: '1rem' }}>
                                Click to download or view.
                            </p>
                        </div>
                    </PremiumCard>
                </ParallaxItem>
            </div>
        </section>
    );
};

export default Resume;

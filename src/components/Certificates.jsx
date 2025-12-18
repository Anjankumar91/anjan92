import React from 'react';
import './Certificates.css';
import { FaAward, FaExternalLinkAlt } from 'react-icons/fa';
import PremiumCard from './PremiumCard';
import { ParallaxItem } from './MotionWrappers';

const Certificates = () => {
    const certificates = [
        {
            title: 'Google Data Analytics',
            issuer: 'Coursera',
            date: '2023',
            link: '#',
        },
        {
            title: 'IBM Data Science',
            issuer: 'Coursera',
            date: '2022',
            link: '#',
        },
    ];

    return (
        <section className="certificates-section" id="certificates">
            <h2 className="section-title">Certifications</h2>
            <div className="certs-container">
                {certificates.map((cert, index) => (
                    <ParallaxItem key={index} speed={index % 2 === 0 ? 0.3 : 0.8}>
                        <PremiumCard className="cert-card">
                            <div className="cert-header">
                                <div className="cert-icon-box">
                                    <FaAward />
                                </div>
                                <div className="cert-info">
                                    <h3 className="cert-title">{cert.title}</h3>
                                    <div className="cert-meta">
                                        <span className="cert-issuer">{cert.issuer}</span>
                                        <span className="cert-date" style={{ marginLeft: '10px', fontSize: '0.85rem', color: '#888' }}>
                                            {cert.date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Description would go here if data existed */}
                            <a href={cert.link} className="cert-link-btn" target="_blank" rel="noopener noreferrer">
                                View Credential <FaExternalLinkAlt style={{ marginLeft: '8px', fontSize: '0.8em' }} />
                            </a>
                        </PremiumCard>
                    </ParallaxItem>
                ))}
            </div>
        </section>
    );
};

export default Certificates;

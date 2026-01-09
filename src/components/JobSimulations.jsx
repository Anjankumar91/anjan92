import React from 'react';
import './JobSimulations.css';
import { FaLaptopCode, FaExternalLinkAlt } from 'react-icons/fa';
import PremiumCard from './PremiumCard';
import { ParallaxItem } from './MotionWrappers';

const JobSimulations = () => {
    const jobSimulations = [
        {
            title: 'Data Analytics Job Simulation',
            issuer: 'Forage (Accenture)',
            date: '2023',
            description: 'Completed a simulation involving data cleaning, modeling, and visualization to uncover insights for a client.',
            skills: ['Python', 'Data Visualization', 'Cleaning'],
            link: '#',
        },
        {
            title: 'Power BI Job Simulation',
            issuer: 'Forage (PwC)',
            date: '2023',
            description: 'Created an interactive dashboard to visualize key performance indicators and retention metrics.',
            skills: ['Power BI', 'DAX', 'Data Analysis'],
            link: '#',
        },
    ];

    return (
        <section className="job-sim-section" id="job-simulations">
            <h2 className="section-title">Internships</h2>
            <div className="job-sim-container">
                {jobSimulations.map((sim, index) => (
                    <ParallaxItem key={index} speed={index % 2 === 0 ? 0.4 : 1.0}>
                        <PremiumCard className="job-sim-card">
                            <div className="job-sim-header">
                                <div className="icon-box">
                                    <FaLaptopCode />
                                </div>
                                <div>
                                    <h3 className="job-sim-title">{sim.title}</h3>
                                    <span className="job-sim-issuer">{sim.issuer} | {sim.date}</span>
                                </div>
                            </div>
                            <p className="job-sim-desc">{sim.description}</p>
                            <div className="job-sim-skills">
                                {sim.skills.map((skill, idx) => (
                                    <span key={idx} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                            <a href={sim.link} className="btn-view" target="_blank" rel="noopener noreferrer">
                                View Certificate <FaExternalLinkAlt style={{ marginLeft: '5px', fontSize: '0.8em' }} />
                            </a>
                        </PremiumCard>
                    </ParallaxItem>
                ))}
            </div>
        </section>
    );
};

export default JobSimulations;


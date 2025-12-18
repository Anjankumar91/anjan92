import React from 'react';
import './Achievements.css';
import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa';
import PremiumCard from './PremiumCard';
import { ParallaxItem } from './MotionWrappers';

const Achievements = () => {
    const achievements = [
        {
            title: 'Best Data Visualization Award',
            organization: 'University Hackathon 2023',
            description: 'Awarded for creating the most insightful interactive dashboard using Power BI.',
            icon: <FaTrophy color="#FFD700" />,
        },
        {
            title: 'Top 5% in Global Coding Challenge',
            organization: 'HackerRank',
            description: 'Ranked in the top 5th percentile out of 50,000+ participants.',
            icon: <FaMedal color="#C0C0C0" />,
        },
        {
            title: 'Employee of the Month',
            organization: 'Tech Corp Inc.',
            description: 'Recognized for outstanding contribution to the backend migration project.',
            icon: <FaAward color="#CD7F32" />,
        },
    ];

    return (
        <section className="achievements-section" id="achievements">
            <h2 className="section-title">Achievements</h2>
            <div className="achievements-container">
                {achievements.map((item, index) => (
                    <ParallaxItem key={index} speed={index % 2 === 0 ? 0.4 : 1.0}>
                        <PremiumCard className="achievement-card">
                            <div className="achievement-icon">
                                {item.icon}
                            </div>
                            <div className="achievement-content">
                                <h3 className="achievement-title">{item.title}</h3>
                                <p className="achievement-org">{item.organization}</p>
                                <p className="achievement-desc">{item.description}</p>
                            </div>
                        </PremiumCard>
                    </ParallaxItem>
                ))}
            </div>
        </section>
    );
};

export default Achievements;

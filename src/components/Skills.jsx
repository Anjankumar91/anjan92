import React from 'react';
import './Skills.css';
import { FaReact, FaJs, FaHtml5, FaCss3, FaPython, FaGitAlt, FaNodeJs, FaDatabase, FaChartBar, FaChartLine } from 'react-icons/fa';
import { SiTailwindcss, SiFigma } from 'react-icons/si';
import PremiumCard from './PremiumCard';
import { FadeIn, RevealText, ParallaxItem } from './MotionWrappers';

const Skills = () => {
    const skillsConfig = [
        {
            category: 'Data Analysis',
            items: [
                { name: 'Power BI', icon: <FaChartBar /> },
                { name: 'Tableau', icon: <FaChartLine /> },
                { name: 'Python', icon: <FaPython /> },
                { name: 'SQL', icon: <FaDatabase /> },
                { name: 'Excel', icon: <FaChartBar /> },
                { name: 'R', icon: <FaChartLine /> },
                { name: 'Statistical Analysis', icon: <FaChartBar /> },
            ],
        },
        {
            category: 'Business Intelligence',
            items: [
                { name: 'Data Modeling', icon: <FaDatabase /> },
                { name: 'DAX', icon: <FaChartBar /> },
                { name: 'Power Query', icon: <FaChartLine /> },
            ]
        },
        {
            category: 'Data Engineering',
            items: [
                { name: 'ETL', icon: <FaDatabase /> },
                { name: 'Data Warehousing', icon: <FaDatabase /> },
                { name: 'Azure', icon: <FaDatabase /> },
                { name: 'Database Design', icon: <FaDatabase /> },
            ]
        },
        {
            category: 'Tools & Technologies',
            items: [
                { name: 'Git', icon: <FaGitAlt /> },
                { name: 'Jupyter', icon: <FaPython /> },
                { name: 'VS Code', icon: <FaChartBar /> },
                { name: 'Microsoft Office', icon: <FaChartBar /> },
            ],
        },
    ];

    return (
        <section className="skills-section" id="skills">
            <RevealText text="Skills & Expertise" className="section-title" />
            <FadeIn>
                <p className="skills-subtitle">Here are the technologies and tools I work with to turn data into insights</p>
            </FadeIn>

            <div className="skills-container">
                {skillsConfig.map((category, index) => (
                    <ParallaxItem key={index} speed={index % 2 === 0 ? 0.3 : 0.8} className="skills-parallax-wrapper">
                        <PremiumCard className="skills-category">
                            <h3 className="category-title">{category.category}</h3>
                            <div className="skills-pills">
                                {category.items.map((skill, idx) => (
                                    <div className="skill-pill" key={idx}>
                                        <span className="skill-name">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </PremiumCard>
                    </ParallaxItem>
                ))}
            </div>
        </section>
    );
};

export default Skills;

import React from 'react';
import './Projects.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import PremiumCard from './PremiumCard';
import { TiltCard, RevealText, ParallaxItem } from './MotionWrappers';

const Projects = () => {
    const projects = [
        {
            title: 'Project One',
            description: 'A brief description of project one. Detailed insights into what it solves and technologies used.',
            tech: ['React', 'Node.js', 'MongoDB'],
            github: '#',
            demo: '#',
        },
        {
            title: 'Project Two',
            description: 'Another amazing project. Focusing on data visualization and user interaction.',
            tech: ['Python', 'Pandas', 'Streamlit'],
            github: '#',
            demo: '#',
        },
        {
            title: 'Project Three',
            description: 'Full stack dashboard application with real-time updates.',
            tech: ['Next.js', 'Firebase', 'Tailwind'],
            github: '#',
            demo: '#',
        },
        {
            title: 'Project Four',
            description: 'AI-driven data analysis tool for predictive modeling.',
            tech: ['Python', 'scikit-learn', 'FastAPI'],
            github: '#',
            demo: '#',
        }
    ];

    return (
        <section className="projects-section" id="projects">
            <ParallaxItem speed={0.5}>
                <RevealText text="Global Projects Gallery" className="section-title" />
            </ParallaxItem>
            <div className="projects-container">
                {projects.map((project, index) => (
                    <ParallaxItem key={index} speed={index % 2 === 0 ? 0.5 : 1.2} className="project-parallax-wrapper">
                        <TiltCard className="project-tilt-wrapper">
                            <PremiumCard className="project-card" variant="glass">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-desc">{project.description}</p>
                                <div className="project-tech">
                                    {project.tech.map((tech, idx) => (
                                        <span key={idx} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                                <div className="project-links">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer"><FaGithub /> Code</a>
                                    <a href={project.demo} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Live Demo</a>
                                </div>
                            </PremiumCard>
                        </TiltCard>
                    </ParallaxItem>
                ))}
            </div>
        </section>
    );
};

export default Projects;

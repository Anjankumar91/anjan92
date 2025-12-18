import React from 'react';
import './Contact.css';
import { FaEnvelope, FaLinkedin, FaGithub, FaMedium, FaPaperPlane } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi'; // Using Feather icons for the neat arrow
import { ParallaxItem } from './MotionWrappers';

const Contact = () => {

    // Data configuration for easy updates
    const contactLinks = [
        {
            title: 'GitHub',
            desc: 'Check out my code',
            icon: <FaGithub />,
            link: 'https://github.com/', // Replace with user link
            action: 'View Profile'
        },
        {
            title: 'LinkedIn',
            desc: "Let's connect professionally",
            icon: <FaLinkedin />,
            link: 'https://linkedin.com/', // Replace with user link
            action: 'Connect'
        },
        {
            title: 'Email',
            desc: 'Send me a message',
            icon: <FaEnvelope />,
            link: 'mailto:email@example.com',
            action: 'Mail'
        },
        {
            title: 'Medium',
            desc: 'Read my blog posts',
            icon: <FaMedium />,
            link: 'https://medium.com/', // Replace with user link
            action: 'Read Articles'
        }
    ];

    return (
        <section className="contact-section" id="contact">
            {/* Header */}
            <div className="contact-header">
                <h2 className="section-title">Get In Touch</h2>
                <p>I'm always open to discussing new projects, opportunities, or just having a chat about data.</p>
            </div>

            {/* 2x2 Grid */}
            <div className="contact-grid">
                {contactLinks.map((item, index) => (
                    <ParallaxItem key={index} speed={index % 2 === 0 ? 0.3 : 0.8}>
                        <a
                            href={item.link}
                            className="contact-card"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="card-icon-box">
                                {item.icon}
                            </div>
                            <div className="card-content">
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                            <FiArrowUpRight className="card-arrow" />
                        </a>
                    </ParallaxItem>
                ))}
            </div>

            {/* Bottom CTA Box */}
            <div className="contact-cta-box">
                <p>Interested in collaborating or have a question?</p>
                <a href="mailto:email@example.com" className="cta-btn">
                    <FaEnvelope /> Send an Email
                </a>
            </div>
        </section>
    );
};

export default Contact;

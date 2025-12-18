import React from 'react';
import './Footer.css';
import { FaGithub, FaLinkedin, FaMedium, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="social-media-wrap">
                    <div className="footer-logo">
                        Portfolio<span className="dot">.</span>
                    </div>
                    <small className="website-rights">© {new Date().getFullYear()} All rights reserved.</small>
                    <div className="social-icons">
                        <a
                            className="social-icon-link"
                            href="https://github.com"
                            target="_blank"
                            aria-label="Github"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                        </a>
                        <a
                            className="social-icon-link"
                            href="https://linkedin.com"
                            target="_blank"
                            aria-label="LinkedIn"
                            rel="noopener noreferrer"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            className="social-icon-link"
                            href="https://medium.com"
                            target="_blank"
                            aria-label="Medium"
                            rel="noopener noreferrer"
                        >
                            <FaMedium />
                        </a>
                        <a
                            className="social-icon-link"
                            href="mailto:example@gmail.com"
                            aria-label="Email"
                            rel="noopener noreferrer"
                        >
                            <FaEnvelope />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

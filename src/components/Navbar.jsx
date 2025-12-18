import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { name: 'About', to: '#hero' },
        { name: 'Skills', to: '#skills' },
        { name: 'Projects', to: '#projects' },
        { name: 'Job Sims', to: '#job-simulations' },
        { name: 'Power BI', to: '#dashboards' },
        { name: 'Certs', to: '#certificates' },
        { name: 'Achieve', to: '#achievements' },
        { name: 'Resume', to: '#resume' },
        { name: 'Contact', to: '#contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <a href="#hero" className="navbar-logo">
                    Portfolio<span className="dot">.</span>
                </a>

                <div className="menu-icon" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>

                <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    {navLinks.map((link, index) => (
                        <li key={index} className="nav-item">
                            <a
                                href={link.to}
                                className="nav-links"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsOpen(false);
                                    if (window.lenis) {
                                        window.lenis.scrollTo(link.to);
                                    } else {
                                        // Fallback
                                        document.querySelector(link.to)?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

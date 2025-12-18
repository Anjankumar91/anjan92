import React from 'react';
import './Dashboards.css';
import { FaChartBar } from 'react-icons/fa';
import PremiumCard from './PremiumCard';
import { ParallaxItem } from './MotionWrappers';

const Dashboards = () => {
    const dashboards = [
        {
            title: 'Sales Performance Dashboard',
            description: 'Interactive dashboard tracking sales KPIs across regions and product categories.',
            imgUrl: 'https://via.placeholder.com/600x400?text=Power+BI+Dashboard+1', // Replace with real image
            link: '#',
        },
        {
            title: 'Customer Churn Analysis',
            description: 'Analysis of customer retention and churn drivers using Power BI.',
            imgUrl: 'https://via.placeholder.com/600x400?text=Power+BI+Dashboard+2',
            link: '#',
        },
    ];

    return (
        <section className="dashboards-section" id="dashboards">
            <h2 className="section-title">
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <FaChartBar color="#F2C811" /> Power BI Dashboards
                </span>
            </h2>
            <div className="dashboards-container">
                {dashboards.map((dash, index) => (
                    <ParallaxItem key={index} speed={index % 2 === 0 ? 0.4 : 0.9}>
                        <PremiumCard className="dashboard-item">
                            <div className="dashboard-img-wrapper">
                                <img src={dash.imgUrl} alt={dash.title} className="dashboard-img" />
                                <div className="dashboard-overlay">
                                    <a href={dash.link} className="btn btn-primary">View Dashboard</a>
                                </div>
                            </div>
                            <div className="dashboard-info">
                                <h3 className="dashboard-title">{dash.title}</h3>
                                <p className="dashboard-desc">{dash.description}</p>
                            </div>
                        </PremiumCard>
                    </ParallaxItem>
                ))}
            </div>
        </section>
    );
};

export default Dashboards;

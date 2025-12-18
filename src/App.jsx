import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import JobSimulations from './components/JobSimulations';
import Certificates from './components/Certificates';
import Dashboards from './components/Dashboards';
import Achievements from './components/Achievements';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

import Navbar from './components/Navbar';
import LandingOverlay from './components/LandingOverlay';
import GlobalBackground from './components/GlobalBackground';
import SmoothScroll from './components/SmoothScroll';
import { ScrollProgressLine } from './components/MotionWrappers';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [loadMainScene, setLoadMainScene] = useState(false);

  // Safety: If showIntro is false but loadMainScene didn't trigger, force it
  useEffect(() => {
    if (!showIntro && !loadMainScene) {
      const timer = setTimeout(() => setLoadMainScene(true), 1500); // 1.5s buffer
      return () => clearTimeout(timer);
    }
  }, [showIntro, loadMainScene]);

  return (
    <div className="app-container">
      <SmoothScroll />
      <ScrollProgressLine />
      <AnimatePresence
        mode="wait"
        onExitComplete={() => setLoadMainScene(true)}
      >
        {showIntro && <LandingOverlay key="intro" onSkip={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* 
          GLOBAL BACKGROUND (Quiet Luxury Theme + Spline)
          Defined in components/GlobalBackground.jsx
          Performance Note: Deferred until after intro to prioritize Robot FPS.
      */}
      {loadMainScene && <GlobalBackground />}

      {loadMainScene && (
        <>
          <Navbar />
          <main>
            <div id="hero-section"><Hero /></div>
            <div id="skills"><Skills /></div>
            <div id="projects"><Projects /></div>
            <JobSimulations />
            <Dashboards />
            <Certificates />
            <Achievements />
            <Resume />
            <div id="contact"><Contact /></div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;

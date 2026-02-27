import { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { TechStack } from './components/TechStack';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

// Random glitch burst effect hook
function usePageGlitch() {
  const [glitchActive, setGlitchActive] = useState(false);
  useEffect(() => {
    const trigger = () => {
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 80 + Math.random() * 120);
      }
    };
    const id = setInterval(trigger, 4000 + Math.random() * 3000);
    return () => clearInterval(id);
  }, []);
  return glitchActive;
}

export default function App() {
  const glitchActive = usePageGlitch();

  return (
    <div
      className="cyberpunk-root min-h-screen"
      style={{
        filter: glitchActive ? 'hue-rotate(20deg) brightness(1.1)' : 'none',
        transition: 'filter 0.05s',
      }}
    >
      {/* Global overlay effects */}
      <div className="scanlines-overlay" />
      <div className="noise-overlay" />

      {/* Corner decorations (purely decorative) */}
      <div
        className="fixed top-4 left-4 pointer-events-none z-40"
        style={{ width: 20, height: 20, borderTop: '2px solid rgba(0,245,255,0.4)', borderLeft: '2px solid rgba(0,245,255,0.4)' }}
      />
      <div
        className="fixed top-4 right-4 pointer-events-none z-40"
        style={{ width: 20, height: 20, borderTop: '2px solid rgba(0,245,255,0.4)', borderRight: '2px solid rgba(0,245,255,0.4)' }}
      />
      <div
        className="fixed bottom-4 left-4 pointer-events-none z-40"
        style={{ width: 20, height: 20, borderBottom: '2px solid rgba(255,0,255,0.4)', borderLeft: '2px solid rgba(255,0,255,0.4)' }}
      />
      <div
        className="fixed bottom-4 right-4 pointer-events-none z-40"
        style={{ width: 20, height: 20, borderBottom: '2px solid rgba(255,0,255,0.4)', borderRight: '2px solid rgba(255,0,255,0.4)' }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

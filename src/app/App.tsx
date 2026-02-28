import { useState } from 'react';
import { BootIntro } from './components/BootIntro';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { About } from './components/About';
import { Showcase } from './components/Showcase';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollIndicator } from './components/ScrollIndicator';

export default function App() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <>
      {/* Boot intro overlay */}
      {!bootComplete && <BootIntro onComplete={() => setBootComplete(true)} />}

      {/* Custom cursor */}
      <CustomCursor />

      {/* Noise overlay */}
      <div className="noise" />

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <Hero />
        <Marquee />
        <About />
        <Showcase />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

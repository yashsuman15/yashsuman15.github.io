import { useState } from 'react';
import { BootIntro } from './components/BootIntro';
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
import { Chat } from './components/Chat';

export default function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Boot intro overlay */}
      {!bootComplete && <BootIntro onComplete={() => setBootComplete(true)} />}

      {/* Noise overlay */}
      <div className="noise" />

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <Hero onJackIn={() => setIsChatOpen(true)} />
        <Marquee />
        <About />
        <Showcase />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />

      {/* Alt Cunningham Chat Overlay */}
      {isChatOpen && (
        <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      )}
    </>
  );
}

import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [triggerDisconnect, setTriggerDisconnect] = useState(false);

  // Ref to track current chat state inside the popstate listener
  const isChatOpenRef = useRef(false);
  // Flag to ignore popstate when we programmatically call history.back()
  const ignoringPopstate = useRef(false);

  // Keep ref in sync with state
  useEffect(() => {
    isChatOpenRef.current = isChatOpen;
  }, [isChatOpen]);

  // Open chat: push a history entry so back button can close it
  const openChat = useCallback(() => {
    setIsChatOpen(true);
    window.history.pushState({ chat: true }, '');
  }, []);

  // Called by Chat's onClose after disconnect animation completes
  const closeChat = useCallback(() => {
    setIsChatOpen(false);
    setTriggerDisconnect(false);
  }, []);

  // Manual close (DISCONNECT button, Escape key, nav-link inside chat)
  // needs to pop the history entry we pushed when chat opened
  const handleManualClose = useCallback(() => {
    setIsChatOpen(false);
    setTriggerDisconnect(false);
    // Pop the chat history entry — ignore the resulting popstate event
    ignoringPopstate.current = true;
    window.history.back();
  }, []);

  // Listen for browser back button
  useEffect(() => {
    const handlePopstate = () => {
      // If we triggered this popstate ourselves via history.back(), ignore it
      if (ignoringPopstate.current) {
        ignoringPopstate.current = false;
        return;
      }
      // If chat is open, trigger the disconnect animation
      if (isChatOpenRef.current) {
        setTriggerDisconnect(true);
        // Don't call setIsChatOpen(false) here — Chat's onClose will do that
        // after the disconnect animation completes
      }
    };

    window.addEventListener('popstate', handlePopstate);
    return () => window.removeEventListener('popstate', handlePopstate);
  }, []);

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
        <Hero onJackIn={openChat} />
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
        <Chat
          isOpen={isChatOpen}
          onClose={triggerDisconnect ? closeChat : handleManualClose}
          triggerDisconnect={triggerDisconnect}
        />
      )}
    </>
  );
}

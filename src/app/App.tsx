import { useState, useEffect, useRef, useCallback } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Writing } from './components/Writing';
import { Highlights } from './components/Highlights';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Chat } from './components/Chat';
import { trackClick } from '@/lib/analytics';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

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

  // Close chat
  const closeChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  // Manual close (Close button, Escape key)
  const handleManualClose = useCallback(() => {
    setIsChatOpen(false);
    ignoringPopstate.current = true;
    window.history.back();
  }, []);

  // Listen for browser back button
  useEffect(() => {
    const handlePopstate = () => {
      if (ignoringPopstate.current) {
        ignoringPopstate.current = false;
        return;
      }
      if (isChatOpenRef.current) {
        setIsChatOpen(false);
      }
    };

    window.addEventListener('popstate', handlePopstate);
    return () => window.removeEventListener('popstate', handlePopstate);
  }, []);

  // Header scroll effect
  useEffect(() => {
    const header = document.getElementById('header');
    const handleScroll = () => {
      header?.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <Hero onOpenChat={openChat} />
        <Projects />
        <Writing />
        <Highlights />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>

      <Footer />

      {/* Floating chat button */}
      <button className="chat-fab" onClick={() => { trackClick('chat_fab'); openChat(); }}>
        <svg className="chat-fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="chat-fab-text">AI Assistant Chatbot</span>
      </button>

      {/* Alt Chat Overlay */}
      {isChatOpen && (
        <Chat
          isOpen={isChatOpen}
          onClose={handleManualClose}
        />
      )}
    </>
  );
}

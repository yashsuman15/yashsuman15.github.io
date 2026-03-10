import { useState } from 'react';

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <a href="#hero" className="nav-logo">
        <img src="/logo.webp" alt="Logo" style={{ height: '32px' }} />
      </a>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <a href="#showcase" onClick={() => setMenuOpen(false)}>// PROJECTS</a>
        <a href="#projects" onClick={() => setMenuOpen(false)}>// HIGHLIGHTS</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>// ABOUT</a>
        <a href="#skills" onClick={() => setMenuOpen(false)}>// SKILL DECK</a>
        <a href="#experience" onClick={() => setMenuOpen(false)}>// EXP</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>// CONTACT</a>
      </div>
      <div className="nav-actions">
        <a href="#contact" className="nav-cta">SEND PING</a>
        <a href="/resume.pdf" className="nav-cta" target="_blank" rel="noopener noreferrer">VIEW RESUME</a>
      </div>
      <button
        className={`nav-toggle ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>
      <div className="nav-status">
        <div className="status-dot" />
        WORKING
      </div>
      <div
        className={`sidebar-backdrop ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />
    </nav>
  );
}

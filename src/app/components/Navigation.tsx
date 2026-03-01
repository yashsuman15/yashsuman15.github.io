import { useState } from 'react';

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <a href="#hero" className="nav-logo">
        <img src="/logo.png" alt="Logo" style={{ height: '32px' }} />
      </a>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <a href="#about" onClick={() => setMenuOpen(false)}>// ABOUT</a>
        <a href="#skills" onClick={() => setMenuOpen(false)}>// SKILLS</a>
        <a href="#showcase" onClick={() => setMenuOpen(false)}>// PROJECTS</a>
        <a href="#experience" onClick={() => setMenuOpen(false)}>// EXP</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>// CONTACT</a>
        <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>SEND PING</a>
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
      <a href="#contact" className="nav-cta nav-cta-desktop">SEND PING</a>
      <div className="nav-status">
        <div className="status-dot" />
        WORKING
      </div>
    </nav>
  );
}

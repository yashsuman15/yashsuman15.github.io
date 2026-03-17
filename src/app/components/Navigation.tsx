import { useState } from 'react';

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header id="header">
      <nav>
        <a className="nav-name" href="#">
          Yash Suman
        </a>

        <div className="nav-center">
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-right">
          <a
            href="https://www.linkedin.com/in/yash-raj-suman/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/yashsuman15"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social"
          >
            GitHub
          </a>
          <a href="#contact" className="nav-cta">
            Get in touch
          </a>
        </div>

        <button
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        <a href="#projects" onClick={closeMenu}>
          Projects
        </a>
        <a href="#about" onClick={closeMenu}>
          About
        </a>
        <a href="#writing" onClick={closeMenu}>
          Writing
        </a>
        <a href="#highlights" onClick={closeMenu}>
          Highlights
        </a>
        <a href="#experience" onClick={closeMenu}>
          Experience
        </a>
        <a href="#skills" onClick={closeMenu}>
          Skills
        </a>
        <a href="#contact" onClick={closeMenu}>
          Contact
        </a>
        <div className="mobile-menu-socials">
          <a
            href="https://www.linkedin.com/in/yash-raj-suman/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/yashsuman15"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://x.com/yashsuman69"
            target="_blank"
            rel="noopener noreferrer"
          >
            X
          </a>
        </div>
      </div>
    </header>
  );
}

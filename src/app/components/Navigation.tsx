import { useState } from 'react';
import { trackClick } from '@/lib/analytics';

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
            onClick={() => trackClick('nav_linkedin')}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/yashsuman15"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social"
            onClick={() => trackClick('nav_github')}
          >
            GitHub
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            onClick={() => trackClick('see_resume')}
          >
            See Resume
          </a>
          <a href="#contact" className="nav-cta" onClick={() => trackClick('nav_get_in_touch')}>
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
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-resume-btn"
          onClick={() => { trackClick('see_resume_mobile'); closeMenu(); }}
        >
          See Resume
        </a>
        <div className="mobile-menu-socials">
          <a
            href="https://www.linkedin.com/in/yash-raj-suman/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick('mobile_linkedin')}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/yashsuman15"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick('mobile_github')}
          >
            GitHub
          </a>
          <a
            href="https://x.com/yashsuman69"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick('mobile_x')}
          >
            X
          </a>
        </div>
      </div>
    </header>
  );
}

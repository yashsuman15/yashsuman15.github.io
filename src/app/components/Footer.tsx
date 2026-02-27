import { ArrowUp } from 'lucide-react';
import { GlitchText } from './GlitchText';

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      className="relative py-8 overflow-hidden"
      style={{
        background: '#030310',
        borderTop: '1px solid rgba(0,245,255,0.15)',
      }}
    >
      {/* Top neon line */}
      <div className="neon-line-cyan absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <GlitchText
              text="KAI.EXE"
              as="span"
              intensity="low"
              className="font-orbitron neon-cyan"
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.2rem', letterSpacing: '0.2em' }}
            />
            <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--cyber-muted)' }}>
              // AI ENGINEER PORTFOLIO v2.0.77
            </span>
          </div>

          {/* Center: copyright */}
          <p
            style={{
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '0.65rem',
              color: 'var(--cyber-muted)',
              textAlign: 'center',
            }}
          >
            © 2026 KAI NAKAMURA — ALL NEURAL RIGHTS RESERVED
            <br />
            <span style={{ color: 'rgba(96,96,128,0.5)' }}>BUILT WITH REACT + TAILWIND CSS + CAFFEINE</span>
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="back-to-top flex items-center gap-2 group"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              color: 'var(--cyber-cyan)',
              background: 'none',
              border: '1px solid rgba(0,245,255,0.3)',
              padding: '8px 16px',
              cursor: 'pointer',
              clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(0,245,255,0.1)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,255,0.6)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'none';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,255,0.3)';
            }}
          >
            <ArrowUp size={12} />
            BACK_TO_TOP
          </button>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-6 pt-4 flex flex-wrap items-center justify-center gap-6"
          style={{ borderTop: '1px solid rgba(0,245,255,0.06)' }}
        >
          {['Privacy Protocol', 'Terms of Service', 'Cookie Policy'].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontFamily: 'Share Tech Mono, monospace',
                fontSize: '0.6rem',
                color: 'var(--cyber-muted)',
                textDecoration: 'none',
                letterSpacing: '0.1em',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--cyber-cyan)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--cyber-muted)')}
            >
              {item.toUpperCase()}
            </a>
          ))}
          <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.6rem', color: 'rgba(96,96,128,0.4)' }}>
            TOKYO • QUANTUM ENCRYPTED • 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
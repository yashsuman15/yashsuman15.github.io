import { useState, useEffect } from 'react';
import { Menu, X, Terminal, Zap } from 'lucide-react';
import { GlitchText } from './GlitchText';

const navLinks = [
  { label: 'ABOUT', id: 'about' },
  { label: 'PROJECTS', id: 'projects' },
  { label: 'TECH', id: 'tech' },
  { label: 'CONTACT', id: 'contact' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = ['about', 'projects', 'tech', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/85 backdrop-blur-lg'
          : 'bg-transparent'
      }`}
      style={{
        borderBottom: scrolled ? '1px solid rgba(0,245,255,0.2)' : 'none',
        boxShadow: scrolled ? '0 4px 30px rgba(0,245,255,0.05)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group"
        >
          <Terminal size={18} style={{ color: 'var(--cyber-cyan)' }} />
          <span
            className="font-orbitron text-lg neon-cyan tracking-widest flicker"
            style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.2em' }}
          >
            KAI.EXE
          </span>
          <Zap size={12} style={{ color: 'var(--cyber-magenta)' }} className="opacity-70" />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="relative group"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                color: activeSection === link.id ? 'var(--cyber-cyan)' : 'var(--cyber-muted)',
                transition: 'color 0.3s',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = 'var(--cyber-cyan)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color =
                  activeSection === link.id ? 'var(--cyber-cyan)' : 'var(--cyber-muted)';
              }}
            >
              {link.label}
              <span
                className="absolute bottom-0 left-0 h-px transition-all duration-300 group-hover:w-full"
                style={{
                  width: activeSection === link.id ? '100%' : '0%',
                  background: 'var(--cyber-cyan)',
                  boxShadow: '0 0 6px var(--cyber-cyan)',
                }}
              />
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="cyber-btn clip-cyber-sm px-5 py-2 text-xs"
            style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.15em' }}
          >
            HIRE.ME
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          style={{ color: 'var(--cyber-cyan)' }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{
            background: 'rgba(5,5,16,0.97)',
            borderColor: 'rgba(0,245,255,0.2)',
          }}
        >
          <div className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left py-2"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  color: activeSection === link.id ? 'var(--cyber-cyan)' : 'var(--cyber-text)',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid rgba(0,245,255,0.1)',
                  cursor: 'pointer',
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="cyber-btn clip-cyber-sm px-5 py-2 text-xs w-fit"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              HIRE.ME
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

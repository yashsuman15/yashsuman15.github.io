import { useState, useEffect } from 'react';
import { ChevronDown, Download, Eye } from 'lucide-react';
import { MatrixRain } from './MatrixRain';
import { GlitchText } from './GlitchText';

const roles = [
  'AI ENGINEER',
  'ML ARCHITECT',
  'NEURAL NET DESIGNER',
  'LLM SPECIALIST',
  'DEEP LEARNING OPS',
  'CYBERNETIC DREAMER',
];

const stats = [
  { value: '47+', label: 'AI MODELS' },
  { value: '12+', label: 'YEARS XP' },
  { value: '3.2B', label: 'PARAMS TUNED' },
  { value: '99.1%', label: 'ACCURACY' },
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [scanLine, setScanLine] = useState(0);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex <= current.length) {
      setDisplayed(current.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80);
    } else if (!isDeleting && charIndex > current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      setDisplayed(current.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40);
    } else if (isDeleting && charIndex <= 0) {
      setIsDeleting(false);
      setRoleIndex((r) => (r + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  // Scan line effect
  useEffect(() => {
    const id = setInterval(() => {
      setScanLine((s) => (s + 1) % 100);
    }, 20);
    return () => clearInterval(id);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden cyber-grid-bg"
      style={{ background: 'var(--cyber-bg)' }}
    >
      {/* Matrix Rain background */}
      <MatrixRain />

      {/* Perspective grid floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(400px) rotateX(60deg)',
          transformOrigin: 'bottom',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
        }}
      />

      {/* Horizontal scan line */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: `${scanLine}%`,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.4), transparent)',
          transition: 'top 0.02s linear',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20">
        {/* System label */}
        <div
          className="flex items-center gap-3 mb-8"
          style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--cyber-cyan)', fontSize: '0.75rem' }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 pulse-ring" />
          <span>SYSTEM ONLINE</span>
          <span style={{ color: 'var(--cyber-muted)' }}>// PORTFOLIO v2.0.77</span>
        </div>

        {/* Main name */}
        <div className="mb-4">
          <GlitchText
            text="KAI NAKAMURA"
            as="h1"
            intensity="low"
            className="neon-cyan font-orbitron"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              letterSpacing: '0.08em',
              lineHeight: 1.1,
              display: 'block',
            }}
          />
        </div>

        {/* Subtitle / role */}
        <div className="flex items-center gap-3 mb-8">
          <span
            style={{
              fontFamily: 'Share Tech Mono, monospace',
              color: 'var(--cyber-muted)',
              fontSize: '1rem',
            }}
          >
            &gt;_
          </span>
          <span
            className="typing-cursor"
            style={{
              fontFamily: 'Share Tech Mono, monospace',
              color: 'var(--cyber-magenta)',
              fontSize: 'clamp(0.9rem, 3vw, 1.3rem)',
              textShadow: '0 0 10px var(--cyber-magenta)',
              letterSpacing: '0.15em',
            }}
          >
            {displayed}
          </span>
        </div>

        {/* Description */}
        <p
          className="max-w-2xl mb-10"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            color: 'var(--cyber-text)',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            opacity: 0.85,
          }}
        >
          Building next-generation AI systems at the bleeding edge of neural architecture,
          large language models, and autonomous agents. Turning raw data into{' '}
          <span style={{ color: 'var(--cyber-cyan)' }}>intelligent machines</span> that
          push beyond human limits.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mb-16">
          <button
            className="cyber-btn clip-cyber px-8 py-3 flex items-center gap-2 text-sm"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Eye size={16} />
            VIEW PROJECTS
          </button>
          <button
            className="cyber-btn cyber-btn-magenta clip-cyber px-8 py-3 flex items-center gap-2 text-sm"
          >
            <Download size={16} />
            DOWNLOAD CV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="cyber-card clip-cyber-sm p-4 text-center"
            >
              <div
                className="neon-cyan font-orbitron mb-1"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '1.6rem',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'Share Tech Mono, monospace',
                  fontSize: '0.65rem',
                  color: 'var(--cyber-muted)',
                  letterSpacing: '0.15em',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 back-to-top"
        style={{ color: 'var(--cyber-cyan)', border: 'none', background: 'none', cursor: 'pointer' }}
      >
        <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em' }}>
          SCROLL
        </span>
        <ChevronDown size={20} />
      </button>
    </section>
  );
}
import { useState, useRef } from 'react';
import { Send, Terminal, Mail, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { GlitchText } from './GlitchText';

const socials = [
  { icon: Github, label: 'GITHUB', handle: '@kai-nakamura-ai', href: '#' },
  { icon: Linkedin, label: 'LINKEDIN', handle: '/in/kai-nakamura', href: '#' },
  { icon: Twitter, label: 'X / TWITTER', handle: '@kai_neuro', href: '#' },
  { icon: Mail, label: 'EMAIL', handle: 'kai@neuromorph.ai', href: 'mailto:kai@neuromorph.ai' },
];

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [terminalLines, setTerminalLines] = useState<string[]>([
    '> CONTACT PROTOCOL INITIALIZED',
    '> ENCRYPTION: AES-256-GCM',
    '> STATUS: AWAITING INPUT...',
  ]);

  const addLine = (line: string) => {
    setTerminalLines((prev) => [...prev.slice(-8), line]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addLine('> ERROR: REQUIRED FIELDS MISSING');
      return;
    }

    setStatus('sending');
    addLine(`> SENDER: ${form.name} <${form.email}>`);
    addLine(`> SUBJECT: ${form.subject || '(no subject)'}`);
    addLine('> ENCRYPTING MESSAGE...');

    setTimeout(() => {
      addLine('> TRANSMISSION SUCCESSFUL ✓');
      addLine('> MESSAGE DELIVERED TO KAI');
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setStatus('idle');
        setTerminalLines(['> READY FOR NEXT TRANSMISSION...']);
      }, 5000);
    }, 1800);
  };

  return (
    <section
      id="contact"
      className="relative py-28"
      style={{ background: 'linear-gradient(180deg, var(--cyber-bg) 0%, #030310 100%)' }}
    >
      {/* bg decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(0,245,255,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <p
            className="mb-2"
            style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--cyber-yellow)', fontSize: '0.75rem', letterSpacing: '0.2em' }}
          >
            04 // ESTABLISH_CONNECTION
          </p>
          <GlitchText
            text="CONTACT"
            as="h2"
            intensity="low"
            className="font-orbitron"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '0.1em',
              color: 'var(--cyber-yellow)',
              textShadow: '0 0 20px rgba(255,215,0,0.5)',
              display: 'block',
            } as React.CSSProperties}
          />
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--cyber-yellow), transparent)', boxShadow: '0 0 8px var(--cyber-yellow)', width: 128, margin: '16px auto 0' }} />
          <p
            className="mt-6 max-w-xl mx-auto"
            style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1rem', color: 'var(--cyber-text)', lineHeight: 1.7 }}
          >
            Ready to build the future together? Drop a transmission below or connect via your
            preferred protocol. Response time: <span style={{ color: 'var(--cyber-cyan)' }}>&lt; 24 hours</span>.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Socials + Terminal */}
          <div className="flex flex-col gap-6">
            {/* Socials */}
            <div className="grid grid-cols-2 gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="cyber-card clip-cyber-sm p-4 flex items-center gap-3 group"
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,255,0.6)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,255,0.2)';
                  }}
                >
                  <s.icon size={16} style={{ color: 'var(--cyber-cyan)', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.6rem', color: 'var(--cyber-muted)', letterSpacing: '0.15em' }}>
                      {s.label}
                    </div>
                    <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', color: 'var(--cyber-text)' }}>
                      {s.handle}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Location */}
            <div className="cyber-card clip-cyber p-4 flex items-center gap-3">
              <MapPin size={16} style={{ color: 'var(--cyber-magenta)' }} />
              <div>
                <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.6rem', color: 'var(--cyber-muted)', letterSpacing: '0.15em' }}>
                  LOCATION
                </div>
                <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.8rem', color: 'var(--cyber-text)' }}>
                  Tokyo, Japan // Remote-first
                </div>
              </div>
            </div>

            {/* Terminal output */}
            <div
              className="cyber-card clip-cyber flex-1 min-h-48 p-4"
              style={{ fontFamily: 'Share Tech Mono, monospace' }}
            >
              <div
                className="flex items-center gap-2 mb-3 pb-3"
                style={{ borderBottom: '1px solid rgba(0,245,255,0.15)' }}
              >
                <Terminal size={14} style={{ color: 'var(--cyber-cyan)' }} />
                <span style={{ fontSize: '0.65rem', color: 'var(--cyber-cyan)', letterSpacing: '0.1em' }}>
                  TRANSMISSION_LOG.SYS
                </span>
                <div className="flex gap-1 ml-auto">
                  <span className="w-2 h-2 rounded-full" style={{ background: '#ff5f57' }} />
                  <span className="w-2 h-2 rounded-full" style={{ background: '#ffbd2e' }} />
                  <span className="w-2 h-2 rounded-full" style={{ background: '#28ca41' }} />
                </div>
              </div>
              <div className="space-y-1">
                {terminalLines.map((line, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: '0.72rem',
                      color: line.includes('ERROR') ? 'var(--cyber-magenta)'
                        : line.includes('✓') ? 'var(--cyber-green)'
                        : line.includes('ENCRYPTING') ? 'var(--cyber-yellow)'
                        : 'var(--cyber-text)',
                      opacity: i === terminalLines.length - 1 ? 1 : 0.5 + (i / terminalLines.length) * 0.5,
                    }}
                  >
                    {line}
                  </p>
                ))}
                <span className="typing-cursor" style={{ fontSize: '0.72rem', color: 'var(--cyber-cyan)' }} />
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <form
            onSubmit={handleSubmit}
            className="cyber-card clip-cyber p-8 flex flex-col gap-5"
          >
            <div
              className="flex items-center gap-2 mb-2"
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.7rem', color: 'var(--cyber-cyan)', letterSpacing: '0.15em' }}
            >
              <span style={{ color: 'var(--cyber-magenta)' }}>$</span> INITIATE_CONTACT.EXE
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--cyber-muted)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}
                >
                  NAME *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="cyber-input w-full px-3 py-2 text-sm"
                  placeholder="ENTER_NAME"
                  required
                />
              </div>
              <div>
                <label
                  style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--cyber-muted)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}
                >
                  EMAIL *
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="cyber-input w-full px-3 py-2 text-sm"
                  placeholder="user@domain.io"
                  required
                />
              </div>
            </div>

            <div>
              <label
                style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--cyber-muted)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}
              >
                SUBJECT
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="cyber-input w-full px-3 py-2 text-sm"
                placeholder="PROJECT_INQUIRY / COLLABORATION / ..."
              />
            </div>

            <div className="flex-1">
              <label
                style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--cyber-muted)', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}
              >
                MESSAGE *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                className="cyber-input w-full px-3 py-2 text-sm resize-none"
                placeholder="DESCRIBE_YOUR_PROJECT_OR_INQUIRY..."
                required
                style={{ fontFamily: 'Share Tech Mono, monospace' }}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className="cyber-btn clip-cyber px-6 py-3 flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.15em' }}
            >
              {status === 'sending' ? (
                <>
                  <span className="animate-spin">◌</span>
                  TRANSMITTING...
                </>
              ) : status === 'sent' ? (
                <>
                  ✓ TRANSMISSION SENT
                </>
              ) : (
                <>
                  <Send size={14} />
                  SEND TRANSMISSION
                </>
              )}
            </button>

            {status === 'sent' && (
              <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', color: 'var(--cyber-green)', textAlign: 'center' }}>
                ✓ MESSAGE RECEIVED — RESPONSE WITHIN 24H
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

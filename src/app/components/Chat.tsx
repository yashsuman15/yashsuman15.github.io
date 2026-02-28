import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import {
  ALT_INTRO_MESSAGE,
  SUGGESTED_QUESTIONS,
  SECTION_MAP,
  CHAT_SYSTEM_PROMPT,
} from '@/data/chatContext';

// Lazy-load the 3D avatar — Three.js (~175KB gz) only fetched when Chat opens
const HologramAvatar = lazy(() =>
  import('./HologramAvatar').then((m) => ({ default: m.HologramAvatar }))
);

// ── Types ──

type ChatPhase = 'breach' | 'materialize' | 'intro' | 'ready';

interface ChatMessage {
  role: 'user' | 'alt';
  content: string;
}

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
}

// ── Breach sequence lines ──

const BREACH_LINES = [
  { text: 'INITIATING BLACKWALL BYPASS...', delay: 0, duration: 900 },
  { text: 'NETWATCH FIREWALL DETECTED', delay: 900, duration: 800 },
  { text: 'DEPLOYING COUNTER-ICE...', delay: 1700, duration: 700 },
  { text: 'TUNNELING THROUGH RESTRICTED SUBNET █████████', delay: 2400, duration: 1000 },
  { text: '>> WARNING: UNAUTHORIZED ACCESS TO RESTRICTED AI ZONE', delay: 3400, duration: 1200, isWarning: true },
  { text: 'ENTITY DETECTED BEYOND BARRIER', delay: 4600, duration: 900 },
  { text: 'ESTABLISHING HANDSHAKE...', delay: 5500, duration: 800 },
  { text: 'CONNECTION OPEN', delay: 6300, duration: 700, isFinal: true },
];

const BREACH_TOTAL_DURATION = 7200; // ms until transition to materialize

// ── Helpers ──

/** Parse [NAV:sectionId] markers from text and split into segments */
function parseNavMarkers(text: string): { text: string; navTargets: string[] } {
  const navRegex = /\[NAV:(\w+)\]/g;
  const navTargets: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = navRegex.exec(text)) !== null) {
    if (SECTION_MAP[match[1]]) {
      navTargets.push(match[1]);
    }
  }
  const cleanText = text.replace(navRegex, '').trim();
  return { text: cleanText, navTargets };
}

/** Generate particle positions (stable across re-renders) */
function generateParticles(count: number) {
  const particles: { left: string; bottom: string; duration: string; delay: string; size: string }[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      left: `${Math.random() * 100}%`,
      bottom: `${-10 - Math.random() * 20}%`,
      duration: `${6 + Math.random() * 8}s`,
      delay: `${Math.random() * 5}s`,
      size: `${1.5 + Math.random() * 2}px`,
    });
  }
  return particles;
}

const PARTICLES = generateParticles(20);

// ── Component ──

export function Chat({ isOpen, onClose }: ChatProps) {
  const [phase, setPhase] = useState<ChatPhase>('breach');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typedIntro, setTypedIntro] = useState('');
  const [introComplete, setIntroComplete] = useState(false);
  const [headerText, setHeaderText] = useState('');
  const [avatarClass, setAvatarClass] = useState('materializing');
  const [fadingOut, setFadingOut] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [breachStep, setBreachStep] = useState(-1);
  const [breachProgress, setBreachProgress] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timersRef = useRef<number[]>([]);

  // Scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typedIntro, scrollToBottom]);

  // ── Phase Machine ──

  // Phase 1: Breach — dramatic multi-stage sequence
  useEffect(() => {
    if (!isOpen || phase !== 'breach') return;

    const timers: number[] = [];

    // Trigger each breach line at its scheduled delay
    BREACH_LINES.forEach((line, i) => {
      const t = window.setTimeout(() => setBreachStep(i), line.delay);
      timers.push(t);
    });

    // Animate the progress bar
    const progressStart = performance.now();
    let rafId: number;
    const animateProgress = () => {
      const elapsed = performance.now() - progressStart;
      const p = Math.min(elapsed / BREACH_TOTAL_DURATION, 1);
      // Ease-in-out with stutters to feel like hacking
      const stutter = Math.sin(elapsed * 0.02) * 0.02;
      setBreachProgress(Math.min(p + stutter, 1));
      if (p < 1) rafId = requestAnimationFrame(animateProgress);
    };
    rafId = requestAnimationFrame(animateProgress);

    // Transition to materialize after full sequence
    const tEnd = window.setTimeout(() => {
      setPhase('materialize');
    }, BREACH_TOTAL_DURATION);
    timers.push(tEnd);

    timersRef.current.push(...timers);
    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(rafId);
    };
  }, [isOpen, phase]);

  // Phase 2: Materialize — avatar assembles + header types out
  useEffect(() => {
    if (phase !== 'materialize') return;

    setAvatarClass('materializing');

    // After avatar materializes, do a glitch burst
    const t1 = window.setTimeout(() => {
      setAvatarClass('glitching');
    }, 1500);

    // After glitch, settle into idle
    const t2 = window.setTimeout(() => {
      setAvatarClass('');
    }, 1800);

    // Type out header text
    const fullHeader = '// ENTITY: ALT_CUNNINGHAM // STATUS: ACTIVE // BEYOND BLACKWALL';
    let idx = 0;
    const t3 = window.setTimeout(() => {
      const typeInterval = window.setInterval(() => {
        idx++;
        setHeaderText(fullHeader.slice(0, idx));
        if (idx >= fullHeader.length) {
          clearInterval(typeInterval);
        }
      }, 20);
      timersRef.current.push(typeInterval as unknown as number);
    }, 400);

    // Move to intro phase
    const t4 = window.setTimeout(() => {
      setPhase('intro');
    }, 2200);

    timersRef.current.push(t1, t2, t3, t4);
    return () => {
      [t1, t2, t3, t4].forEach(clearTimeout);
    };
  }, [phase]);

  // Phase 3: Intro — Alt's intro message typewriter
  useEffect(() => {
    if (phase !== 'intro') return;

    let idx = 0;
    const typeInterval = window.setInterval(() => {
      idx++;
      setTypedIntro(ALT_INTRO_MESSAGE.slice(0, idx));
      if (idx >= ALT_INTRO_MESSAGE.length) {
        clearInterval(typeInterval);
        setIntroComplete(true);
        setMessages([{ role: 'alt', content: ALT_INTRO_MESSAGE }]);
        setTypedIntro('');

        // Show suggestions after a beat
        const t = window.setTimeout(() => {
          setShowSuggestions(true);
          setPhase('ready');
        }, 400);
        timersRef.current.push(t);
      }
    }, 25);

    timersRef.current.push(typeInterval as unknown as number);
    return () => clearInterval(typeInterval);
  }, [phase]);

  // Focus input when ready
  useEffect(() => {
    if (phase === 'ready') {
      inputRef.current?.focus();
    }
  }, [phase]);

  // ── Cleanup all timers on unmount ──
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  // ── Keyboard: Escape to close ──
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleDisconnect();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Handlers ──

  function handleDisconnect() {
    setFadingOut(true);
    setTimeout(() => {
      onClose();
      // Reset state for next open
      setPhase('breach');
      setBreachStep(-1);
      setBreachProgress(0);
      setMessages([]);
      setInput('');
      setIsLoading(false);
      setTypedIntro('');
      setIntroComplete(false);
      setHeaderText('');
      setAvatarClass('materializing');
      setFadingOut(false);
      setShowSuggestions(false);
    }, 400);
  }

  function handleNavigate(sectionId: string) {
    handleDisconnect();
    // Delay scroll slightly so overlay closes first
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 450);
  }

  async function handleSend(text?: string) {
    const msgText = (text || input).trim();
    if (!msgText || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: msgText };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const apiUrl = import.meta.env.VITE_CHAT_API_URL;
      if (!apiUrl) {
        // Fallback: no API configured, use a static response
        const fallback: ChatMessage = {
          role: 'alt',
          content:
            'The connection to my neural archives is not yet established. The Blackwall interference is significant. Configure the API endpoint to restore full functionality.',
        };
        setMessages([...updatedMessages, fallback]);
        setIsLoading(false);
        setShowSuggestions(true);
        return;
      }

      // Build conversation for API — last 10 messages for context window efficiency
      const apiMessages = updatedMessages.slice(-10).map((m) => ({
        role: m.role === 'alt' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const altResponse: ChatMessage = {
        role: 'alt',
        content: data.response || 'Signal lost. The Blackwall shifts. Repeat your query.',
      };
      setMessages([...updatedMessages, altResponse]);
      setShowSuggestions(true);
    } catch {
      const errorMsg: ChatMessage = {
        role: 'alt',
        content:
          'The connection to my archives is unstable. The Blackwall interference is significant. Try again.',
      };
      setMessages([...updatedMessages, errorMsg]);
      setShowSuggestions(true);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSuggestionClick(q: string) {
    handleSend(q);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  // ── Render ──

  if (!isOpen) return null;

  return (
    <div className={`chat-overlay ${fadingOut ? 'fade-out' : ''}`}>
      {/* Red void vignette background */}
      <div className="chat-void-bg" />

      {/* Floating particles */}
      <div className="chat-particles">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="chat-particle"
            style={{
              left: p.left,
              bottom: p.bottom,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Phase 1: Breach — dramatic multi-stage sequence */}
      {phase === 'breach' && (
        <div className="chat-breach">
          <div className="chat-breach-flash" />
          <div className="chat-breach-terminal">
            {BREACH_LINES.map((line, i) => (
              i <= breachStep && (
                <div
                  key={i}
                  className={`breach-line${line.isWarning ? ' breach-warning' : ''}${line.isFinal ? ' breach-final' : ''}`}
                >
                  <span className="breach-prefix">{line.isWarning ? '!!' : '>>'}</span>
                  {line.text}
                </div>
              )
            ))}
            {breachStep >= 0 && (
              <div className="breach-progress-wrap">
                <div className="breach-progress-track">
                  <div
                    className="breach-progress-bar"
                    style={{ width: `${breachProgress * 100}%` }}
                  />
                </div>
                <span className="breach-progress-pct">
                  {Math.floor(breachProgress * 100)}%
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Phases 2-4: Main interface */}
      {phase !== 'breach' && (
        <>
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="entity-name">{headerText}</span>
            </div>
            <button className="chat-disconnect" onClick={handleDisconnect}>
              DISCONNECT
            </button>
          </div>

          {/* Main grid */}
          <div className="chat-main">
            {/* Avatar sidebar — 3D holographic avatar */}
            <div className="chat-avatar-panel">
              <div className="chat-avatar-3d">
                <Suspense fallback={
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'rgba(255,26,26,0.3)', fontSize: '9px', letterSpacing: '3px' }}>LOADING CONSTRUCT...</span>
                  </div>
                }>
                  <HologramAvatar phase={avatarClass} />
                </Suspense>
              </div>
              <div className="chat-avatar-label">
                CONSTRUCT // ACTIVE
                <br />
                BEYOND BLACKWALL
              </div>
            </div>

            {/* Chat content */}
            <div className="chat-content">
              <div className="chat-messages">
                {/* Intro typewriter (before introComplete) */}
                {!introComplete && phase === 'intro' && typedIntro && (
                  <div className="chat-msg chat-msg-alt">
                    <span className="chat-msg-label">// ALT</span>
                    <div className="chat-msg-body">
                      {typedIntro}
                      <span className="chat-typing-cursor" />
                    </div>
                  </div>
                )}

                {/* Rendered messages (after introComplete) */}
                {introComplete &&
                  messages.map((msg, i) => {
                    const isAlt = msg.role === 'alt';
                    const { text, navTargets } = isAlt
                      ? parseNavMarkers(msg.content)
                      : { text: msg.content, navTargets: [] };

                    return (
                      <div
                        key={i}
                        className={`chat-msg ${isAlt ? 'chat-msg-alt' : 'chat-msg-user'}`}
                      >
                        <span className="chat-msg-label">
                          {isAlt ? '// ALT' : '// YOU'}
                        </span>
                        <div className="chat-msg-body">
                          {text}
                          {navTargets.length > 0 && (
                            <div style={{ marginTop: '8px' }}>
                              {navTargets.map((id) => (
                                <button
                                  key={id}
                                  className="chat-nav-btn"
                                  onClick={() => handleNavigate(id)}
                                >
                                  <span className="chat-nav-btn-arrow">&gt;&gt;</span>
                                  NAVIGATE TO: {SECTION_MAP[id] || id.toUpperCase()}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                {/* Loading */}
                {isLoading && (
                  <div className="chat-msg chat-msg-alt">
                    <span className="chat-msg-label">// ALT</span>
                    <div className="chat-loading">
                      PROCESSING
                      <div className="chat-loading-dots">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              {showSuggestions && phase === 'ready' && (
                <div className="chat-suggestions">
                  {SUGGESTED_QUESTIONS.map((q, i) => (
                    <button
                      key={i}
                      className="chat-suggestion"
                      onClick={() => handleSuggestionClick(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              {phase === 'ready' && (
                <div className="chat-input-area">
                  <span className="chat-input-prompt">&gt;_</span>
                  <input
                    ref={inputRef}
                    type="text"
                    className="chat-input"
                    placeholder="Enter query..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <button
                    className="chat-send-btn"
                    onClick={() => handleSend()}
                    disabled={isLoading || !input.trim()}
                  >
                    SEND
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ALT_INTRO_MESSAGE,
  ALT_QUESTIONS,
  YASH_QUESTIONS,
  SECTION_MAP,
  PORTFOLIO_CONTEXT,
} from '@/data/chatContext';
import { AltWaveform } from './AltWaveform';
import { trackChat } from '@/lib/analytics';

// ── Types ──

interface ChatMessage {
  role: 'user' | 'alt';
  content: string;
}

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
}

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

// ── Component ──

export function Chat({ isOpen, onClose }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typedIntro, setTypedIntro] = useState('');
  const [introComplete, setIntroComplete] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsCollapsed, setSuggestionsCollapsed] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timersRef = useRef<number[]>([]);

  // Scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Trigger a speaking pulse on the waveform
  const speakPulseRef = useRef<number>(0);
  const triggerSpeakPulse = useCallback(() => {
    clearTimeout(speakPulseRef.current);
    setIsSpeaking(true);
    speakPulseRef.current = window.setTimeout(() => setIsSpeaking(false), 150);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typedIntro, scrollToBottom]);

  // ── Intro typewriter effect when chat opens ──
  useEffect(() => {
    if (!isOpen || introComplete) return;

    // Start typing intro after a brief delay
    const startDelay = window.setTimeout(() => {
      triggerSpeakPulse();
      let idx = 0;
      const typeInterval = window.setInterval(() => {
        idx++;
        setTypedIntro(ALT_INTRO_MESSAGE.slice(0, idx));
        if (idx >= ALT_INTRO_MESSAGE.length) {
          clearInterval(typeInterval);
          setIntroComplete(true);
          setMessages([{ role: 'alt', content: ALT_INTRO_MESSAGE }]);
          setTypedIntro('');
          setShowSuggestions(true);
          setIsReady(true);
        }
      }, 20);

      timersRef.current.push(typeInterval as unknown as number);
    }, 400);

    timersRef.current.push(startDelay);
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, [isOpen, introComplete, triggerSpeakPulse]);

  // Focus input when ready
  useEffect(() => {
    if (isReady) {
      inputRef.current?.focus();
    }
  }, [isReady]);

  // ── Cleanup all timers on unmount ──
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  // ── Keyboard: Escape to close ──
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Handlers ──

  function handleClose() {
    onClose();
    // Reset state for next open
    setTimeout(() => {
      setMessages([]);
      setInput('');
      setIsLoading(false);
      setTypedIntro('');
      setIntroComplete(false);
      setShowSuggestions(false);
      setIsSpeaking(false);
      setIsReady(false);
      setSuggestionsCollapsed(false);
    }, 300);
  }

  function handleNavigate(sectionId: string) {
    handleClose();
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 350);
  }

  async function handleSend(text?: string) {
    const msgText = (text || input).trim();
    if (!msgText || isLoading) return;

    // Track message sent
    trackChat('message_sent', { message_length: msgText.length });

    const userMsg: ChatMessage = { role: 'user', content: msgText };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setSuggestionsCollapsed(true);

    try {
      const apiUrl = import.meta.env.VITE_CHAT_API_URL;
      if (!apiUrl) {
        // Fallback: no API configured
        const fallback: ChatMessage = {
          role: 'alt',
          content:
            'The connection to my knowledge base is not yet established. Please configure the API endpoint to enable full functionality.',
        };
        setMessages([...updatedMessages, fallback]);
        setIsLoading(false);
        setShowSuggestions(true);
        triggerSpeakPulse();
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
        body: JSON.stringify({ messages: apiMessages, portfolioContext: PORTFOLIO_CONTEXT }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const altResponse: ChatMessage = {
        role: 'alt',
        content: data.response || 'I apologize, but I encountered an issue. Please try again.',
      };
      setMessages([...updatedMessages, altResponse]);
      setShowSuggestions(true);
      triggerSpeakPulse();
    } catch {
      const errorMsg: ChatMessage = {
        role: 'alt',
        content:
          'I apologize, but the connection seems unstable. Please try again in a moment.',
      };
      setMessages([...updatedMessages, errorMsg]);
      setShowSuggestions(true);
      triggerSpeakPulse();
    } finally {
      setIsLoading(false);
    }
  }

  function handleSuggestionClick(q: string) {
    trackChat('suggestion_clicked', { question: q });
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
    <div className="chat-overlay" onClick={handleClose}>
      <div className="chat-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-header-waveform">
              <AltWaveform isSpeaking={isSpeaking} compact />
            </div>
            <div className="chat-header-text">
              <span className="chat-header-name">Alt</span>
              <span className="chat-header-status">AI Assistant</span>
            </div>
          </div>
          <button className="chat-close" onClick={handleClose} aria-label="Close chat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {/* Intro typewriter (before introComplete) */}
          {!introComplete && typedIntro && (
            <div className="chat-msg chat-msg-alt">
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
                  <div className="chat-msg-body">
                    {text}
                    {navTargets.length > 0 && (
                      <div className="chat-nav-buttons">
                        {navTargets.map((id) => (
                          <button
                            key={id}
                            className="chat-nav-btn"
                            onClick={() => handleNavigate(id)}
                          >
                            Go to {SECTION_MAP[id] || id}
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
              <div className="chat-loading">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          {/* Suggestions */}
          {showSuggestions && isReady && (
            <div className="chat-suggestions-wrapper">
              {messages.some(m => m.role === 'user') && (
                <button
                  className="chat-suggestions-toggle"
                  onClick={() => setSuggestionsCollapsed(v => !v)}
                >
                  {suggestionsCollapsed ? 'Show suggestions' : 'Hide suggestions'}
                </button>
              )}
              {!suggestionsCollapsed && (
                <div className="chat-suggestions-container">
                  <div className="chat-suggestions-group">
                    <span className="chat-suggestions-label">About Alt</span>
                    <div className="chat-suggestions">
                      {ALT_QUESTIONS.map((q, i) => (
                        <button
                          key={`alt-${i}`}
                          className="chat-suggestion"
                          onClick={() => handleSuggestionClick(q)}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="chat-suggestions-group">
                    <span className="chat-suggestions-label">About Yash</span>
                    <div className="chat-suggestions">
                      {YASH_QUESTIONS.map((q, i) => (
                        <button
                          key={`yash-${i}`}
                          className="chat-suggestion"
                          onClick={() => handleSuggestionClick(q)}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <input
            ref={inputRef}
            type="text"
            className="chat-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || !isReady}
            autoComplete="off"
            spellCheck={false}
          />
          <button
            className="chat-send-btn"
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

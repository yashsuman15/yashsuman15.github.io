import { useEffect, useRef, useState, useCallback } from 'react';
import { BOOT_LINES } from '@/data/bootLines';
import { DARK_AI_QUOTES } from '@/data/quotes';

interface BootIntroProps {
  onComplete: () => void;
}

export function BootIntro({ onComplete }: BootIntroProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [quoteTagVisible, setQuoteTagVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [ruleExpanded, setRuleExpanded] = useState(false);
  const [authorVisible, setAuthorVisible] = useState(false);
  const [authorText, setAuthorText] = useState('');
  const [progress, setProgress] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  const bootDone = useRef(false);
  const quoteRef = useRef(DARK_AI_QUOTES[Math.floor(Math.random() * DARK_AI_QUOTES.length)]);
  const linesWrapRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);

  const [clock, setClock] = useState('');

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      setClock(`2077.02.28 // ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const finishBoot = useCallback(() => {
    if (bootDone.current) return;
    bootDone.current = true;
    timersRef.current.forEach(clearTimeout);
    setFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 650);
  }, [onComplete]);

  // Boot log lines
  useEffect(() => {
    BOOT_LINES.forEach((line, idx) => {
      const t = window.setTimeout(() => {
        if (bootDone.current) return;
        setVisibleLines(prev => [...prev, idx]);
        if (linesWrapRef.current) {
          linesWrapRef.current.scrollTop = linesWrapRef.current.scrollHeight;
        }
      }, line.delay);
      timersRef.current.push(t);
    });

    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  // Progress bar
  useEffect(() => {
    let pct = 0;
    let quoteShown = false;

    const id = setInterval(() => {
      if (bootDone.current) {
        clearInterval(id);
        return;
      }
      const increment = pct < 30 ? 3.2 : pct < 70 ? 0.9 : pct < 90 ? 1.8 : 2.4;
      pct = Math.min(100, pct + increment * (0.7 + Math.random() * 0.6));
      setProgress(pct);

      if (!quoteShown && pct >= 18) {
        quoteShown = true;
        // Trigger quote display
        setQuoteTagVisible(true);
      }

      if (pct >= 100) {
        clearInterval(id);
        setTimeout(finishBoot, 600);
      }
    }, 55);

    return () => clearInterval(id);
  }, [finishBoot]);

  // Typewriter for quote
  useEffect(() => {
    if (!quoteTagVisible) return;
    const quote = quoteRef.current;
    let i = 0;

    const delay = setTimeout(() => {
      const typeId = setInterval(() => {
        if (bootDone.current) {
          clearInterval(typeId);
          return;
        }
        i++;
        setTypedText(quote.text.slice(0, i));
        if (i >= quote.text.length) {
          clearInterval(typeId);
          setShowCursor(false);
          setTimeout(() => {
            setRuleExpanded(true);
            setTimeout(() => {
              setAuthorText(quote.author);
              setAuthorVisible(true);
            }, 600);
          }, 200);
        }
      }, 22);
    }, 400);

    return () => clearTimeout(delay);
  }, [quoteTagVisible]);

  return (
    <div className={`boot-overlay ${fadingOut ? 'fade-out' : ''}`}>
      {/* Status bar */}
      <div className="boot-statusbar">
        <div className="boot-sb-left">
          <strong>NEURAL_OS</strong>
          <span className="boot-sb-sep">|</span>
          <span>v4.2.1-NIGHT</span>
          <span className="boot-sb-sep">|</span>
          <span>{clock}</span>
        </div>
        <div className="boot-sb-right">
          <div className="boot-sb-dot" />
          <span>SECURE CHANNEL ACTIVE</span>
        </div>
      </div>

      {/* Main panels */}
      <div className="boot-body">
        {/* Left: terminal log */}
        <div className="boot-log">
          <div className="boot-log-header">// SYSTEM INIT LOG</div>
          <div className="boot-lines-wrap" ref={linesWrapRef}>
            {BOOT_LINES.map((line, idx) => (
              <div
                key={idx}
                className={`boot-line ${line.cls} ${visibleLines.includes(idx) ? 'vis' : ''}`}
              >
                {line.text}
              </div>
            ))}
          </div>
        </div>

        {/* Right: quote */}
        <div className="boot-quote-panel">
          <div className={`boot-quote-tag ${quoteTagVisible ? 'vis' : ''}`}>
            // TRANSMISSION INTERCEPTED FROM THE DARK NET
          </div>
          <div className="boot-quote-text">
            <span className="typed-content">{typedText}</span>
            {showCursor && <span className="typed-cursor" />}
          </div>
          <div className={`boot-quote-rule ${ruleExpanded ? 'expand' : ''}`} />
          <div className={`boot-quote-author ${authorVisible ? 'vis' : ''}`}>
            {authorText}
          </div>
        </div>
      </div>

      {/* Footer progress */}
      <div className="boot-footer">
        <span className="boot-progress-label">// ENTERING SYSTEM</span>
        <div className="boot-progress-track">
          <div className="boot-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="boot-progress-pct">{Math.floor(progress)}%</span>
        <button className="boot-skip" onClick={finishBoot}>[ SKIP ]</button>
      </div>
    </div>
  );
}

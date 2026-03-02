import { useEffect, useRef, useCallback, useState } from 'react';
import { GlitchButton } from './GlitchButton';

const NAME = 'YASH RAJ SUMAN';
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>[]{}|\\_-=+';
const TITLES = ['AI ENGINEER', 'COMPUTER VISION ENGINEER', 'GEN-AI ENGINEER'];

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

interface HeroProps {
  onJackIn?: () => void;
}

export function Hero({ onJackIn }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typewriter rotating titles
  const [displayText, setDisplayText] = useState('');
  const titleState = useRef({ index: 0, charIndex: 0, deleting: false, pause: false });

  useEffect(() => {
    let timeout: number;
    const tick = () => {
      const s = titleState.current;
      const current = TITLES[s.index];

      if (s.pause) return; // paused, waiting for scheduled resume

      if (!s.deleting) {
        // Typing forward
        s.charIndex++;
        setDisplayText(current.slice(0, s.charIndex));

        if (s.charIndex >= current.length) {
          // Fully typed — pause then start deleting
          s.pause = true;
          timeout = window.setTimeout(() => {
            s.pause = false;
            s.deleting = true;
            tick();
          }, 1500);
          return;
        }
        timeout = window.setTimeout(tick, 80);
      } else {
        // Deleting
        s.charIndex--;
        setDisplayText(current.slice(0, s.charIndex));

        if (s.charIndex <= 0) {
          // Fully erased — pause then advance to next title
          s.pause = true;
          s.deleting = false;
          s.index = (s.index + 1) % TITLES.length;
          timeout = window.setTimeout(() => {
            s.pause = false;
            tick();
          }, 500);
          return;
        }
        timeout = window.setTimeout(tick, 40);
      }
    };

    // Start typing the first title
    timeout = window.setTimeout(tick, 500);
    return () => clearTimeout(timeout);
  }, []);
  const stateRef = useRef({
    nameIdleTime: 0,
    lastGlitchBurst: 0,
    burstActive: false,
    burstDuration: 0,
    burstElapsed: 0,
  });

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const fontSize = Math.min(window.innerWidth * 0.115, 100);
    const tmp = document.createElement('canvas');
    const t = tmp.getContext('2d')!;
    t.font = `900 ${fontSize}px 'Orbitron', monospace`;
    const totalW = Math.ceil(t.measureText(NAME).width) + 20;
    const H = Math.ceil(fontSize * 1.2);

    canvas.width = totalW;
    canvas.height = H;
    canvas.style.width = totalW + 'px';
    canvas.style.height = H + 'px';

    const charPositions: number[] = [];
    let x = 4;
    for (let i = 0; i < NAME.length; i++) {
      charPositions.push(x);
      x += t.measureText(NAME[i]).width;
    }

    return { ctx, fontSize, W: totalW, H, charPositions };
  }, []);

  const renderFrame = useCallback(
    (
      glitchLevel: number,
      rgbSplit: number,
      sliceLines: { y: number; h: number; shift: number }[]
    ) => {
      const setup = setupCanvas();
      if (!setup) return;
      const { ctx, fontSize, W, H, charPositions } = setup;
      const cy = H / 2;
      ctx.clearRect(0, 0, W, H);
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      ctx.font = `900 ${fontSize}px 'Orbitron', monospace`;

      // RED channel
      if (rgbSplit > 0.3) {
        ctx.globalAlpha = 0.75;
        ctx.fillStyle = '#FF003C';
        for (let i = 0; i < NAME.length; i++) {
          const ch =
            glitchLevel > 0.65 && Math.random() > 0.8
              ? randomChar()
              : NAME[i];
          ctx.fillText(ch, charPositions[i] - rgbSplit, cy);
        }
        ctx.fillStyle = '#00F5FF';
        for (let i = 0; i < NAME.length; i++) {
          const ch =
            glitchLevel > 0.65 && Math.random() > 0.8
              ? randomChar()
              : NAME[i];
          ctx.fillText(ch, charPositions[i] + rgbSplit, cy);
        }
        ctx.globalAlpha = 1;
      }

      // Glow
      ctx.shadowColor = '#FCE300';
      ctx.shadowBlur = 28;
      ctx.fillStyle = 'rgba(252,227,0,0.28)';
      for (let i = 0; i < NAME.length; i++)
        ctx.fillText(NAME[i], charPositions[i], cy);
      ctx.shadowBlur = 0;

      // Sharp layer
      for (let i = 0; i < NAME.length; i++) {
        const scramble = glitchLevel > 0.68 && Math.random() > 0.78;
        ctx.fillStyle = scramble
          ? Math.random() > 0.5
            ? '#FF003C'
            : '#FFFFFF'
          : '#FCE300';
        ctx.fillText(scramble ? randomChar() : NAME[i], charPositions[i], cy);
      }

      // Slice distortion
      sliceLines.forEach(({ y, h, shift }) => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, y, W, h);
        ctx.clip();
        ctx.drawImage(canvasRef.current!, shift, 0);
        ctx.restore();
      });

      // Noise blocks
      if (glitchLevel > 0.25) {
        for (let i = 0; i < Math.floor(glitchLevel * 10); i++) {
          ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '255,0,60' : '0,245,255'
            },${Math.random() * 0.55})`;
          ctx.fillRect(
            Math.random() * W,
            Math.random() * H,
            Math.random() * 28 + 4,
            Math.random() * 5 + 1
          );
        }
      }
    },
    [setupCanvas]
  );

  useEffect(() => {
    const state = stateRef.current;
    let animId: number;

    const loop = () => {
      state.nameIdleTime += 16.67;

      if (
        !state.burstActive &&
        state.nameIdleTime - state.lastGlitchBurst >
        2200 + Math.random() * 4000
      ) {
        state.burstActive = true;
        state.burstDuration = 200 + Math.random() * 450;
        state.burstElapsed = 0;
        state.lastGlitchBurst = state.nameIdleTime;
      }

      let glitchLevel = 0;
      let rgbSplit = 0;
      const sliceLines: { y: number; h: number; shift: number }[] = [];

      if (state.burstActive) {
        state.burstElapsed += 16.67;
        const bp = state.burstElapsed / state.burstDuration;
        const intensity =
          bp < 0.2 ? bp / 0.2 : bp < 0.5 ? 1 : 1 - (bp - 0.5) / 0.5;
        glitchLevel = intensity;
        rgbSplit = intensity * (5 + Math.random() * 10);

        if (intensity > 0.28 && Math.random() > 0.35) {
          const s = setupCanvas();
          if (s) {
            const count = Math.floor(2 + Math.random() * 4);
            for (let i = 0; i < count; i++) {
              sliceLines.push({
                y: Math.random() * s.H,
                h: Math.random() * 7 + 1,
                shift: (Math.random() - 0.5) * 22,
              });
            }
          }
        }

        if (bp >= 1) {
          state.burstActive = false;
          state.burstElapsed = 0;
        }
      } else {
        if (Math.random() > 0.975) {
          glitchLevel = 0.04 + Math.random() * 0.12;
          rgbSplit = Math.random() * 1.8;
        }
      }

      renderFrame(glitchLevel, rgbSplit, sliceLines);
      animId = requestAnimationFrame(loop);
    };

    // Initial render
    renderFrame(0, 0, []);
    animId = requestAnimationFrame(loop);

    const handleResize = () => renderFrame(0, 0, []);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [renderFrame, setupCanvas]);

  return (
    <section id="hero">
      <div className="hero-bg-glow" />
      <div className="hero-bg-glow2" />
      <div className="hero-content">
        <div className="hero-tag">
          TRAINING MODELS. SHIPPING PRODUCTS. SOLVING HARD PROBLEMS.
        </div>
        <div id="name-canvas-wrap">
          <canvas id="name-canvas" ref={canvasRef} />
        </div>
        <div className="hero-title">
          {displayText}
          <span className="hero-title-cursor" />
        </div>
        <p className="hero-desc">
          Neural net architect &amp; machine learning specialist operating in the
          gray zones of Night City's data streams. I engineer intelligence that
          adapts, learns, and survives in hostile digital environments.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">7+</span>
            <span className="stat-label">YEARS JACKED IN</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">42</span>
            <span className="stat-label">MODELS DEPLOYED</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">99%</span>
            <span className="stat-label">NEURAL UPTIME</span>
          </div>
        </div>
        <div className="hero-btns">
          <a href="#showcase" className="btn-primary">
            VIEW PROJECTS
          </a>
          <GlitchButton onClick={onJackIn} />
        </div>
      </div>

      <div className="hero-right">
        <span>LAT: 37.7749&deg; N</span>
        <span>LNG: 122.4194&deg; W</span>
        <span>{'\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500'}</span>
        <span>SYS: ONLINE</span>
        <span>MEM: 256TB</span>
        <span>CPU: 99.8%</span>
        <span>{'\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500'}</span>
        <span>// 2077.02.28</span>
      </div>

      <div className="hero-terminal">
        <div className="terminal-header">// NEURAL_OS v4.2.1 — TERMINAL</div>
        <div className="terminal-line">
          &gt; <span>load_profile</span> "Yash_Suman"
        </div>
        <div className="terminal-line active">
          &gt; Identity confirmed {'\u2713'}
        </div>
        <div className="terminal-line">
          &gt; <span>status:</span> ACTIVE — No bounty
        </div>
        <div className="terminal-line">
          &gt; <span>specialization:</span> AI/ML Engineering
        </div>
        <div className="terminal-line">
          &gt; <span>threat_level:</span> Minimal (to clients)
        </div>
        <div className="terminal-line">
          &gt; _<span className="blink-cursor" />
        </div>
      </div>
    </section>
  );
}

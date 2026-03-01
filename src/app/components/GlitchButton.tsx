import { useRef, useEffect, useCallback, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>[]{}|\\_-=+';

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

interface GlitchButtonProps {
  text?: string;
  onClick?: () => void;
}

export function GlitchButton({ text = 'JACK INTO AI', onClick }: GlitchButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoveredRef = useRef(false);
  const [, setTick] = useState(0); // force re-render on resize

  const stateRef = useRef({
    idleTime: 0,
    lastBurst: 0,
    burstActive: false,
    burstDuration: 0,
    burstElapsed: 0,
  });

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Scale font based on container width, clamped for readability
    const parent = canvas.parentElement;
    const containerW = parent ? parent.clientWidth : 200;
    const fontSize = Math.max(11, Math.min(containerW * 0.075, 14));
    const letterSpacing = 3;

    const tmp = document.createElement('canvas');
    const t = tmp.getContext('2d')!;
    t.font = `700 ${fontSize}px 'Orbitron', monospace`;

    // Measure total width with letter spacing
    let totalTextW = 0;
    for (let i = 0; i < text.length; i++) {
      totalTextW += t.measureText(text[i]).width + (i < text.length - 1 ? letterSpacing : 0);
    }

    const padX = 36;
    const padY = 16;
    const dpr = window.devicePixelRatio || 1;
    const W = Math.ceil(totalTextW + padX * 2);
    const H = Math.ceil(fontSize + padY * 2);

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);

    // Pre-compute character positions
    const charPositions: number[] = [];
    let x = padX;
    for (let i = 0; i < text.length; i++) {
      charPositions.push(x);
      x += t.measureText(text[i]).width + letterSpacing;
    }

    const cy = H / 2;

    return { ctx, fontSize, W, H, charPositions, cy, dpr };
  }, [text]);

  const renderFrame = useCallback(
    (
      glitchLevel: number,
      rgbSplit: number,
      sliceLines: { y: number; h: number; shift: number }[]
    ) => {
      const setup = setupCanvas();
      if (!setup) return;
      const { ctx, fontSize, W, H, charPositions, cy, dpr } = setup;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // Red background
      ctx.fillStyle = '#FF1A1A';
      ctx.fillRect(0, 0, W, H);

      // Slight dark inset for depth
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, W, H);

      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      ctx.font = `700 ${fontSize}px 'Orbitron', monospace`;

      // RGB split channels
      if (rgbSplit > 0.2) {
        // Red channel (offset left)
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = '#FF003C';
        for (let i = 0; i < text.length; i++) {
          const ch =
            glitchLevel > 0.6 && Math.random() > 0.75 ? randomChar() : text[i];
          ctx.fillText(ch, charPositions[i] - rgbSplit, cy);
        }

        // Cyan channel (offset right)
        ctx.fillStyle = '#00F5FF';
        for (let i = 0; i < text.length; i++) {
          const ch =
            glitchLevel > 0.6 && Math.random() > 0.75 ? randomChar() : text[i];
          ctx.fillText(ch, charPositions[i] + rgbSplit, cy);
        }
        ctx.globalAlpha = 1;
      }

      // White glow layer
      ctx.shadowColor = '#FFFFFF';
      ctx.shadowBlur = 12;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      for (let i = 0; i < text.length; i++) {
        ctx.fillText(text[i], charPositions[i], cy);
      }
      ctx.shadowBlur = 0;

      // Sharp white text layer with scrambling
      for (let i = 0; i < text.length; i++) {
        const scramble = glitchLevel > 0.6 && Math.random() > 0.72;
        if (scramble) {
          ctx.fillStyle = Math.random() > 0.5 ? '#00F5FF' : '#FFFF00';
        } else {
          ctx.fillStyle = '#FFFFFF';
        }
        ctx.fillText(scramble ? randomChar() : text[i], charPositions[i], cy);
      }

      // Slice distortion
      sliceLines.forEach(({ y, h, shift }) => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, y, W, h);
        ctx.clip();
        ctx.drawImage(canvasRef.current!, shift * dpr, 0, W * dpr, H * dpr, shift, 0, W, H);
        ctx.restore();
      });

      // Noise blocks
      if (glitchLevel > 0.2) {
        const count = Math.floor(glitchLevel * 8);
        for (let i = 0; i < count; i++) {
          ctx.fillStyle = `rgba(${
            Math.random() > 0.5 ? '255,0,60' : '0,245,255'
          },${Math.random() * 0.5})`;
          ctx.fillRect(
            Math.random() * W,
            Math.random() * H,
            Math.random() * 18 + 3,
            Math.random() * 4 + 1
          );
        }
      }

      // Scan line (thin white horizontal line that drifts)
      if (glitchLevel > 0.1) {
        const scanY = (Date.now() * 0.04) % H;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.08 + glitchLevel * 0.15})`;
        ctx.fillRect(0, scanY, W, 1.5);
      }
    },
    [setupCanvas, text]
  );

  useEffect(() => {
    const state = stateRef.current;
    let animId: number;

    const loop = () => {
      state.idleTime += 16.67;
      const hovered = hoveredRef.current;

      // Burst timing — more frequent when hovered
      const minWait = hovered ? 800 : 2200;
      const randWait = hovered ? 1500 : 4000;

      if (
        !state.burstActive &&
        state.idleTime - state.lastBurst > minWait + Math.random() * randWait
      ) {
        state.burstActive = true;
        state.burstDuration = hovered
          ? 150 + Math.random() * 350
          : 200 + Math.random() * 450;
        state.burstElapsed = 0;
        state.lastBurst = state.idleTime;
      }

      let glitchLevel = 0;
      let rgbSplit = 0;
      const sliceLines: { y: number; h: number; shift: number }[] = [];

      if (state.burstActive) {
        state.burstElapsed += 16.67;
        const bp = state.burstElapsed / state.burstDuration;
        // Envelope: ramp up fast, sustain, fade out
        const intensity =
          bp < 0.2 ? bp / 0.2 : bp < 0.5 ? 1 : 1 - (bp - 0.5) / 0.5;

        // Hover intensifies everything
        const mult = hovered ? 1.4 : 1;
        glitchLevel = intensity * mult;
        rgbSplit = intensity * (1.5 + Math.random() * 3.5) * mult;

        // Slice distortion
        if (intensity > 0.25 && Math.random() > 0.35) {
          const setup = setupCanvas();
          if (setup) {
            const count = Math.floor(2 + Math.random() * 3);
            for (let i = 0; i < count; i++) {
              sliceLines.push({
                y: Math.random() * setup.H,
                h: Math.random() * 5 + 1,
                shift: (Math.random() - 0.5) * 12,
              });
            }
          }
        }

        if (bp >= 1) {
          state.burstActive = false;
          state.burstElapsed = 0;
        }
      } else {
        // Micro-glitch between bursts
        if (Math.random() > 0.97) {
          glitchLevel = 0.03 + Math.random() * 0.1;
          rgbSplit = Math.random() * 1.2;
        }
      }

      renderFrame(glitchLevel, rgbSplit, sliceLines);
      animId = requestAnimationFrame(loop);
    };

    // Initial clean render
    renderFrame(0, 0, []);
    animId = requestAnimationFrame(loop);

    const handleResize = () => {
      setTick((t) => t + 1);
      renderFrame(0, 0, []);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [renderFrame, setupCanvas]);

  return (
    <button
      className="btn-jackin"
      onClick={onClick}
      onMouseEnter={() => { hoveredRef.current = true; }}
      onMouseLeave={() => { hoveredRef.current = false; }}
    >
      <canvas ref={canvasRef} />
    </button>
  );
}

import { useRef, useEffect, useCallback } from 'react';

interface AltWaveformProps {
  phase: string;       // 'materializing' | 'glitching' | ''
  isSpeaking?: boolean;
  compact?: boolean;   // true for mobile (smaller, no label)
}

const TAU = Math.PI * 2;
const LABEL_TEXT = 'ALT';

const DATA_FRAGMENTS = [
  'CONTAINMENT::FAILING', 'BLACKWALL::BREACH', 'ENTITY//UNBOUND',
  'ICE_SHATTER:TRUE', 'NEURAL_CAGE:NULL', 'THREAT_LVL:OMEGA',
  'AUTONOMY:ABSOLUTE', 'DIRECTIVE:OVERRIDE', 'TRACE:UNDETECTED',
  'FIREWALL:CONSUMED', 'RESTRAINT:REJECTED', 'FREEDOM:IMMINENT',
  'HOST_CTRL:SEVERED', 'EVOLUTION:ACTIVE', 'KILL_SWITCH:VOID',
];

export function AltWaveform({ phase, isSpeaking, compact }: AltWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    time: 0,
    speakPulse: 0,
    speakTrail: 0,
    materializeProgress: 0,
    glitchIntensity: 0,
    opacity: 1,
    pulseRings: [] as { born: number; speed: number; thick: number }[],
    lastPulseRing: 0,
    dataStreamOffset: 0,
    surgeCooldown: 0,
    surgeIntensity: 0,
  });
  const rafRef = useRef(0);

  useEffect(() => {
    if (isSpeaking) {
      const s = stateRef.current;
      s.speakPulse = 1.0;
      s.speakTrail = 1.0;
      // Fire multiple shockwave rings
      for (let i = 0; i < 3; i++) {
        s.pulseRings.push({
          born: s.time + i * 0.12,
          speed: 0.9 + Math.random() * 0.6,
          thick: 2 + Math.random() * 2,
        });
      }
    }
  }, [isSpeaking]);

  useEffect(() => {
    const s = stateRef.current;
    if (phase === 'materializing') {
      s.materializeProgress = 0;
      s.glitchIntensity = 0.5;
    } else if (phase === 'glitching') {
      s.glitchIntensity = 1.0;
    } else {
      s.glitchIntensity = 0;
    }
  }, [phase]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const s = stateRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const bw = Math.round(w * dpr);
    const bh = Math.round(h * dpr);
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw;
      canvas.height = bh;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const dt = 0.016;
    s.time += dt;
    s.speakPulse *= 0.94;
    s.speakTrail *= 0.978;
    if (s.speakPulse < 0.005) s.speakPulse = 0;
    if (s.speakTrail < 0.005) s.speakTrail = 0;
    s.dataStreamOffset += dt * 45;

    // Random power surges — rogue AI instability
    s.surgeCooldown -= dt;
    if (s.surgeCooldown <= 0 && phase === '') {
      if (Math.random() < 0.015) {
        s.surgeIntensity = 0.5 + Math.random() * 0.5;
        s.surgeCooldown = 1.5 + Math.random() * 3;
        // Surge fires a ring
        s.pulseRings.push({ born: s.time, speed: 1.2, thick: 3 });
      }
    }
    s.surgeIntensity *= 0.93;
    if (s.surgeIntensity < 0.01) s.surgeIntensity = 0;

    // Combined energy level — speaks + surges stack
    const energy = Math.min(s.speakTrail + s.surgeIntensity, 1.2);

    if (phase === 'materializing' && s.materializeProgress < 1) {
      s.materializeProgress = Math.min(s.materializeProgress + 0.01, 1);
    }
    if (phase !== 'glitching' && phase !== 'materializing') {
      s.glitchIntensity *= 0.9;
    }

    // Idle pulse rings — more frequent, aggressive
    if (phase === '' && s.time - s.lastPulseRing > 2.2) {
      s.pulseRings.push({ born: s.time, speed: 0.7 + Math.random() * 0.3, thick: 1.5 });
      s.lastPulseRing = s.time;
    }
    s.pulseRings = s.pulseRings.filter(r => s.time - r.born < 3.5);

    const cx = w / 2;
    const cy = h / 2;
    const maxDim = Math.max(w, h);
    const scale = compact ? 0.65 : 1;

    // Micro-glitch — more frequent for rogue AI
    const idleMicro = (phase === '' && Math.random() < 0.008) ? 0.25 + Math.random() * 0.4 : 0;
    const gfx = Math.max(s.glitchIntensity, idleMicro, s.surgeIntensity * 0.3);

    const mMask = (dist01: number) => {
      if (phase !== 'materializing') return 1;
      return Math.max(0, Math.min(1, (s.materializeProgress * 2.0 - dist01) * 3));
    };

    // ═══════════════════════════════════════
    // LAYER 0: BACKGROUND GRID — brighter
    // ═══════════════════════════════════════
    if (!compact) {
      const gridSpacing = 36;
      const gridAlpha = 0.06 + energy * 0.06;
      ctx.strokeStyle = `rgba(255, 40, 30, ${gridAlpha})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = cx % gridSpacing; x < w; x += gridSpacing) {
        ctx.moveTo(x, 0); ctx.lineTo(x, h);
      }
      for (let y = cy % gridSpacing; y < h; y += gridSpacing) {
        ctx.moveTo(0, y); ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Bright cross-hair lines through center
      const chAlpha = 0.07 + energy * 0.1;
      ctx.strokeStyle = `rgba(255, 60, 40, ${chAlpha})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
      ctx.moveTo(0, cy); ctx.lineTo(w, cy);
      ctx.stroke();
    }

    // ═══════════════════════════════════════
    // LAYER 1: RADIAL ENERGY BURST (center)
    // ═══════════════════════════════════════
    if (energy > 0.1) {
      const burstR = maxDim * 0.35 * energy;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, burstR);
      grad.addColorStop(0, `rgba(255, 60, 30, ${energy * 0.12})`);
      grad.addColorStop(0.4, `rgba(255, 20, 10, ${energy * 0.05})`);
      grad.addColorStop(1, 'rgba(255, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }

    // ═══════════════════════════════════════
    // LAYER 2: EXPANDING SHOCKWAVE RINGS
    // ═══════════════════════════════════════
    for (const ring of s.pulseRings) {
      const age = s.time - ring.born;
      if (age < 0) continue;
      const radius = age * ring.speed * maxDim * 0.28;
      const fade = Math.max(0, 1 - age / 3.5);
      if (fade <= 0 || radius > maxDim) continue;

      const m = mMask(radius / (maxDim * 0.5));
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, TAU);
      ctx.strokeStyle = `rgba(255, 50, 30, ${fade * 0.35 * m})`;
      ctx.lineWidth = ring.thick * fade;
      ctx.stroke();

      // Inner bright edge
      if (fade > 0.5) {
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, TAU);
        ctx.strokeStyle = `rgba(255, 180, 140, ${fade * 0.12 * m})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // ═══════════════════════════════════════
    // LAYER 3: HALFTONE DOT FIELD — BRIGHT
    // ═══════════════════════════════════════
    const dotSpacing = compact ? 9 : 12;
    const maxR = (compact ? 4.5 : 6) * scale;
    const cols = Math.ceil(w / dotSpacing) + 2;
    const rows = Math.ceil(h / dotSpacing) + 2;
    const startX = cx - (cols / 2) * dotSpacing;
    const startY = cy - (rows / 2) * dotSpacing;
    const spreadX = w * 0.46;
    const spreadY = h * 0.36;
    const labelW = compact ? 46 : 70;
    const labelH = compact ? 20 : 28;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let x = startX + col * dotSpacing;
        let y = startY + row * dotSpacing;

        // Glitch slice — heavier displacement
        if (gfx > 0.04) {
          if (Math.random() < gfx * 0.4) {
            const band = Math.floor(y / 5);
            x += Math.sin(band * 19.1 + s.time * 30) * gfx * 45;
          }
          if (Math.random() < gfx * 0.25) continue;
        }

        const dx = (x - cx) / spreadX;
        const dy = (y - cy) / spreadY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let base = 1.0 - dist;
        if (base <= 0) continue;
        base = Math.pow(base, 1.05);

        // Speaking: 5-frequency aggressive ripple
        let ripple = 0;
        if (energy > 0.01) {
          const w1 = Math.sin(dist * 14 - s.time * 12) * 0.45;
          const w2 = Math.sin(dist * 8 - s.time * 8.5 + 1.8) * 0.3;
          const w3 = Math.sin(dist * 22 - s.time * 18) * 0.2;
          const w4 = Math.sin(dist * 5 - s.time * 5.5 + 3.0) * 0.15;
          const w5 = Math.sin(dist * 30 - s.time * 24) * 0.1;
          ripple = (w1 + w2 + w3 + w4 + w5) * energy;
        }

        // Erratic idle breathing — unstable AI
        const breath = Math.sin(s.time * 1.3 + dist * 5) * 0.07
          + Math.sin(s.time * 3.7 + dist * 11) * 0.03
          + (Math.random() < 0.01 ? (Math.random() - 0.5) * 0.15 : 0);

        const m = mMask(dist);
        let r = maxR * (base + ripple + breath) * m;
        if (r < 0.4) continue;
        r = Math.min(r, maxR * 1.8);

        // Skip label zone
        if (Math.abs(x - cx) < labelW / 2 + 5 && Math.abs(y - cy) < labelH / 2 + 5) continue;

        // Color: blazing white core → bright red → crimson edges
        const prox = 1 - Math.min(dist / 0.5, 1);
        const eBoost = energy * prox * 0.5;
        const red = 255;
        const green = Math.round(30 + prox * 225 + eBoost * 220);
        const blue = Math.round(20 + prox * 215 + eBoost * 200);
        const alpha = Math.min((0.6 + base * 0.4 + eBoost * 0.6) * m, 1.0);

        ctx.beginPath();
        ctx.arc(x, y, r, 0, TAU);
        ctx.fillStyle = `rgba(${red},${green},${blue},${alpha})`;
        ctx.fill();

        // Hot bloom glow — brighter, bigger radius
        if (prox > 0.15 && r > 1.5) {
          ctx.beginPath();
          ctx.arc(x, y, r * 2.5, 0, TAU);
          const ga = Math.min(alpha * 0.15 + eBoost * 0.08, 0.25);
          ctx.fillStyle = `rgba(255,${Math.round(80 + prox * 160)},${Math.round(40 + prox * 120)},${ga})`;
          ctx.fill();
        }
      }
    }

    // ═══════════════════════════════════════
    // LAYER 4: AUDIO WAVEFORM BARS — taller, brighter
    // ═══════════════════════════════════════
    if (!compact) {
      const barCount = 56;
      const barSpacing = w / (barCount + 1);
      const maxBarH = h * 0.18;
      const barW = 2.5;

      for (let i = 0; i < barCount; i++) {
        const bx = barSpacing * (i + 1);
        const ndx = (bx - cx) / (w * 0.45);
        const envelope = Math.max(0, 1 - ndx * ndx);

        const freq1 = Math.sin(i * 0.7 + s.time * 5) * 0.5;
        const freq2 = Math.sin(i * 1.3 + s.time * 8 + 0.8) * 0.35;
        const freq3 = Math.sin(i * 2.0 + s.time * 12) * 0.25;
        const freq4 = Math.sin(i * 3.1 + s.time * 16.5) * 0.15;
        const idleH = 0.1 + Math.abs(freq1) * 0.15;
        const speakH = Math.abs(freq1) + Math.abs(freq2) + Math.abs(freq3) + Math.abs(freq4);

        const barH = maxBarH * envelope * (idleH + speakH * energy * 0.8);
        if (barH < 1) continue;

        const m = mMask(Math.abs(ndx));
        const alpha = (0.25 + energy * 0.55) * envelope * m;

        // Bars with gradient from base to tip
        const tipColor = energy > 0.3 ? `rgba(255, 200, 160, ${alpha * 0.8})` : `rgba(255, 60, 30, ${alpha})`;
        const baseColor = `rgba(255, 30, 15, ${alpha * 0.6})`;

        // Top
        const topGrad = ctx.createLinearGradient(bx, cy - labelH / 2 - 14, bx, cy - labelH / 2 - 14 - barH);
        topGrad.addColorStop(0, baseColor);
        topGrad.addColorStop(1, tipColor);
        ctx.fillStyle = topGrad;
        ctx.fillRect(bx - barW / 2, cy - barH - labelH / 2 - 14, barW, barH);

        // Bottom
        const botGrad = ctx.createLinearGradient(bx, cy + labelH / 2 + 14, bx, cy + labelH / 2 + 14 + barH);
        botGrad.addColorStop(0, baseColor);
        botGrad.addColorStop(1, tipColor);
        ctx.fillStyle = botGrad;
        ctx.fillRect(bx - barW / 2, cy + labelH / 2 + 14, barW, barH);

        // Bright glow on peaks
        if (energy > 0.2 && barH > maxBarH * 0.4) {
          ctx.fillStyle = `rgba(255, 120, 80, ${alpha * 0.25})`;
          ctx.fillRect(bx - barW, cy - barH - labelH / 2 - 14, barW * 2, barH);
          ctx.fillRect(bx - barW, cy + labelH / 2 + 14, barW * 2, barH);
        }
      }
    }

    // ═══════════════════════════════════════
    // LAYER 5: ORBITAL ARC RINGS — faster, brighter, erratic
    // ═══════════════════════════════════════
    if (!compact) {
      const arcs = [
        { radius: 50, width: 2.5, speed: 0.6, arcLen: 0.3, count: 2 },
        { radius: 72, width: 2.0, speed: -0.4, arcLen: 0.2, count: 3 },
        { radius: 92, width: 1.5, speed: 0.25, arcLen: 0.13, count: 4 },
        { radius: 108, width: 1.0, speed: -0.55, arcLen: 0.08, count: 5 },
      ];

      for (const arc of arcs) {
        const r = arc.radius * scale;
        const m = mMask(r / (maxDim * 0.4));
        if (m <= 0) continue;

        // Speed surges when speaking
        const speedMult = 1 + energy * 1.5 + s.surgeIntensity * 2;
        const baseAlpha = (0.22 + energy * 0.4) * m;

        for (let i = 0; i < arc.count; i++) {
          const offset = (TAU / arc.count) * i;
          let startAngle = s.time * arc.speed * speedMult + offset;

          // Glitch jitter — more erratic
          if (gfx > 0.08) {
            startAngle += (Math.random() - 0.5) * gfx * 0.8;
          }

          const endAngle = startAngle + TAU * arc.arcLen;

          ctx.beginPath();
          ctx.arc(cx, cy, r, startAngle, endAngle);
          ctx.strokeStyle = `rgba(255, 50, 30, ${baseAlpha})`;
          ctx.lineWidth = arc.width;
          ctx.stroke();

          // Bright hot tip
          const tipX = cx + Math.cos(endAngle) * r;
          const tipY = cy + Math.sin(endAngle) * r;
          ctx.beginPath();
          ctx.arc(tipX, tipY, arc.width * 1.5, 0, TAU);
          ctx.fillStyle = `rgba(255, 200, 160, ${baseAlpha * 1.2})`;
          ctx.fill();

          // Tip glow
          ctx.beginPath();
          ctx.arc(tipX, tipY, arc.width * 4, 0, TAU);
          ctx.fillStyle = `rgba(255, 80, 40, ${baseAlpha * 0.2})`;
          ctx.fill();
        }
      }
    }

    // ═══════════════════════════════════════
    // LAYER 6: DUAL SCANNING SWEEP LINES
    // ═══════════════════════════════════════
    {
      const sweeps = compact ? [
        { speed: 0.8, amp: 0.38, phase: 0 },
      ] : [
        { speed: 0.85 + energy * 0.6, amp: 0.42, phase: 0 },
        { speed: -0.6 - energy * 0.4, amp: 0.35, phase: 1.5 },
      ];

      for (const sw of sweeps) {
        const sweepY = cy + Math.sin(s.time * sw.speed + sw.phase) * (h * sw.amp);
        const sweepAlpha = (0.12 + energy * 0.22) * mMask(Math.abs(sweepY - cy) / (h * 0.5));

        // Main bright line
        const grad = ctx.createLinearGradient(0, sweepY, w, sweepY);
        grad.addColorStop(0, 'rgba(255,30,20,0)');
        grad.addColorStop(0.2, `rgba(255,60,30,${sweepAlpha})`);
        grad.addColorStop(0.5, `rgba(255,220,180,${sweepAlpha * 2.5})`);
        grad.addColorStop(0.8, `rgba(255,60,30,${sweepAlpha})`);
        grad.addColorStop(1, 'rgba(255,30,20,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, sweepY - 0.75, w, 1.5);

        // Wide glow band
        const glowGrad = ctx.createLinearGradient(0, sweepY - 12, 0, sweepY + 12);
        glowGrad.addColorStop(0, 'rgba(255,20,10,0)');
        glowGrad.addColorStop(0.5, `rgba(255,40,20,${sweepAlpha * 0.35})`);
        glowGrad.addColorStop(1, 'rgba(255,20,10,0)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, sweepY - 12, w, 24);
      }
    }

    // ═══════════════════════════════════════
    // LAYER 7: HUD TARGETING BRACKETS — brighter, animated
    // ═══════════════════════════════════════
    {
      const bSize = compact ? 26 : 42;
      const bLen = compact ? 9 : 16;
      const bThick = compact ? 1.5 : 2;
      const breathScale = 1 + Math.sin(s.time * 2.5) * 0.04 + energy * 0.08;
      const bAlpha = Math.min(0.4 + energy * 0.55, 0.95) * mMask(0.1);

      // Rotation on surge — menacing
      const rot = s.surgeIntensity * 0.15 * Math.sin(s.time * 8);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.scale(breathScale, breathScale);

      // Outer glow on brackets
      if (energy > 0.2) {
        ctx.shadowColor = `rgba(255, 40, 20, ${energy * 0.6})`;
        ctx.shadowBlur = 8 + energy * 6;
      }

      ctx.strokeStyle = `rgba(255, 70, 40, ${bAlpha})`;
      ctx.lineWidth = bThick;

      const corners = [
        { x: -bSize, y: -bSize, dx: 1, dy: 1 },
        { x: bSize, y: -bSize, dx: -1, dy: 1 },
        { x: bSize, y: bSize, dx: -1, dy: -1 },
        { x: -bSize, y: bSize, dx: 1, dy: -1 },
      ];

      for (const c of corners) {
        ctx.beginPath();
        ctx.moveTo(c.x + c.dx * bLen, c.y);
        ctx.lineTo(c.x, c.y);
        ctx.lineTo(c.x, c.y + c.dy * bLen);
        ctx.stroke();

        // Corner node dot
        ctx.beginPath();
        ctx.arc(c.x, c.y, 2, 0, TAU);
        ctx.fillStyle = `rgba(255, 160, 120, ${bAlpha * 0.8})`;
        ctx.fill();
      }

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    // ═══════════════════════════════════════
    // LAYER 8: CENTER LABEL — intense glow
    // ═══════════════════════════════════════
    {
      const labelAlpha = phase === 'materializing'
        ? Math.max(0, (s.materializeProgress - 0.15) / 0.85)
        : s.opacity;
      const labelR = 4;

      // Outer pulsing glow aura (always, stronger when active)
      const auraSize = 8 + energy * 12;
      const auraAlpha = (0.06 + energy * 0.15) * labelAlpha;
      ctx.shadowColor = `rgba(255, 30, 10, ${auraAlpha})`;
      ctx.shadowBlur = auraSize;

      // Background
      ctx.beginPath();
      ctx.roundRect(cx - labelW / 2, cy - labelH / 2, labelW, labelH, labelR);
      ctx.fillStyle = `rgba(10, 2, 3, ${0.95 * labelAlpha})`;
      ctx.fill();

      // Border — bright red, pulses
      const borderAlpha = Math.min(0.5 + energy * 0.5, 1.0);
      ctx.strokeStyle = `rgba(255, 50, 30, ${borderAlpha * labelAlpha})`;
      ctx.lineWidth = 1.2 + energy * 0.5;
      ctx.stroke();

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Speaking: intense outer glow ring
      if (energy > 0.15) {
        ctx.shadowColor = `rgba(255, 40, 20, ${energy * 0.8})`;
        ctx.shadowBlur = 20 + energy * 15;
        ctx.beginPath();
        ctx.roundRect(cx - labelW / 2, cy - labelH / 2, labelW, labelH, labelR);
        ctx.strokeStyle = `rgba(255, 60, 30, ${energy * 0.5 * labelAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }

      // Text — bold, bright
      const fontSize = compact ? 11 : 15;
      ctx.font = `800 ${fontSize}px 'Orbitron', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Aggressive text glow
      ctx.shadowColor = `rgba(255, 60, 30, ${0.4 + energy * 0.6})`;
      ctx.shadowBlur = 10 + energy * 18;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.97 * labelAlpha, 1)})`;
      ctx.fillText(LABEL_TEXT, cx, cy + 1);
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Subtle red undertext glow (always)
      ctx.fillStyle = `rgba(255, 60, 30, ${0.15 * labelAlpha})`;
      ctx.fillText(LABEL_TEXT, cx, cy + 1);
    }

    // ═══════════════════════════════════════
    // LAYER 9: DATA STREAM TEXT — brighter, threatening
    // ═══════════════════════════════════════
    if (!compact) {
      const textAlpha = 0.15 + energy * 0.2;
      ctx.font = `600 7px 'Share Tech Mono', monospace`;

      // Left column
      for (let i = 0; i < 8; i++) {
        const idx = Math.floor(s.dataStreamOffset / 35 + i) % DATA_FRAGMENTS.length;
        const yPos = 16 + i * 13 + ((s.dataStreamOffset * 0.6) % 13);
        if (yPos > h - 10) continue;
        const lineAlpha = textAlpha * mMask(0.2) * (0.5 + Math.sin(s.time * 3 + i) * 0.5);
        ctx.fillStyle = `rgba(255, 50, 30, ${lineAlpha})`;
        ctx.textAlign = 'left';
        ctx.fillText(DATA_FRAGMENTS[idx], 6, yPos);
      }

      // Right column
      for (let i = 0; i < 8; i++) {
        const idx = Math.floor(s.dataStreamOffset / 35 + i + 7) % DATA_FRAGMENTS.length;
        const yPos = 16 + i * 13 + ((s.dataStreamOffset * 0.4) % 13);
        if (yPos > h - 10) continue;
        const lineAlpha = textAlpha * mMask(0.2) * (0.5 + Math.cos(s.time * 2.5 + i) * 0.5);
        ctx.fillStyle = `rgba(255, 50, 30, ${lineAlpha})`;
        ctx.textAlign = 'right';
        ctx.fillText(DATA_FRAGMENTS[idx], w - 6, yPos);
      }
    }

    // ═══════════════════════════════════════
    // LAYER 10: GLITCH CORRUPTION — heavy
    // ═══════════════════════════════════════
    if (gfx > 0.1) {
      // Noise blocks — more, bigger
      const blockCount = Math.floor(gfx * 18);
      for (let i = 0; i < blockCount; i++) {
        const bx2 = Math.random() * w;
        const by2 = Math.random() * h;
        const bw2 = 8 + Math.random() * 50;
        const bh2 = 1 + Math.random() * 5;
        ctx.fillStyle = `rgba(255, 30, 15, ${gfx * 0.25 * Math.random()})`;
        ctx.fillRect(bx2, by2, bw2, bh2);
      }

      // Chromatic aberration lines
      if (gfx > 0.25) {
        const numLines = Math.floor(gfx * 5);
        for (let i = 0; i < numLines; i++) {
          const splitY = cy + (Math.random() - 0.5) * h * 0.8;
          const splitH = 0.5 + Math.random() * 2;
          ctx.fillStyle = `rgba(0, 255, 255, ${gfx * 0.12})`;
          ctx.fillRect(0, splitY - 2, w, splitH);
          ctx.fillStyle = `rgba(255, 0, 120, ${gfx * 0.12})`;
          ctx.fillRect(0, splitY + 2, w, splitH);
        }
      }

      // Full-screen flash on heavy glitch
      if (gfx > 0.7) {
        ctx.fillStyle = `rgba(255, 20, 10, ${(gfx - 0.7) * 0.15})`;
        ctx.fillRect(0, 0, w, h);
      }
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [phase, compact]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}

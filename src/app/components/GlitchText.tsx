import { useState, useEffect, CSSProperties, ElementType, createElement } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: ElementType;
  intensity?: 'low' | 'medium' | 'high';
  style?: CSSProperties;
}

export function GlitchText({ text, className = '', as: Tag = 'span', intensity = 'medium', style }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const baseInterval = { low: 5000, medium: 3000, high: 1800 }[intensity];
    const baseDuration = { low: 80, medium: 150, high: 220 }[intensity];

    const trigger = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), baseDuration + Math.random() * 100);
      if (Math.random() > 0.6) {
        setTimeout(() => setIsGlitching(true), baseDuration + 80);
        setTimeout(() => setIsGlitching(false), baseDuration + 200);
      }
    };

    const id = setInterval(trigger, baseInterval + Math.random() * 2000);
    const initialDelay = setTimeout(trigger, 500);
    return () => {
      clearInterval(id);
      clearTimeout(initialDelay);
    };
  }, [intensity]);

  return createElement(
    Tag,
    {
      className: `glitch-text ${isGlitching ? 'active-glitch' : ''} ${className}`,
      'data-text': text,
      style: { position: 'relative', display: 'inline-block', ...style },
    },
    text
  );
}

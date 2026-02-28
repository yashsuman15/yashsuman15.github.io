import { useEffect, useState } from 'react';

const SECTIONS = ['hero', 'about', 'showcase', 'skills', 'experience', 'contact'];

export function ScrollIndicator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const updateDots = () => {
      const scrollY = window.scrollY;
      let current = 0;
      SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop - 200 <= scrollY) current = i;
      });
      setActive(current);
    };

    window.addEventListener('scroll', updateDots);
    return () => window.removeEventListener('scroll', updateDots);
  }, []);

  const scrollTo = (i: number) => {
    const el = document.getElementById(SECTIONS[i]);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="scroll-indicator">
      {SECTIONS.map((_, i) => (
        <div
          key={i}
          className={`scroll-dot ${i === active ? 'active' : ''}`}
          onClick={() => scrollTo(i)}
        />
      ))}
    </div>
  );
}

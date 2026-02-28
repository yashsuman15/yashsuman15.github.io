import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.15;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.15;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorPos.current.x}px`;
        cursorRef.current.style.top = `${cursorPos.current.y}px`;
      }
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    const rafId = requestAnimationFrame(animate);

    // Interactive elements hover
    const addHover = () => {
      document.querySelectorAll('a, button, .project-row, .skill-card, .contact-link, .showcase-video-pane').forEach(el => {
        el.addEventListener('mouseenter', () => setActive(true));
        el.addEventListener('mouseleave', () => setActive(false));
      });
    };

    // Delay to ensure DOM is ready
    const timeout = setTimeout(addHover, 1000);
    // Re-attach on mutations
    const observer = new MutationObserver(() => {
      setTimeout(addHover, 100);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={`cursor ${active ? 'active' : ''}`} />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}

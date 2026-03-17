import { useEffect, useRef } from 'react';
import { PROFICIENCIES, SKILL_COLUMNS } from '@/data/about';

export function Skills() {
  const profGridRef = useRef<HTMLDivElement>(null);

  // Animate proficiency bars when they come into view
  useEffect(() => {
    const profGrid = profGridRef.current;
    if (!profGrid) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate all bars
            profGrid.querySelectorAll<HTMLElement>('.prof-fill').forEach((bar) => {
              const width = bar.getAttribute('data-w');
              if (width) bar.style.width = width + '%';
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(profGrid);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section section-alt">
      <div className="section-header">
        <h2>Technical Stack</h2>
        <p className="section-sub">
          Tools and frameworks for building production-grade AI systems.
        </p>
      </div>

      {/* Proficiency Bars */}
      <div className="prof-grid" ref={profGridRef}>
        {PROFICIENCIES.map((prof) => (
          <div key={prof.name} className="prof-item">
            <div className="prof-top">
              <span>{prof.name}</span>
              <span className="prof-pct">{prof.percentage}%</span>
            </div>
            <div className="prof-bar">
              <div className="prof-fill" data-w={prof.percentage} />
            </div>
          </div>
        ))}
      </div>

      {/* Skill Columns */}
      <div className="grid grid-4 skills-grid">
        {SKILL_COLUMNS.map((col) => (
          <div key={col.title} className="skill-col">
            <h4>{col.title}</h4>
            <ul>
              {col.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

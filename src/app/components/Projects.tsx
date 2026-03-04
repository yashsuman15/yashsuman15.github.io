import { HIGHLIGHTS } from '@/data/projects';

export function Projects() {
  if (HIGHLIGHTS.length === 0) return null;

  return (
    <section id="projects">
      <div className="section-header">
        <span className="section-num">03</span>
        <h2 className="section-title">HIGHLIGHTS</h2>
        <div className="section-line" />
      </div>
      <div className="projects-list">
        {HIGHLIGHTS.map((h) => (
          <div key={h.num} className="project-row">
            <div className="project-num">{h.num}</div>
            <div className="project-info">
              <div className="project-name">{h.title}</div>
              <div className="project-desc">{h.description}</div>
            </div>
            {h.stat && <div className="highlight-stat">{h.stat}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

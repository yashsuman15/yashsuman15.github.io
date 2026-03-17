import { HIGHLIGHTS } from '@/data/projects';

export function Highlights() {
  return (
    <section id="highlights" className="section">
      <div className="section-header">
        <h2>Highlights</h2>
        <p className="section-sub">Key achievements and milestones.</p>
      </div>

      <div className="highlights-grid">
        {HIGHLIGHTS.map((highlight) => (
          <div key={highlight.num} className="highlight-card">
            <span className="highlight-num">{highlight.num}</span>
            <h3 className="highlight-title">{highlight.title}</h3>
            <p className="highlight-desc">{highlight.description}</p>
            {highlight.stat && (
              <span className="highlight-stat">{highlight.stat}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

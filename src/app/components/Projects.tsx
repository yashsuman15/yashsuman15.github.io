import { COMPLETED_GIGS } from '@/data/projects';

export function Projects() {
  return (
    <section id="projects">
      <div className="section-header">
        <span className="section-num">03</span>
        <h2 className="section-title">COMPLETED GIGS</h2>
        <div className="section-line" />
      </div>
      <div className="projects-list">
        {COMPLETED_GIGS.map((gig) => (
          <div key={gig.num} className="project-row">
            <div className="project-num">{gig.num}</div>
            <div className="project-info">
              <div className="project-name">{gig.name}</div>
              <div className="project-desc">{gig.description}</div>
            </div>
            <div className="project-tech">
              {gig.tech.map((t) => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>
            <div className="project-arrow">{'\u2192'}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

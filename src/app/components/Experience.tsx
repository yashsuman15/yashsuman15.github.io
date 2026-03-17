import { useState } from 'react';
import { EXPERIENCE } from '@/data/experience';

export function Experience() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section id="experience" className="section">
      <div className="section-header">
        <h2>Experience</h2>
      </div>

      {EXPERIENCE.map((item, idx) => (
        <div key={idx} className="exp-card">
          <div className="exp-top">
            <div>
              <h3>{item.role}</h3>
              <span className="exp-company">
                {item.company}, {item.location}
              </span>
            </div>
            <span className="exp-date">{item.dateRange}</span>
          </div>

          <p className="exp-summary">{item.summary}</p>

          <ul className={`exp-bullets ${showDetails ? 'show' : ''}`}>
            {item.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>

          <button
            className="exp-toggle"
            onClick={() => setShowDetails((v) => !v)}
          >
            {showDetails ? 'Hide details' : 'Show details'}
          </button>
        </div>
      ))}
    </section>
  );
}

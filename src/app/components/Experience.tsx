import { EXPERIENCE } from '@/data/experience';

export function Experience() {
  return (
    <section id="experience">
      <div className="section-header">
        <span className="section-num">04</span>
        <h2 className="section-title">WORK HISTORY</h2>
        <div className="section-line" />
      </div>
      <div className="exp-timeline">
        {EXPERIENCE.map((item, idx) => (
          <div key={idx} className="exp-item">
            <div
              className="exp-dot"
              style={{
                background: item.dotColor,
                boxShadow: item.dotShadow,
              }}
            />
            <div className="exp-date">{item.date}</div>
            <div className="exp-role">{item.role}</div>
            <div className="exp-company">{item.company}</div>
            <p className="exp-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

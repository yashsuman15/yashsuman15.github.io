import { SKILLS } from '@/data/skills';

export function Skills() {
  const tagColorClass = (color: string) => {
    if (color === 'yellow') return 'yellow';
    if (color === 'pink') return 'pink';
    return '';
  };

  return (
    <section id="skills">
      <div className="section-header">
        <span className="section-num">03</span>
        <h2 className="section-title">SKILL DECK</h2>
        <div className="section-line" />
      </div>
      <div className="skills-grid">
        {SKILLS.map((skill) => (
          <div key={skill.name} className="skill-card">
            <div className="skill-card-glow" />
            <span className="skill-icon">{skill.icon}</span>
            <div className="skill-name">{skill.name}</div>
            <p className="skill-desc">{skill.description}</p>
            <div className="skill-tags">
              {skill.tags.map((tag) => (
                <span
                  key={tag.label}
                  className={`skill-tag ${tagColorClass(tag.color)}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

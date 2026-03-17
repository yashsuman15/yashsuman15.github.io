import { ENGINEER_ROLE, HERO_HEADLINE, HERO_SUBTITLE, HERO_STATS } from '@/data/about';

interface HeroProps {
  onOpenChat?: () => void;
}

export function Hero({ onOpenChat }: HeroProps) {
  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <p className="hero-eyebrow">{ENGINEER_ROLE}</p>
        <h1>
          I build <br className="mobile-br" />
          <span className="hero-gradient">LLM-powered systems</span> <br />
          &amp; autonomous AI agents.
        </h1>
        <p className="hero-sub">{HERO_SUBTITLE}</p>

        <div className="hero-btns">
          <a href="#projects" className="btn-primary">
            See my work
          </a>
          <button className="btn-secondary" onClick={onOpenChat}>
            Chat with my AI Assistant
          </button>
        </div>

        <div className="hero-stats">
          {HERO_STATS.map((stat, index) => (
            <div className="stat" key={index}>
              <span className="stat-num">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ENGINEER_ROLE, HERO_HEADLINE, HERO_SUBTITLE, HERO_STATS } from '@/data/about';
import { trackClick } from '@/lib/analytics';

interface HeroProps {
  onOpenChat?: () => void;
}

export function Hero({ onOpenChat }: HeroProps) {
  const handleSeeMyWork = () => {
    trackClick('see_my_work');
  };

  const handleChatClick = () => {
    trackClick('chat_button_hero');
    onOpenChat?.();
  };

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
          <a href="#projects" className="btn-primary" onClick={handleSeeMyWork}>
            See my work
          </a>
          <button className="btn-secondary" onClick={handleChatClick}>
            AI Assistant Chatbot
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

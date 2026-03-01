import { AUGMENTATIONS, BIO_PARAGRAPHS } from '@/data/about';

export function About() {
  return (
    <section id="about">
      <div className="section-header">
        <span className="section-num">01</span>
        <h2 className="section-title">PROFILE</h2>
        <div className="section-line" />
      </div>
      <div className="about-grid">
        <div className="about-text">
          {BIO_PARAGRAPHS.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
        <div className="about-photo">
          <div className="photo-frame">
            <div className="photo-inner">
              <img
                src="/profile.png"
                alt="Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div className="photo-scan" />
              <div className="photo-corner tl" />
              <div className="photo-corner tr" />
              <div className="photo-corner bl" />
              <div className="photo-corner br" />
            </div>
          </div>
          <div className="cyber-badge">VERIFIED</div>
          <div className="photo-label">
            // IDENTITY_CONFIRMED :: PORTFOLIO_OWNER :: YASH SUMAN
          </div>
          <div className="about-implants">
            <div className="implant-title">// NEURAL AUGMENTATIONS</div>
            <div className="implants-list">
              {AUGMENTATIONS.map((aug) => (
                <div key={aug.name} className="implant-item">
                  <span className="implant-icon">{'\u25C8'}</span>
                  <span className="implant-name">{aug.name}</span>
                  <div className="implant-bar">
                    <div
                      className="implant-bar-fill"
                      style={{ width: aug.width, animationDelay: aug.delay }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

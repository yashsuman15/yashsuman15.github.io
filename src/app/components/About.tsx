const AUGMENTATIONS = [
  { name: 'Python / PyTorch', width: '97%', delay: '0s' },
  { name: 'Computer Vision', width: '91%', delay: '.2s' },
  { name: 'GEN AI', width: '94%', delay: '.4s' },
  { name: 'AI AGENTS', width: '88%', delay: '.6s' },
];

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
          <p>
            Born from the digital sprawl of Night City, I've spent{' '}
            <strong>7 years</strong> engineering artificial minds that push the
            limits of what machines can think, learn, and create. My neural
            implants keep me permanently jacked into the bleeding edge.
          </p>
          <p>
            I specialize in <strong>large language models</strong>, autonomous AI
            agents, and computer vision systems — architectures that don't just
            process data, they understand context, adapt to chaos, and deliver
            results when the corps are watching.
          </p>
          <p>
            Current fixers: Militech AI Division, Arasaka DataSec, and a few
            netrunner collectives you've never heard of. I keep my cred clean and
            my code cleaner.
          </p>
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

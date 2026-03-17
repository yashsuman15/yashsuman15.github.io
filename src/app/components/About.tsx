import { BIO_PARAGRAPHS } from '@/data/about';

export function About() {
  return (
    <section id="about" className="section section-alt">
      <div className="section-header">
        <h2>About</h2>
        <p className="section-sub">The person behind the projects.</p>
      </div>

      <div className="about-grid">
        {/* Bio Text */}
        <div className="about-text">
          {BIO_PARAGRAPHS.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Profile Image */}
        <div className="about-profile">
          <div className="profile-image-wrap">
            <img
              src="/profile.webp"
              alt="Yash Suman"
              className="profile-image"
              loading="lazy"
            />
          </div>
          <div className="profile-info">
            <span className="profile-name">Yash Suman</span>
            <span className="profile-role">AI Engineer</span>
          </div>
        </div>
      </div>
    </section>
  );
}

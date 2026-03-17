import { useRef, useEffect } from 'react';
import { AGENT_PROJECTS, SHOWCASE_PROJECTS } from '@/data/projects';

// Platform colors
const PLATFORM_COLORS: Record<string, string> = {
  reddit: '#FF4500',
  youtube: '#FF0000',
  linkedin: '#0A66C2',
  twitter: '#1DA1F2',
};

// Format number with K suffix
function formatViews(num: number): string {
  if (num >= 1000) {
    return Math.floor(num / 1000) + 'K';
  }
  return num.toString();
}

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-header">
        <h2>Projects</h2>
        <p className="section-sub">
          AI agents, RAG systems, and computer vision pipelines — built from scratch.
        </p>
      </div>

      {/* AI Agents & LLM Systems */}
      <div className="project-category">
        <h3 className="cat-title">AI Agents & LLM Systems</h3>
        <div className="grid grid-3">
          {AGENT_PROJECTS.map((project) => (
            <a
              key={project.title}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-tile"
            >
              <span className="tile-tag">{project.tag}</span>
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <span className="tile-tech">{project.tech}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Computer Vision Systems */}
      <div className="project-category">
        <h3 className="cat-title">Computer Vision Systems</h3>
        <p className="cat-sub">
          Production perception pipelines with{' '}
          {formatViews(
            SHOWCASE_PROJECTS.reduce(
              (acc, p) =>
                acc + (p.social?.metrics.find((m) => m.label === 'views')?.value || 0),
              0
            )
          )}
          + combined demo views.
        </p>
        <div className="cv-showcase">
          {SHOWCASE_PROJECTS.map((project) => (
            <CVShowcaseItem key={project.title} project={project} />
          ))}
        </div>
      </div>

      <div className="section-cta">
        <a
          href="https://github.com/yashsuman15?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-link"
        >
          View all repositories &rarr;
        </a>
      </div>
    </section>
  );
}

// CV Showcase Item with video player
function CVShowcaseItem({ project }: { project: (typeof SHOWCASE_PROJECTS)[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay video when in viewport, pause when out
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay blocked, ignore
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const viewCount = project.social?.metrics.find((m) => m.label === 'views')?.value || 0;
  const platform = project.social?.platform || 'reddit';
  const platformColor = PLATFORM_COLORS[platform] || '#FF4500';
  const socialUrl = project.social?.url;

  return (
    <div className="cv-showcase-item">
      <div className="cv-showcase-video-wrap">
        <video
          ref={videoRef}
          className="cv-showcase-video"
          src={project.videoSrc}
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>
      <div className="cv-showcase-info">
        <h4>{project.title}</h4>
        <p>{project.subtitle}</p>
        <div className="cv-showcase-meta">
          <span className="cv-showcase-tech">
            {project.tags
              .slice(0, 3)
              .map((t) => t.label)
              .join(' · ')}
          </span>
          {viewCount > 0 && socialUrl && (
            <a
              href={socialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cv-showcase-social-btn"
              style={{ '--platform-color': platformColor } as React.CSSProperties}
            >
              <span className="social-icon">
                {platform === 'reddit' && '▲'}
                {platform === 'youtube' && '▶'}
              </span>
              {formatViews(viewCount)} views
            </a>
          )}
        </div>
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="cv-showcase-link"
        >
          View on GitHub &rarr;
        </a>
      </div>
    </div>
  );
}

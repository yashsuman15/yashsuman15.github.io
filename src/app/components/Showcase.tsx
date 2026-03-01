import { useEffect, useRef } from 'react';
import { SHOWCASE_PROJECTS } from '@/data/projects';

export function Showcase() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.12 }
    );

    const items = listRef.current?.querySelectorAll('.showcase-item');
    items?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Video autoplay observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const pane = entry.target as HTMLElement;
          const video = pane.querySelector('video[data-src]') as HTMLVideoElement | null;
          if (!video) return;

          if (entry.isIntersecting) {
            // Lazy-load: set real src on first intersection
            if (!video.src || video.src === window.location.href) {
              video.src = video.dataset.src!;
              video.load();
            }
            video.play().then(() => {
              pane.classList.add('is-playing');
            }).catch(() => {
              // Autoplay blocked or load failed — don't show badge
              pane.classList.remove('is-playing');
            });
          } else {
            video.pause();
            pane.classList.remove('is-playing');
          }
        });
      },
      { threshold: 0.3 }
    );

    const panes = document.querySelectorAll('.showcase-video-pane');
    panes.forEach((pane) => observer.observe(pane));

    return () => observer.disconnect();
  }, []);

  const handleVideoPaneClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const pane = e.currentTarget;
    const video = pane.querySelector('video[data-src]') as HTMLVideoElement | null;
    if (!video) return;

    // Ensure src is loaded
    if (!video.src || video.src === window.location.href) {
      video.src = video.dataset.src!;
      video.load();
    }

    if (video.paused) {
      video.play().then(() => {
        pane.classList.add('is-playing');
      }).catch(() => {});
    } else {
      video.pause();
      pane.classList.remove('is-playing');
    }
  };

  const tagColorClass = (color: string) => {
    if (color === 'cyan') return 'c';
    if (color === 'yellow') return 'y';
    return '';
  };

  return (
    <section id="showcase">
      <div className="section-header">
        <span className="section-num">02</span>
        <h2 className="section-title">FLAGSHIP PROJECTS</h2>
        <div className="section-line" />
      </div>

      <div className="showcase-list" ref={listRef}>
        {SHOWCASE_PROJECTS.map((project, idx) => (
          <div className="showcase-item" key={idx}>
            {/* Video pane */}
            <div
              className="showcase-video-pane"
              onClick={project.videoSrc ? handleVideoPaneClick : undefined}
            >
              {project.videoSrc ? (
                <video
                  className="showcase-video"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  data-src={project.videoSrc}
                />
              ) : (
                <div className="video-placeholder">
                  <div className="video-placeholder-grid" />
                  <div className="video-placeholder-lines">
                    <div className="vpl-line" />
                    <div className="vpl-line" />
                    <div className="vpl-line" />
                  </div>
                  <div className="video-placeholder-icon">{'\u2B21'}</div>
                  <div className="video-placeholder-label">// DEMO FEED OFFLINE</div>
                </div>
              )}
              {project.videoSrc && (
                <>
                  <div className="video-playing-badge">
                    <div className="live-dot" />
                    LIVE DEMO
                  </div>
                  <div className="video-pause-hint">
                    <span>{'\u23F8'} PAUSE</span>
                  </div>
                </>
              )}
            </div>

            {/* Info pane */}
            <div className="showcase-info-pane">
              <div className="showcase-bg-num">{String(idx + 1).padStart(2, '0')}</div>
              <div className="showcase-main">
                <span className="showcase-index">{project.index}</span>
                <h3 className="showcase-title">{project.title}</h3>
                <div className="showcase-subtitle">{project.subtitle}</div>
                <p className="showcase-desc">{project.description}</p>
                <div className="showcase-insight">
                  <div className="showcase-insight-label">// KEY INSIGHT</div>
                  <p>
                    <strong>{project.insightHighlight}</strong> {project.insight}
                  </p>
                </div>
                <div className="showcase-tags">
                  {project.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`showcase-tag ${tagColorClass(tag.color)}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="showcase-cta">
                <a href={project.caseLink} className="showcase-link">
                  CASE FILE {'\u2192'}
                </a>
                <a href={project.githubLink} className="showcase-link secondary">
                  // GITHUB
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

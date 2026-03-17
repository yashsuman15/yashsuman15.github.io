import { VIDEOS, ARTICLES, WRITING_STATS } from '@/data/writing';
import { trackClick } from '@/lib/analytics';

export function Writing() {
  return (
    <section id="writing" className="section section-alt">
      <div className="section-header">
        <h2>Content & Thought Leadership</h2>
        <p className="section-sub">
          Technical articles and AI video content for Labellerr AI.
        </p>
      </div>

      {/* Stats */}
      <div className="writing-stats">
        <div className="stat">
          <span className="stat-num">{WRITING_STATS.articles}</span>
          <span className="stat-label">Articles</span>
        </div>
        <div className="stat">
          <span className="stat-num">{WRITING_STATS.videos}</span>
          <span className="stat-label">Videos</span>
        </div>
        <div className="stat">
          <span className="stat-num">{WRITING_STATS.domains}</span>
          <span className="stat-label">Topic domains</span>
        </div>
      </div>

      {/* Videos */}
      <h3 className="cat-title">
        Video Content <span className="cat-badge">Labellerr AI</span>
      </h3>
      <div className="grid grid-video">
        {VIDEOS.map((video) => (
          <a
            key={video.videoId}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="video-tile"
            onClick={() => trackClick('video_tile', { title: video.title, videoId: video.videoId })}
          >
            <div className="video-thumb">
              <img
                src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
                alt=""
                loading="lazy"
              />
              <div className="play-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21" />
                </svg>
              </div>
            </div>
            <h4>{video.title}</h4>
          </a>
        ))}
      </div>

      {/* Articles */}
      <h3 className="cat-title" style={{ marginTop: '64px' }}>
        Technical Articles
      </h3>
      <div className="article-list">
        {ARTICLES.map((article) => (
          <a
            key={article.url}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="article-row"
            onClick={() => trackClick('article_row', { title: article.title, category: article.category })}
          >
            <span className="article-date">{article.date}</span>
            <span className="article-title">{article.title}</span>
            <span className="article-cat">{article.category}</span>
          </a>
        ))}
      </div>

      <div className="section-cta">
        <a
          href="https://www.labellerr.com/blog/author/yash/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-link"
          onClick={() => trackClick('view_all_articles')}
        >
          View all articles &rarr;
        </a>
      </div>
    </section>
  );
}

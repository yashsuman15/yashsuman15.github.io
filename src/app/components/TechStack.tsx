import { useState } from 'react';
import { GlitchText } from './GlitchText';

type Category = 'ALL' | 'AI_ML' | 'LANGUAGES' | 'FRAMEWORKS' | 'INFRA';

interface Tech {
  name: string;
  icon: string;
  level: number;
  category: Exclude<Category, 'ALL'>;
  color: string;
}

const techs: Tech[] = [
  // AI / ML
  { name: 'PyTorch', icon: '🔥', level: 99, category: 'AI_ML', color: '#ee4c2c' },
  { name: 'TensorFlow', icon: '🧠', level: 93, category: 'AI_ML', color: '#ff6f00' },
  { name: 'HuggingFace', icon: '🤗', level: 97, category: 'AI_ML', color: '#ffd21e' },
  { name: 'LangChain', icon: '⛓️', level: 95, category: 'AI_ML', color: '#00a67e' },
  { name: 'OpenAI API', icon: '◆', level: 98, category: 'AI_ML', color: '#412991' },
  { name: 'scikit-learn', icon: '📊', level: 94, category: 'AI_ML', color: '#f7931e' },
  { name: 'JAX', icon: '⚡', level: 85, category: 'AI_ML', color: '#00a8e8' },
  { name: 'ONNX', icon: '🔷', level: 87, category: 'AI_ML', color: '#005cad' },
  { name: 'Triton', icon: '△', level: 82, category: 'AI_ML', color: '#76b900' },
  { name: 'vLLM', icon: '🚀', level: 90, category: 'AI_ML', color: '#e535ab' },

  // Languages
  { name: 'Python', icon: '🐍', level: 99, category: 'LANGUAGES', color: '#3776ab' },
  { name: 'TypeScript', icon: '⬡', level: 90, category: 'LANGUAGES', color: '#3178c6' },
  { name: 'C++', icon: '⚙️', level: 84, category: 'LANGUAGES', color: '#00599c' },
  { name: 'Rust', icon: '⚓', level: 75, category: 'LANGUAGES', color: '#dea584' },
  { name: 'Go', icon: '🐹', level: 78, category: 'LANGUAGES', color: '#00add8' },
  { name: 'CUDA', icon: '🎮', level: 88, category: 'LANGUAGES', color: '#76b900' },
  { name: 'SQL', icon: '🗃️', level: 92, category: 'LANGUAGES', color: '#e38d44' },

  // Frameworks
  { name: 'FastAPI', icon: '⚡', level: 96, category: 'FRAMEWORKS', color: '#009688' },
  { name: 'React', icon: '⚛️', level: 88, category: 'FRAMEWORKS', color: '#61dafb' },
  { name: 'Next.js', icon: '▲', level: 85, category: 'FRAMEWORKS', color: '#ffffff' },
  { name: 'LangGraph', icon: '◉', level: 91, category: 'FRAMEWORKS', color: '#7c3aed' },
  { name: 'Ray', icon: '☀️', level: 86, category: 'FRAMEWORKS', color: '#028cf0' },
  { name: 'Celery', icon: '🥬', level: 83, category: 'FRAMEWORKS', color: '#37b24d' },
  { name: 'gRPC', icon: '◈', level: 82, category: 'FRAMEWORKS', color: '#244c5a' },

  // Infrastructure
  { name: 'Kubernetes', icon: '☸️', level: 88, category: 'INFRA', color: '#326ce5' },
  { name: 'Docker', icon: '🐳', level: 95, category: 'INFRA', color: '#2496ed' },
  { name: 'AWS', icon: '☁️', level: 91, category: 'INFRA', color: '#ff9900' },
  { name: 'GCP', icon: '🌐', level: 87, category: 'INFRA', color: '#4285f4' },
  { name: 'MLflow', icon: '📈', level: 93, category: 'INFRA', color: '#0194e2' },
  { name: 'W&B', icon: '📉', level: 92, category: 'INFRA', color: '#ffbe00' },
  { name: 'Pinecone', icon: '🌲', level: 88, category: 'INFRA', color: '#04b69a' },
  { name: 'Redis', icon: '♦', level: 86, category: 'INFRA', color: '#dc382d' },
];

const categories: { key: Category; label: string; color: string }[] = [
  { key: 'ALL', label: 'ALL SYSTEMS', color: 'var(--cyber-cyan)' },
  { key: 'AI_ML', label: 'AI / ML', color: 'var(--cyber-magenta)' },
  { key: 'LANGUAGES', label: 'LANGUAGES', color: 'var(--cyber-cyan)' },
  { key: 'FRAMEWORKS', label: 'FRAMEWORKS', color: 'var(--cyber-yellow)' },
  { key: 'INFRA', label: 'INFRASTRUCTURE', color: 'var(--cyber-green)' },
];

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const filtered = activeCategory === 'ALL' ? techs : techs.filter((t) => t.category === activeCategory);

  const getCategoryColor = (cat: Tech['category']) => {
    return { AI_ML: 'var(--cyber-magenta)', LANGUAGES: 'var(--cyber-cyan)', FRAMEWORKS: 'var(--cyber-yellow)', INFRA: 'var(--cyber-green)' }[cat];
  };

  return (
    <section
      id="tech"
      className="relative py-28 cyber-grid-bg"
      style={{ background: 'linear-gradient(180deg, var(--cyber-bg2) 0%, var(--cyber-bg) 100%)' }}
    >
      {/* bg decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(ellipse 50% 50% at 20% 60%, rgba(0,245,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <p
            className="mb-2"
            style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--cyber-green)', fontSize: '0.75rem', letterSpacing: '0.2em' }}
          >
            03 // TECH_ARSENAL
          </p>
          <GlitchText
            text="TECH STACK"
            as="h2"
            intensity="low"
            className="font-orbitron neon-green"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '0.1em',
              display: 'block',
            }}
          />
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--cyber-green), transparent)', boxShadow: '0 0 8px var(--cyber-green)', width: 128, marginTop: 16 }} />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className="px-4 py-2 text-xs transition-all duration-300 clip-cyber-sm"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                letterSpacing: '0.12em',
                background: activeCategory === cat.key ? cat.color : 'transparent',
                color: activeCategory === cat.key ? 'var(--cyber-bg)' : cat.color,
                border: `1px solid ${cat.color}`,
                boxShadow: activeCategory === cat.key ? `0 0 15px ${cat.color}60` : 'none',
                cursor: 'pointer',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tech grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((tech) => (
            <TechCard
              key={tech.name}
              tech={tech}
              isHovered={hoveredTech === tech.name}
              onHover={setHoveredTech}
              categoryColor={getCategoryColor(tech.category)}
            />
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'TECHNOLOGIES', value: `${techs.length}+` },
            { label: 'YEARS CODING', value: '12+' },
            { label: 'OPEN SOURCE REPOS', value: '85+' },
            { label: 'CERTIFICATIONS', value: '22' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 cyber-card clip-cyber-sm"
            >
              <div
                className="font-orbitron neon-cyan mb-1"
                style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '2rem', lineHeight: 1 }}
              >
                {stat.value}
              </div>
              <div
                style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.6rem', color: 'var(--cyber-muted)', letterSpacing: '0.15em' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechCard({
  tech,
  isHovered,
  onHover,
  categoryColor,
}: {
  tech: Tech;
  isHovered: boolean;
  onHover: (name: string | null) => void;
  categoryColor: string;
}) {
  return (
    <div
      className="cyber-card clip-cyber-sm p-4 flex flex-col items-center gap-3 cursor-default group"
      onMouseEnter={() => onHover(tech.name)}
      onMouseLeave={() => onHover(null)}
      style={{
        borderColor: isHovered ? `${tech.color}80` : 'rgba(0,245,255,0.15)',
        boxShadow: isHovered ? `0 0 20px ${tech.color}30` : 'none',
        transition: 'all 0.3s',
        transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'none',
      }}
    >
      {/* Icon */}
      <span style={{ fontSize: '1.8rem', filter: isHovered ? 'drop-shadow(0 0 8px currentColor)' : 'none', transition: 'filter 0.3s' }}>
        {tech.icon}
      </span>

      {/* Name */}
      <span
        style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.08em',
          color: isHovered ? tech.color : 'var(--cyber-text)',
          textAlign: 'center',
          transition: 'color 0.3s',
        }}
      >
        {tech.name}
      </span>

      {/* Level bar */}
      <div className="w-full" style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
        <div
          style={{
            height: '100%',
            width: `${tech.level}%`,
            background: `linear-gradient(90deg, ${categoryColor}, ${tech.color})`,
            boxShadow: isHovered ? `0 0 6px ${tech.color}` : 'none',
            borderRadius: 2,
            transition: 'box-shadow 0.3s',
          }}
        />
      </div>

      {/* Level text */}
      <span
        style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: '0.6rem',
          color: isHovered ? tech.color : 'var(--cyber-muted)',
          transition: 'color 0.3s',
        }}
      >
        {tech.level}%
      </span>
    </div>
  );
}
import { GlitchText } from './GlitchText';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Brain, Code2, Cpu, Database, Globe, Award } from 'lucide-react';

const skills = [
  { label: 'Deep Learning', value: 97 },
  { label: 'NLP / LLMs', value: 95 },
  { label: 'Computer Vision', value: 90 },
  { label: 'MLOps / Infrastructure', value: 85 },
  { label: 'Reinforcement Learning', value: 78 },
  { label: 'Data Engineering', value: 88 },
];

const achievements = [
  { icon: Brain, text: 'Published 14 AI research papers' },
  { icon: Award, text: 'NeurIPS Best Paper 2023' },
  { icon: Cpu, text: 'Trained models on 10,000+ GPU cluster' },
  { icon: Globe, text: 'Open-source tools: 28k+ GitHub stars' },
  { icon: Database, text: 'Managed 5PB+ of training data' },
  { icon: Code2, text: 'Contributed to PyTorch core' },
];

export function About() {
  return (
    <section
      id="about"
      className="relative py-28 cyber-grid-bg"
      style={{ background: 'linear-gradient(180deg, var(--cyber-bg) 0%, var(--cyber-bg2) 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <p
            className="mb-2"
            style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--cyber-cyan)', fontSize: '0.75rem', letterSpacing: '0.2em' }}
          >
            01 // IDENTITY_SCAN
          </p>
          <GlitchText
            text="ABOUT ME"
            as="h2"
            intensity="low"
            className="font-orbitron neon-cyan"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '0.1em',
              display: 'block',
            }}
          />
          <div className="neon-line-cyan mt-4 w-32" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: profile image + achievements */}
          <div className="flex flex-col items-center lg:items-start gap-8">
            {/* Profile image */}
            <div className="relative group">
              <div
                className="relative overflow-hidden"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))',
                  border: '1px solid rgba(0,245,255,0.4)',
                  boxShadow: '0 0 30px rgba(0,245,255,0.2), 0 0 60px rgba(0,245,255,0.05)',
                  width: 280,
                  height: 320,
                }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1630713815149-9a70d6287917?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBwb3J0cmFpdCUyMG5lb24lMjBsaWdodHMlMjBkYXJrfGVufDF8fHx8MTc3MjA5NTMyNnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Kai Nakamura - AI Engineer"
                  className="w-full h-full object-cover"
                  style={{ filter: 'saturate(1.2) hue-rotate(10deg)' }}
                />
                {/* Overlay effects */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(5,5,16,0.8) 100%)',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
              {/* Corner accents */}
              <div
                className="absolute top-0 left-0 w-6 h-6"
                style={{ border: '2px solid var(--cyber-magenta)', borderRight: 'none', borderBottom: 'none' }}
              />
              <div
                className="absolute bottom-0 right-0 w-6 h-6"
                style={{ border: '2px solid var(--cyber-cyan)', borderLeft: 'none', borderTop: 'none' }}
              />
              {/* Status */}
              <div
                className="absolute bottom-4 left-4 flex items-center gap-2"
                style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--cyber-green)' }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 pulse-ring" />
                AVAILABLE_FOR_HIRE
              </div>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-1 gap-3 w-full max-w-sm">
              {achievements.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2 px-3 cyber-card clip-cyber-sm group"
                >
                  <item.icon
                    size={14}
                    style={{ color: i % 2 === 0 ? 'var(--cyber-cyan)' : 'var(--cyber-magenta)', flexShrink: 0 }}
                  />
                  <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.85rem', color: 'var(--cyber-text)' }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: bio + skill bars */}
          <div>
            {/* Bio */}
            <div
              className="cyber-card clip-cyber p-6 mb-8"
              style={{ fontFamily: 'Rajdhani, sans-serif', lineHeight: 1.9, color: 'var(--cyber-text)', fontSize: '1rem' }}
            >
              <p className="mb-4">
                I'm a senior AI engineer with{' '}
                <span style={{ color: 'var(--cyber-cyan)' }}>12+ years</span> of experience designing
                and deploying production-grade machine learning systems. I specialize in large language
                models, computer vision, and autonomous multi-agent architectures.
              </p>
              <p className="mb-4">
                Previously led AI research at{' '}
                <span style={{ color: 'var(--cyber-magenta)' }}>NeuroCorp</span> and{' '}
                <span style={{ color: 'var(--cyber-magenta)' }}>Axiom Labs</span>. I've shipped
                AI products used by <span style={{ color: 'var(--cyber-cyan)' }}>40M+ users</span> globally.
              </p>
              <p>
                When I'm not training models, I'm contributing to open-source AI tooling, writing
                about the future of{' '}
                <span style={{ color: 'var(--cyber-yellow)' }}>human-machine symbiosis</span>, and
                occasionally breaking production at 3am.
              </p>
            </div>

            {/* Skill bars */}
            <div className="space-y-4">
              <h3
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  color: 'var(--cyber-cyan)',
                  marginBottom: '1rem',
                }}
              >
                CAPABILITY_MATRIX
              </h3>
              {skills.map((skill, i) => (
                <SkillBar key={skill.label} skill={skill} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill, index }: { skill: { label: string; value: number }; index: number }) {
  const color = index % 2 === 0 ? 'var(--cyber-cyan)' : 'var(--cyber-magenta)';
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.75rem', color: 'var(--cyber-text)' }}>
          {skill.label}
        </span>
        <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.75rem', color }}>
          {skill.value}%
        </span>
      </div>
      <div className="cyber-progress-bar">
        <div
          className="cyber-progress-fill"
          style={{
            width: `${skill.value}%`,
            background: `linear-gradient(90deg, ${color}, ${index % 2 === 0 ? 'var(--cyber-magenta)' : 'var(--cyber-cyan)'})`,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      </div>
    </div>
  );
}
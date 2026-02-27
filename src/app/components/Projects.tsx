import { useState } from 'react';
import { Play, X, Github, ExternalLink, ChevronRight } from 'lucide-react';
import { GlitchText } from './GlitchText';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  videoId: string;
  tags: string[];
  status: 'DEPLOYED' | 'BETA' | 'RESEARCH';
  year: string;
  metrics: { label: string; value: string }[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'NEURAL VISION X',
    subtitle: 'Real-time Object Detection System',
    description: 'Advanced computer vision pipeline using YOLOv9 and custom transformer architecture.',
    longDescription:
      'A real-time multi-class object detection and segmentation system achieving 99.2% accuracy on COCO dataset at 120 FPS. Built with a custom transformer backbone, TensorRT optimization, and distributed inference across edge devices.',
    thumbnail: 'https://images.unsplash.com/photo-1554936970-ce06538caf54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHZpc2lvbiUyMG9iamVjdCUyMGRldGVjdGlvbiUyMEFJfGVufDF8fHx8MTc3MjE2ODM4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    videoId: 'rOjHhS5MtvA',
    tags: ['PyTorch', 'TensorRT', 'CUDA', 'OpenCV', 'ONNX'],
    status: 'DEPLOYED',
    year: '2024',
    metrics: [{ label: 'Accuracy', value: '99.2%' }, { label: 'Latency', value: '8ms' }, { label: 'FPS', value: '120' }],
    github: '#',
    demo: '#',
  },
  {
    id: 2,
    title: 'COGNITION LLM',
    subtitle: 'Custom 70B Parameter Language Model',
    description: 'Fine-tuned LLM with RLHF, constitutional AI alignment, and mixture-of-experts architecture.',
    longDescription:
      'A 70B parameter large language model fine-tuned for code generation, reasoning, and multi-turn dialogue. Uses mixture-of-experts routing, flash attention v2, and custom RLHF pipeline achieving GPT-4 level performance at 30% inference cost.',
    thumbnail: 'https://images.unsplash.com/photo-1624526807889-fb20fd26970b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5ndWFnZSUyMG1vZGVsJTIwY2hhdGJvdCUyMGludGVyZmFjZSUyMGRhcmt8ZW58MXx8fHwxNzcyMTY4MzgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    videoId: 'aircAruvnKk',
    tags: ['Transformers', 'RLHF', 'vLLM', 'LangChain', 'DeepSpeed'],
    status: 'DEPLOYED',
    year: '2024',
    metrics: [{ label: 'Params', value: '70B' }, { label: 'MMLU', value: '87.3%' }, { label: 'Context', value: '128k' }],
    github: '#',
    demo: '#',
  },
  {
    id: 3,
    title: 'PHANTOM AGENT',
    subtitle: 'Autonomous Multi-Agent Framework',
    description: 'Self-directed AI agents that plan, reason, and execute complex multi-step tasks.',
    longDescription:
      'A production autonomous agent framework with tool use, memory management, multi-agent coordination, and self-reflection loops. Successfully completes complex coding, research, and data analysis tasks with minimal human intervention.',
    thumbnail: 'https://images.unsplash.com/photo-1710584805097-4e116679213f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbm9tb3VzJTIwcm9ib3QlMjBhZ2VudCUyMEFJJTIwZnV0dXJpc3RpY3xlbnwxfHx8fDE3NzIxNjgzODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    videoId: 'WXuK6gekU1Y',
    tags: ['LangGraph', 'AutoGen', 'OpenAI', 'Pinecone', 'FastAPI'],
    status: 'BETA',
    year: '2024',
    metrics: [{ label: 'Task Rate', value: '91%' }, { label: 'Agents', value: '48' }, { label: 'Tools', value: '120+' }],
    github: '#',
    demo: '#',
  },
  {
    id: 4,
    title: 'DATAFORGE ML',
    subtitle: 'End-to-End MLOps Platform',
    description: 'Production-grade ML pipeline orchestration for training, evaluation, and deployment.',
    longDescription:
      'A comprehensive MLOps platform handling the full model lifecycle: automated feature engineering, distributed training, A/B testing, model versioning, and real-time serving with auto-scaling. Processes 2TB+ data daily.',
    thumbnail: 'https://images.unsplash.com/photo-1649451844931-57e22fc82de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwcGlwZWxpbmUlMjBtYWNoaW5lJTIwbGVhcm5pbmclMjBjb2RlfGVufDF8fHx8MTc3MjE2ODM4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    videoId: 'XfpMkf4rD6E',
    tags: ['Kubeflow', 'MLflow', 'Airflow', 'Kubernetes', 'Spark'],
    status: 'DEPLOYED',
    year: '2023',
    metrics: [{ label: 'Daily Data', value: '2TB' }, { label: 'Models', value: '200+' }, { label: 'Uptime', value: '99.98%' }],
    github: '#',
  },
  {
    id: 5,
    title: 'SYNTHWAVE AI',
    subtitle: 'Generative AI Music System',
    description: 'Transformer-based music generation with controllable style, tempo, and instrumentation.',
    longDescription:
      'A multi-modal AI music generation system using audio tokens and music transformers. Generates full tracks with controllable attributes including genre, mood, tempo, and instrumentation. Trained on 500k+ licensed tracks.',
    thumbnail: 'https://images.unsplash.com/photo-1624220570807-fc8205adec5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBzeW50aGVzaXplciUyMGRhcmslMjBwdXJwbGV8ZW58MXx8fHwxNzcyMTY4Mzg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    videoId: 'M4RR_8oxHW0',
    tags: ['AudioCraft', 'PyTorch', 'Transformers', 'Triton', 'React'],
    status: 'BETA',
    year: '2024',
    metrics: [{ label: 'Styles', value: '200+' }, { label: 'MOS Score', value: '4.7/5' }, { label: 'Latency', value: '3s' }],
    github: '#',
    demo: '#',
  },
  {
    id: 6,
    title: 'MINDSCAPE',
    subtitle: 'Brain-Computer Interface AI',
    description: 'Real-time EEG signal decoding using transformer models for neural interface applications.',
    longDescription:
      'A real-time neural signal processing pipeline for brain-computer interfaces. Uses custom temporal transformers to decode motor intention, emotion states, and cognitive load from EEG signals with sub-100ms latency.',
    thumbnail: 'https://images.unsplash.com/photo-1649937801620-d31db7fb3ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFpbiUyMG5ldXJhbCUyMGludGVyZmFjZSUyMGRpZ2l0YWwlMjBnbG93aW5nfGVufDF8fHx8MTc3MjE2ODM4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    videoId: 'eGkJgMbSsNE',
    tags: ['PyTorch', 'MNE-Python', 'TensorFlow', 'C++', 'WebSocket'],
    status: 'RESEARCH',
    year: '2024',
    metrics: [{ label: 'Accuracy', value: '94.8%' }, { label: 'Latency', value: '<100ms' }, { label: 'Channels', value: '256' }],
    github: '#',
  },
];

export function Projects() {
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const statusClass = (status: Project['status']) => {
    if (status === 'DEPLOYED') return 'badge-deployed';
    if (status === 'BETA') return 'badge-beta';
    return 'badge-research';
  };

  return (
    <section
      id="projects"
      className="relative py-28"
      style={{ background: 'var(--cyber-bg2)' }}
    >
      {/* bg decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(255,0,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <p
            className="mb-2"
            style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--cyber-magenta)', fontSize: '0.75rem', letterSpacing: '0.2em' }}
          >
            02 // PROJECT_FILES
          </p>
          <GlitchText
            text="MY PROJECTS"
            as="h2"
            intensity="low"
            className="font-orbitron"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '0.1em',
              color: 'var(--cyber-magenta)',
              textShadow: '0 0 20px rgba(255,0,255,0.5)',
              display: 'block',
            }}
          />
          <div className="neon-line-magenta mt-4 w-32" />
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isHovered={hoveredId === project.id}
              onHover={setHoveredId}
              onPlay={setModalProject}
              statusClass={statusClass}
            />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {modalProject && (
        <VideoModal project={modalProject} onClose={() => setModalProject(null)} />
      )}
    </section>
  );
}

function ProjectCard({
  project,
  isHovered,
  onHover,
  onPlay,
  statusClass,
}: {
  project: Project;
  isHovered: boolean;
  onHover: (id: number | null) => void;
  onPlay: (p: Project) => void;
  statusClass: (s: Project['status']) => string;
}) {
  return (
    <div
      className="cyber-card clip-cyber group cursor-pointer"
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Thumbnail / Video Preview */}
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <ImageWithFallback
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ filter: 'saturate(1.2) brightness(0.75)' }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: isHovered
              ? 'linear-gradient(to bottom, rgba(255,0,255,0.15) 0%, rgba(5,5,16,0.7) 100%)'
              : 'linear-gradient(to bottom, transparent 0%, rgba(5,5,16,0.8) 100%)',
            transition: 'background 0.4s',
          }}
        />
        {/* Scanlines on thumbnail */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
            pointerEvents: 'none',
          }}
        />

        {/* Play button */}
        <button
          onClick={() => onPlay(project)}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center play-btn-glow"
            style={{ background: 'rgba(0,245,255,0.15)', border: '2px solid var(--cyber-cyan)', backdropFilter: 'blur(4px)' }}
          >
            <Play size={22} style={{ color: 'var(--cyber-cyan)', marginLeft: 2 }} fill="currentColor" />
          </div>
        </button>

        {/* Status badge */}
        <div
          className={`absolute top-3 right-3 px-2 py-1 border text-xs ${statusClass(project.status)}`}
          style={{ fontFamily: 'Share Tech Mono, monospace', letterSpacing: '0.1em', background: 'rgba(5,5,16,0.8)' }}
        >
          ● {project.status}
        </div>

        {/* Year */}
        <div
          className="absolute top-3 left-3"
          style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--cyber-muted)' }}
        >
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="mb-1 font-orbitron neon-cyan"
          style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.9rem', letterSpacing: '0.1em' }}
        >
          {project.title}
        </h3>
        <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', color: 'var(--cyber-magenta)', marginBottom: '0.5rem' }}>
          {project.subtitle}
        </p>
        <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem', color: 'var(--cyber-text)', lineHeight: 1.6, marginBottom: '1rem' }}>
          {project.description}
        </p>

        {/* Metrics */}
        <div className="flex gap-4 mb-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div
                style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem', color: 'var(--cyber-cyan)' }}
              >
                {m.value}
              </div>
              <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.55rem', color: 'var(--cyber-muted)', letterSpacing: '0.1em' }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="tech-tag">{tag}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid rgba(0,245,255,0.1)' }}>
          {project.github && (
            <a href={project.github} className="flex items-center gap-1 text-xs" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--cyber-muted)', textDecoration: 'none' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--cyber-cyan)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--cyber-muted)')}
            >
              <Github size={12} /> GITHUB
            </a>
          )}
          {project.demo && (
            <a href={project.demo} className="flex items-center gap-1 text-xs" style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--cyber-muted)', textDecoration: 'none' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--cyber-magenta)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--cyber-muted)')}
            >
              <ExternalLink size={12} /> DEMO
            </a>
          )}
          <button
            onClick={() => onPlay(project)}
            className="ml-auto flex items-center gap-1 text-xs"
            style={{ fontFamily: 'Share Tech Mono, monospace', color: 'var(--cyber-cyan)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            WATCH DEMO <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

function VideoModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(5,5,16,0.95)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        style={{
          border: '1px solid rgba(0,245,255,0.4)',
          boxShadow: '0 0 40px rgba(0,245,255,0.2)',
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
          background: 'var(--cyber-bg2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid rgba(0,245,255,0.2)' }}
        >
          <div>
            <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.9rem', color: 'var(--cyber-cyan)', letterSpacing: '0.1em' }}>
              {project.title}
            </h3>
            <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', color: 'var(--cyber-muted)' }}>
              {project.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ color: 'var(--cyber-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--cyber-cyan)')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--cyber-muted)')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Video embed */}
        <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
          <iframe
            src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&mute=0&modestbranding=1&rel=0`}
            title={project.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Modal footer */}
        <div className="px-6 py-4">
          <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.95rem', color: 'var(--cyber-text)', lineHeight: 1.7 }}>
            {project.longDescription}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags.map((tag) => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
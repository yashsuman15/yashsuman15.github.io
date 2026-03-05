export interface ExperienceItem {
  date: string;
  role: string;
  company: string;
  description: string;
  dotColor: string;
  dotShadow: string;
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    date: 'MARCH 2025 \u2014 PRESENT',
    role: 'AI ENGINEER',
    company: '\u25c8 LABELLERR AI // CHANDIGARH',
    description:
      'Built and deployed multiple computer vision pipelines, researched and benchmarked various CV models, performed POCs across domains like manufacturing, surveillance, and smart cities, developed RAG-based AI agents, and contributed to the Labellerr Python SDK — now serving 500+ developers.',
    dotColor: '#00F5FF',
    dotShadow: '0 0 16px rgba(0,245,255,0.6)',
  },
];

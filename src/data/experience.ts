// ── Experience Data ──
// Work history with expandable bullet points

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  dateRange: string;
  summary: string;
  bullets: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'AI Engineer',
    company: 'Labellerr AI',
    location: 'Chandigarh',
    dateRange: 'Mar 2025 — Present',
    summary:
      'Building and deploying computer vision pipelines and RAG-based AI agents for industrial applications across manufacturing, surveillance, and smart city domains.',
    bullets: [
      'Built and deployed multiple CV pipelines for production use across diverse industry verticals',
      'Researched and benchmarked YOLO, RTDETR, and SAM models for domain-specific optimization',
      'Developed RAG-based AI agents for intelligent document processing and knowledge retrieval',
      'Contributed to the Labellerr Python SDK serving 500+ developers',
      'Created 25+ technical articles and 5+ video tutorials for the company blog and YouTube',
    ],
  },
];

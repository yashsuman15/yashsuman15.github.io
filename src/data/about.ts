// ── About / Profile Data ──
// Single source of truth for bio, augmentations, and hero stats.
// Used by About.tsx, Hero.tsx (optionally), and chatContext.ts (auto-generated prompt).

export interface Augmentation {
  name: string;
  /** CSS width value, e.g. '97%' */
  width: string;
  /** CSS animation-delay value */
  delay: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

// ── Identity ──

export const ENGINEER_NAME = 'Yash Raj Suman';
export const ENGINEER_ALIAS = 'Yash';
export const ENGINEER_ROLES = ['AI Engineer', 'Computer Vision Engineer', 'Gen-AI Engineer'];

// ── Bio paragraphs (rendered in About section) ──

export const BIO_PARAGRAPHS: string[] = [
  "I build AI systems that don't just process data — they perceive, reason, and take action. From real-time computer vision pipelines running on live camera feeds to autonomous agents that reason over documents, data, and tools, I work across the full stack: fine-tuning detection models for industrial deployments, architecting RAG systems for enterprise knowledge retrieval, and building agent workflows that handle complex multi-step tasks end to end.",
  "On the vision side, I fine-tune YOLO, RTDETR, and many other vision models on domain-specific datasets for things like manufacturing QC, surveillance, traffic analysis, and smart city infrastructure — everything built to run in real time with production-grade accuracy.", 
  "On the Agentic side, I design LLM-powered agents and retrieval pipelines that turn messy, unstructured data into something actually useful.",
  "My project demos alone have reached up 1,000,000+ views across Reddit and YouTube.",
];

// ── Short bio for chat context (combines the essence of the 3 paragraphs) ──

export const BIO_SUMMARY =
  'AI Engineer building real-time computer vision pipelines and LLM-powered agentic systems — fine-tuning detection and segmentation models for industrial deployments like manufacturing QC, surveillance, and traffic analysis, while designing autonomous agents and RAG pipelines that turn unstructured data into actionable intelligence. Currently at Labellerr AI, with 1,000,000+ views on project demos across Reddit and YouTube.';

// ── Neural augmentation bars (About section skill bars) ──

export const AUGMENTATIONS: Augmentation[] = [
  { name: 'Python', width: '97%', delay: '0s' },
  { name: 'Computer Vision', width: '91%', delay: '.2s' },
  { name: 'GEN AI', width: '94%', delay: '.4s' },
  { name: 'AI AGENTS', width: '88%', delay: '.6s' },
];

// ── Hero stats ──

export const HERO_STATS: HeroStat[] = [
  { value: '10+', label: 'PROJECTS DONE' },
  { value: '100+', label: 'MODELS FINETUNED & TRAINED' },
  { value: '1 Million +', label: 'PROJECT IMPRESSIONS' },
];

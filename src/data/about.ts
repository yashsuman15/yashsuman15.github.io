// ── About / Profile Data ──
// Single source of truth for bio, proficiency bars, and hero stats.

export interface Proficiency {
  name: string;
  percentage: number;
}

export interface HeroStat {
  value: string;
  label: string;
}

// ── Identity ──

export const ENGINEER_NAME = 'Yash Suman';
export const ENGINEER_ROLE = 'AI Engineer';
export const ENGINEER_ROLES = ['AI Engineer', 'Computer Vision Engineer', 'Gen-AI Engineer'];

// ── Hero content ──

export const HERO_HEADLINE = 'I build LLM-powered systems & autonomous AI agents.';
export const HERO_SUBTITLE =
  'Specializing in RAG pipelines, multi-agent orchestration, and production-grade AI systems that reason, retrieve, and act.';

// ── Hero stats ──

export const HERO_STATS: HeroStat[] = [
  { value: '10+', label: 'Projects shipped' },
  { value: '100+', label: 'Models trained' },
  { value: '1M+', label: 'Demo views' },
];

// ── Proficiency bars (Skills section) ──

export const PROFICIENCIES: Proficiency[] = [
  { name: 'Python', percentage: 97 },
  { name: 'Gen AI', percentage: 94 },
  { name: 'Computer Vision', percentage: 91 },
  { name: 'AI Agents', percentage: 88 },
];

// ── Skill columns (4-column layout in Skills section) ──

export interface SkillColumn {
  title: string;
  items: string[];
}

export const SKILL_COLUMNS: SkillColumn[] = [
  {
    title: 'Large Language Models',
    items: [
      'Hugging Face & Transformers',
      'GPT / LLaMA / Ollama',
      'Fine-tuning (PEFT, LoRA)',
      'Quantization & Optimization',
      'Prompt Engineering',
    ],
  },
  {
    title: 'Computer Vision',
    items: [
      'YOLO Series (v8, v12)',
      'RTDETR / RTDETRv2',
      'SAM Series',
      'Object Tracking',
      'ONNX / TensorRT / OpenCV',
    ],
  },
  {
    title: 'AI Agents & RAG',
    items: [
      'LangChain / LangGraph',
      'AutoGen / CrewAI / smolagents',
      'Tool Calling & MCP',
      'RAG Pipelines',
      'n8n Automation',
    ],
  },
  {
    title: 'MLOps & Data',
    items: [
      'Docker & MLflow',
      'FastAPI',
      'Spark / Kafka / dbt',
      'Git & CI/CD',
      'SQL & Vector Databases',
    ],
  },
];

// ── Bio paragraphs (About section) ──

export const BIO_PARAGRAPHS: string[] = [
  "I'm an AI Engineer specializing in building production-grade computer vision systems and LLM-powered autonomous agents. My work focuses on turning cutting-edge AI research into real-world solutions that run reliably at scale.",
  "Currently at Labellerr AI, I design and deploy vision pipelines for industrial applications — from manufacturing quality control and pharmaceutical automation to surveillance systems and smart city infrastructure. I also build RAG pipelines and multi-agent systems that transform unstructured data into actionable intelligence.",
  "My projects have reached over 1 million views across Reddit and YouTube, demonstrating real-time AI running on live data. I believe in shipping systems that work in production, not just demos that look good in notebooks.",
];

// ── Short bio for chat context ──

export const BIO_SUMMARY =
  'AI Engineer building real-time computer vision pipelines and LLM-powered agentic systems — fine-tuning detection and segmentation models for industrial deployments like manufacturing QC, surveillance, and traffic analysis, while designing autonomous agents and RAG pipelines that turn unstructured data into actionable intelligence. Currently at Labellerr AI, with 1M+ views on project demos across Reddit and YouTube.';

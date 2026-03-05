export interface Skill {
  icon: string;
  name: string;
  description: string;
  tags: { label: string; color: 'cyan' | 'yellow' | 'pink' }[];
}

export const SKILLS: Skill[] = [
  {
    icon: '\ud83e\udde0',
    name: 'LARGE LANGUAGE MODELS',
    description:
      'Architecting and fine-tuning transformer-based models. Custom training pipelines, RLHF, prompt engineering at scale.',
    tags: [
      { label: 'GPT-4', color: 'cyan' },
      { label: 'LLaMA', color: 'yellow' },
      { label: 'Mistral', color: 'cyan' },
      { label: 'RLHF', color: 'pink' },
    ],
  },
  {
    icon: '\ud83d\udc41\ufe0f',
    name: 'COMPUTER VISION',
    description:
      'Real-time object detection, image segmentation, and generative vision systems for hostile urban environments.',
    tags: [
      { label: 'YOLO', color: 'yellow' },
      { label: 'Stable Diffusion', color: 'cyan' },
      { label: 'SAM', color: 'cyan' },
    ],
  },
  {
    icon: '\ud83e\udd16',
    name: 'AI AGENTS & RAG',
    description:
      'Autonomous agent systems with tool use, retrieval-augmented generation, and multi-agent coordination.',
    tags: [
      { label: 'LangChain', color: 'pink' },
      { label: 'AutoGen', color: 'cyan' },
      { label: 'CrewAI', color: 'yellow' },
    ],
  },
  {
    icon: '\u2699\ufe0f',
    name: 'MLOps & INFRA',
    description:
      'End-to-end ML pipelines, model serving at scale, monitoring, and deployment on hybrid cloud + edge systems.',
    tags: [
      { label: 'Docker', color: 'cyan' },
      { label: 'MLflow', color: 'cyan' },
    ],
  },
  {
    icon: '\ud83d\udcbe',
    name: 'DATA ENGINEERING',
    description:
      'Massive-scale data ingestion, preprocessing, and feature engineering pipelines that feed hungry neural nets.',
    tags: [
      { label: 'Spark', color: 'pink' },
      { label: 'Kafka', color: 'cyan' },
      { label: 'dbt', color: 'yellow' },
    ],
  },
  {
    icon: '\ud83d\udd10',
    name: 'AI SECURITY',
    description:
      'Adversarial robustness, red-teaming LLMs, jailbreak detection, and building defenses for production AI systems.',
    tags: [
      { label: 'Red Teaming', color: 'yellow' },
      { label: 'Adversarial ML', color: 'pink' },
    ],
  },
];

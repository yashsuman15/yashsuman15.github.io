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
      { label: 'Hugging Face', color: 'cyan' },
      { label: 'Ollama', color: 'yellow' },
      { label: 'Transformers', color: 'pink' },
      
      { label: 'Quantization', color: 'cyan' },
      { label: 'Optimization', color: 'yellow' },
      { label: 'Fine-tuning', color: 'pink' },

      { label: 'PEFT', color: 'cyan' },
      { label: 'Prompt Engineering', color: 'yellow' },
      { label: 'ModelScope', color: 'pink' },

      { label: 'GPT', color: 'cyan' },
      { label: 'LLaMA', color: 'yellow' },
      { label: 'PyTorch', color: 'cyan' },
    ],
  },
  {
    icon: '\ud83d\udc41\ufe0f',
    name: 'COMPUTER VISION',
    description:
      'Real-time object detection, image segmentation, and generative vision systems for industrial and smart city deployments.',
    tags: [
      { label: 'YOLO Series', color: 'yellow' },
      { label: 'Stable Diffusion', color: 'cyan' },
      { label: 'SAM Series', color: 'pink' },

      { label: 'Object Tracking', color: 'yellow' },
      { label: 'Object Classification', color: 'cyan' },
      { label: 'Depth Estimation', color: 'pink' },

      { label: 'ONNX / TensorRT', color: 'yellow' },
      { label: 'FFMPEG', color: 'cyan' },
      { label: 'OpenCV', color: 'pink' },
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

      { label: 'smolagents', color: 'pink' },
      { label: 'Tool Calling', color: 'cyan' },
      { label: 'RAG', color: 'yellow' },

      { label: 'MCP', color: 'pink' },
      { label: 'LangGraph', color: 'cyan' },
      { label: 'n8n', color: 'yellow' },

    ],
  },
  {
    icon: '\u2699\ufe0f',
    name: 'MLOps & INFRA',
    description:
      'End-to-end ML pipelines, model serving at scale, monitoring, and containerized deployment.',
    tags: [
      { label: 'Docker', color: 'cyan' },
      { label: 'MLflow', color: 'cyan' },
    ],
  },
  {
    icon: '\ud83d\udcbe',
    name: 'DATA ENGINEERING',
    description:
      'Massive-scale data ingestion, preprocessing, and feature engineering pipelines for ML training workflows.',
    tags: [
      { label: 'Spark', color: 'pink' },
      { label: 'Kafka', color: 'cyan' },
      { label: 'dbt', color: 'yellow' },
    ],
  },
  {
    icon: '\ud83d\udd10',
    name: 'Other Skills',
    description:
      '-',
    tags: [
      { label: 'Pydantic', color: 'yellow' },
      { label: 'Instructor', color: 'pink' },
      { label: 'Databases', color: 'yellow' },
      { label: 'Git', color: 'pink' },
      { label: 'FastAPI', color: 'cyan' },
      
    ],
  },
];

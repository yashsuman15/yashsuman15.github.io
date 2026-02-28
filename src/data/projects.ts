export interface ShowcaseProject {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  insight: string;
  insightHighlight: string;
  tags: { label: string; color: 'yellow' | 'cyan' | 'purple' }[];
  videoSrc: string;
  caseLink: string;
  githubLink: string;
}

export interface CompletedGig {
  num: string;
  name: string;
  description: string;
  tech: string[];
}

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    index: '// PROJECT_01',
    title: 'NEUROMANCER-7',
    subtitle: 'Autonomous LLM Agent for Corporate Threat Detection',
    description:
      "340M parameter custom transformer architecture trained on Night City's dark net feeds. Detects corporate espionage vectors in real-time across encrypted comms, internal docs, and behavioral telemetry \u2014 before the corps even know they're compromised.",
    insight:
      'pushed detection accuracy to 99.2% while cutting false positives by 67% \u2014 making it deployable in live corpo environments without triggering security alerts.',
    insightHighlight: 'Fine-tuning with adversarially generated red-team data',
    tags: [
      { label: 'PyTorch', color: 'yellow' },
      { label: 'LangChain', color: 'purple' },
      { label: 'CUDA Kernels', color: 'cyan' },
      { label: 'Transformers', color: 'purple' },
      { label: 'RLHF', color: 'yellow' },
      { label: 'vLLM', color: 'purple' },
    ],
    videoSrc: '',
    caseLink: '#',
    githubLink: '#',
  },
  {
    index: '// PROJECT_02',
    title: 'GHOST SIGHT',
    subtitle: 'Real-Time Person Re-Identification Across 4,000+ Nodes',
    description:
      "Edge-deployed computer vision system running across Night City's surveillance mesh. Identifies targets across camera cuts, lighting shifts, and deliberate disguise attempts \u2014 zero cloud dependency, 60fps on embedded hardware.",
    insight:
      'reduced model size by 78% with only 1.2% accuracy loss \u2014 making sub-20ms inference on embedded GPUs viable at city scale for the first time.',
    insightHighlight: 'Custom TensorRT quantization pipeline',
    tags: [
      { label: 'YOLOv9', color: 'yellow' },
      { label: 'TensorRT', color: 'cyan' },
      { label: 'OpenCV', color: 'purple' },
      { label: 'ReID Models', color: 'purple' },
      { label: 'ONNX', color: 'yellow' },
      { label: 'Edge Deploy', color: 'purple' },
    ],
    videoSrc: '',
    caseLink: '#',
    githubLink: '#',
  },
  {
    index: '// PROJECT_03',
    title: 'NETWATCH SHIELD',
    subtitle: 'LLM-Powered Zero-Day Threat Intelligence Engine',
    description:
      'RAG-augmented threat intel system ingesting 2TB of dark net traffic, exploit forums, and comms daily. Surfaces zero-day alerts hours before public CVE disclosure. Built for three megacorps with 99.99% uptime SLA.',
    insight:
      'cut false alert rate by 81% \u2014 the difference between security teams acting on real threats versus drowning in noise.',
    insightHighlight: 'Combining semantic chunking with hybrid BM25 + vector retrieval',
    tags: [
      { label: 'RAG', color: 'purple' },
      { label: 'Elasticsearch', color: 'cyan' },
      { label: 'Kafka', color: 'yellow' },
      { label: 'LangChain', color: 'purple' },
      { label: 'FastAPI', color: 'purple' },
      { label: 'pgvector', color: 'cyan' },
    ],
    videoSrc: '',
    caseLink: '#',
    githubLink: '#',
  },
  {
    index: '// PROJECT_04',
    title: 'CORPUS CHROMI',
    subtitle: 'Multimodal Synthetic Data Generation Platform',
    description:
      'Generative pipeline producing photorealistic synthetic training data for computer vision models. Reduced annotation costs by 60% for three corps. Outputs pass automated quality checks and real-distribution statistics tests \u2014 indistinguishable from real captures.',
    insight:
      'ensured synthetic images matched real distribution statistics \u2014 so models trained on synthetic data generalized to production with zero fine-tuning penalty.',
    insightHighlight: 'Pairing domain-randomized diffusion with CLIP-guided filtering',
    tags: [
      { label: 'Stable Diffusion', color: 'yellow' },
      { label: 'CLIP', color: 'cyan' },
      { label: 'ControlNet', color: 'purple' },
      { label: 'VAE', color: 'purple' },
      { label: 'Ray', color: 'yellow' },
      { label: 'Kubernetes', color: 'cyan' },
    ],
    videoSrc: '',
    caseLink: '#',
    githubLink: '#',
  },
];

export const COMPLETED_GIGS: CompletedGig[] = [
  {
    num: '01',
    name: 'NEUROMANCER-7',
    description:
      'Autonomous LLM agent system for corporate espionage detection \u2014 340M parameter custom architecture, 99.2% accuracy',
    tech: ['PyTorch', 'LangChain', 'CUDA'],
  },
  {
    num: '02',
    name: 'GHOST SIGHT',
    description:
      'Real-time person re-identification system across 4,000+ surveillance nodes. Runs on edge hardware at 60fps',
    tech: ['YOLO v9', 'TensorRT', 'OpenCV'],
  },
  {
    num: '03',
    name: 'CORPUS CHROMI',
    description:
      'Multimodal generative AI platform producing synthetic training data \u2014 saved 60% annotation costs for 3 corps',
    tech: ['Diffusion', 'CLIP', 'VAE'],
  },
  {
    num: '04',
    name: 'NETWATCH SHIELD',
    description:
      'LLM-powered threat intelligence system processing 2TB/day of dark net data, alerting on zero-day exploits',
    tech: ['RAG', 'Elasticsearch', 'Kafka'],
  },
  {
    num: '05',
    name: 'BRAINDANCE CODEC',
    description:
      'Neural signal compression and classification model for BD editing suites. Reduced file size by 89% with zero quality loss',
    tech: ['Time-series ML', 'Signal Processing'],
  },
];

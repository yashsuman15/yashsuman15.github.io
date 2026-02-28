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
    date: '2075 \u2014 PRESENT',
    role: 'SENIOR AI ENGINEER',
    company: '\u25c8 MILITECH AI DIVISION // NIGHT CITY',
    description:
      'Led a 12-person neural architecture team developing autonomous threat assessment AI. Reduced model inference latency by 340ms through custom CUDA kernels. Deployed 3 production LLMs serving 2M+ daily requests.',
    dotColor: '#FCE300',
    dotShadow: '0 0 16px rgba(252,227,0,0.6)',
  },
  {
    date: '2072 \u2014 2075',
    role: 'ML ENGINEER',
    company: '\u25c8 ARASAKA DATASEC // TOKYO / NIGHT CITY',
    description:
      'Built the core NLP pipeline for corporate document analysis \u2014 fine-tuned proprietary LLMs on 40B token corpus. Designed the threat classification system still running in production today.',
    dotColor: '#00F5FF',
    dotShadow: '0 0 16px rgba(0,245,255,0.6)',
  },
  {
    date: '2070 \u2014 2072',
    role: 'AI RESEARCH ENGINEER',
    company: '\u25c8 NETWATCH GLOBAL // REMOTE',
    description:
      'Pioneered adversarial ML defenses for netrunner detection systems. Published 4 papers on robust deep learning under distribution shift. First engineer to implement real-time ICE breach prediction with 97.4% accuracy.',
    dotColor: '#BD00FF',
    dotShadow: '0 0 16px rgba(189,0,255,0.6)',
  },
];

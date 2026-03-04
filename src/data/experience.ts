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
      'Built the core NLP pipeline for corporate document analysis \u2014 fine-tuned proprietary LLMs on 40B token corpus. Designed the threat classification system still running in production today.',
    dotColor: '#00F5FF',
    dotShadow: '0 0 16px rgba(0,245,255,0.6)',
  },
];

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
  "Born from the digital sprawl of Night City, I've spent 7 years engineering artificial minds that push the limits of what machines can think, learn, and create. My neural implants keep me permanently jacked into the bleeding edge.",
  'I specialize in large language models, autonomous AI agents, and computer vision systems \u2014 architectures that don\'t just process data, they understand context, adapt to chaos, and deliver results when the corps are watching.',
  "Current fixers: Militech AI Division, Arasaka DataSec, and a few netrunner collectives you've never heard of. I keep my cred clean and my code cleaner.",
];

// ── Short bio for chat context (combines the essence of the 3 paragraphs) ──

export const BIO_SUMMARY =
  '7 years engineering artificial minds that push the limits of what machines can think, learn, and create. Specializes in large language models, autonomous AI agents, and computer vision systems \u2014 architectures that understand context, adapt to chaos, and deliver results.';

// ── Neural augmentation bars (About section skill bars) ──

export const AUGMENTATIONS: Augmentation[] = [
  { name: 'Python / PyTorch', width: '97%', delay: '0s' },
  { name: 'Computer Vision', width: '91%', delay: '.2s' },
  { name: 'GEN AI', width: '94%', delay: '.4s' },
  { name: 'AI AGENTS', width: '88%', delay: '.6s' },
];

// ── Hero stats ──

export const HERO_STATS: HeroStat[] = [
  { value: '7+', label: 'YEARS JACKED IN' },
  { value: '42', label: 'MODELS DEPLOYED' },
  { value: '99%', label: 'NEURAL UPTIME' },
];

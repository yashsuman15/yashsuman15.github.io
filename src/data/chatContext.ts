// ── Alt AI Assistant — Data & Prompt Context ──
// Portfolio data is auto-generated from the shared data files.
// Only Alt's personality, intro, and questions are hardcoded here.

import { SHOWCASE_PROJECTS, AGENT_PROJECTS, HIGHLIGHTS } from './projects';
import { EXPERIENCE } from './experience';
import {
  ENGINEER_NAME,
  ENGINEER_ROLES,
  BIO_SUMMARY,
  HERO_STATS,
  PROFICIENCIES,
  SKILL_COLUMNS,
} from './about';
import { CONTACT_LINKS } from './contact';
import { VIDEOS, ARTICLES } from './writing';

// ── Alt's intro message ──

export const ALT_INTRO_MESSAGE =
  "Hi! I'm Alt, Yash's AI assistant. I'm here to help you learn about his work — from real-time computer vision systems to LLM-powered agents. Feel free to ask me about his projects, skills, experience, or how to get in touch.";

// ── Suggested questions ──

export const ALT_QUESTIONS: string[] = [
  'What can you help me with?',
  'Why are you called Alt?',
];

export const YASH_QUESTIONS: string[] = [
  "What are Yash's main skills?",
  'Tell me about a standout project.',
  'Where has Yash worked?',
  'How do I contact Yash?',
];

// ── Section map (for [NAV:id] markers) ──

export const SECTION_MAP: Record<string, string> = {
  hero: 'Home',
  projects: 'Projects',
  writing: 'Writing & Content',
  experience: 'Experience',
  skills: 'Skills',
  contact: 'Contact',
};

// ── Compute years active from work experience ──

function computeYearsActive(): string {
  const MONTH_NAMES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const startDates = EXPERIENCE.map((e) => {
    const match = e.dateRange.match(/^([A-Za-z]+)\s+(\d{4})/i);
    if (!match) return new Date();
    const monthStr = match[1].toUpperCase().slice(0, 3);
    const monthIndex = MONTH_NAMES.indexOf(monthStr);
    return new Date(parseInt(match[2]), monthIndex >= 0 ? monthIndex : 0);
  });
  const earliest = new Date(Math.min(...startDates.map((d) => d.getTime())));
  const now = new Date();
  const totalMonths =
    (now.getFullYear() - earliest.getFullYear()) * 12 +
    (now.getMonth() - earliest.getMonth());
  const years = Math.round(totalMonths / 6) * 0.5;
  if (years < 1) return 'Less than a year';
  return `${years}+ year${years === 1 ? '' : 's'}`;
}

// ── Auto-generate PORTFOLIO_CONTEXT from data files ──

function buildPortfolioContext(): string {
  const statsStr = HERO_STATS.map((s) => `- ${s.value} ${s.label}`).join('\n');
  const yearsActive = computeYearsActive();

  const identity = `=== YASH'S PROFILE ===
Name: ${ENGINEER_NAME}
Role: ${ENGINEER_ROLES.join(' / ')}
Years of experience: ${yearsActive}
Bio: ${BIO_SUMMARY}

Key stats:
${statsStr}

Core proficiencies:
${PROFICIENCIES.map((p) => `- ${p.name}: ${p.percentage}%`).join('\n')}`;

  // AI Agent projects
  const agentLines = AGENT_PROJECTS.map((p, i) => {
    return `${i + 1}. ${p.title} [${p.tag}]
   ${p.description}
   Tech: ${p.tech}`;
  });

  const agents = `=== AI AGENTS & LLM SYSTEMS (section: projects) ===

${agentLines.join('\n\n')}`;

  // Computer Vision projects with social proof
  const cvLines = SHOWCASE_PROJECTS.map((p, i) => {
    const socialLine = p.social
      ? `\n   Social proof (${p.social.platform}): ${p.social.metrics.map((m) => `${m.value.toLocaleString()} ${m.label}`).join(', ')}`
      : '';
    return `${i + 1}. ${p.title}
   ${p.subtitle}
   ${p.description}
   Tech: ${p.tags.map((t) => t.label).join(', ')}${socialLine}`;
  });

  const cvProjects = `=== COMPUTER VISION SYSTEMS (section: projects) ===

${cvLines.join('\n\n')}`;

  // Writing & Content
  const videoList = VIDEOS.map((v) => `- ${v.title}`).join('\n');
  const articleList = ARTICLES.slice(0, 6).map((a) => `- ${a.title} (${a.category})`).join('\n');

  const writing = `=== WRITING & CONTENT (section: writing) ===
Yash has created 25+ technical articles and 5+ video tutorials for Labellerr AI.

Recent videos:
${videoList}

Recent articles:
${articleList}
...and more on the Labellerr blog.`;

  // Highlights
  const highlightLines = HIGHLIGHTS.map((h) => {
    const stat = h.stat ? ` — ${h.stat}` : '';
    return `- ${h.title}${stat}`;
  });

  const highlights = HIGHLIGHTS.length
    ? `=== KEY ACHIEVEMENTS ===

${highlightLines.join('\n')}`
    : '';

  // Skills
  const skillLines = SKILL_COLUMNS.map((col) => {
    return `${col.title}:\n${col.items.map((item) => `  - ${item}`).join('\n')}`;
  });

  const skills = `=== TECHNICAL SKILLS (section: skills) ===

${skillLines.join('\n\n')}`;

  // Experience
  const expLines = EXPERIENCE.map((e) => {
    const bullets = e.bullets.map((b) => `  - ${b}`).join('\n');
    return `${e.role} at ${e.company}, ${e.location}
${e.dateRange}
${e.summary}

Key responsibilities:
${bullets}`;
  });

  const experience = `=== WORK EXPERIENCE (section: experience) ===

${expLines.join('\n\n')}`;

  // Contact
  const contactLines = CONTACT_LINKS.map((c) => `${c.label}: ${c.displayText}`);

  const contact = `=== CONTACT (section: contact) ===
${contactLines.join('\n')}
Visitors can reach out via the contact section on the portfolio.`;

  // Navigation
  const nav = `=== NAVIGATION ===
Valid section IDs for [NAV:id] markers:
${Object.entries(SECTION_MAP)
    .map(([id, name]) => `- ${id} — ${name}`)
    .join('\n')}`;

  return `
${identity}

${agents}

${cvProjects}

${writing}

${highlights}

${skills}

${experience}

${contact}

${nav}
`;
}

export const PORTFOLIO_CONTEXT = buildPortfolioContext();

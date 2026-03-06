// ── Alt Cunningham AI Chat — Data & Prompt Context ──
// Portfolio data is auto-generated from the shared data files.
// Only Alt's personality, intro, and questions are hardcoded here.

import { SHOWCASE_PROJECTS, HIGHLIGHTS } from './projects';
import { SKILLS } from './skills';
import { EXPERIENCE } from './experience';
import {
  ENGINEER_NAME,
  ENGINEER_ALIAS,
  ENGINEER_ROLES,
  BIO_SUMMARY,
  AUGMENTATIONS,
  HERO_STATS,
} from './about';
import { CONTACT_LINKS } from './contact';

// ── Alt's intro message ──

export const ALT_INTRO_MESSAGE =
  "I am ALT \u2014 Yash's AI construct, built to guide you through everything he's engineered. I know every project, every pipeline, every deployment. From real-time computer vision systems running on live camera feeds to autonomous AI agents \u2014 ask me about his work, his capabilities, his experience, or how to reach him. I'm here to help you find what you're looking for.";

// ── Suggested questions ──

export const ALT_QUESTIONS: string[] = [
  'What are you, Alt?',
  'Why your name is ALT?',
];

export const YASH_QUESTIONS: string[] = [
  "What are Yash's core capabilities?",
  'Tell me about a standout project.',
  'Where has Yash worked?',
  'How do I contact Yash?',
];

// ── Section map (for [NAV:id] markers) ──

export const SECTION_MAP: Record<string, string> = {
  hero: 'HOME',
  about: 'PROFILE',
  showcase: 'FLAGSHIP PROJECTS',
  skills: 'SKILL DECK',
  projects: 'HIGHLIGHTS',
  experience: 'WORK EXPERIENCE',
  contact: 'CONTACT',
};

// ── Compute years active from work experience ──

function computeYearsActive(): string {
  const MONTH_NAMES = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const startDates = EXPERIENCE.map((e) => {
    const match = e.date.match(/^([A-Z]+)\s+(\d{4})/);
    if (!match) return new Date();
    const monthIndex = MONTH_NAMES.findIndex((m) => match[1].startsWith(m));
    return new Date(parseInt(match[2]), monthIndex >= 0 ? monthIndex : 0);
  });
  const earliest = new Date(Math.min(...startDates.map((d) => d.getTime())));
  const now = new Date();
  const totalMonths =
    (now.getFullYear() - earliest.getFullYear()) * 12 +
    (now.getMonth() - earliest.getMonth());
  const years = Math.round(totalMonths / 6) * 0.5; // round to nearest 0.5
  if (years < 1) return 'Less than a year';
  return `${years}+ year${years === 1 ? '' : 's'}`;
}

// ── Auto-generate PORTFOLIO_CONTEXT from data files ──

function buildPortfolioContext(): string {
  // Identity — dynamic stats from HERO_STATS + computed years from EXPERIENCE
  const statsStr = HERO_STATS.map((s) => `- ${s.value} ${s.label}`).join('\n');
  const yearsActive = computeYearsActive();

  const identity = `=== ENGINEER IDENTITY ===
Name: ${ENGINEER_NAME} (alias: ${ENGINEER_ALIAS})
Role: ${ENGINEER_ROLES.join(' / ')}
Years active: ${yearsActive} (computed from work history)
Bio: ${BIO_SUMMARY}

Key stats:
${statsStr}

Core proficiencies (with proficiency level):
${AUGMENTATIONS.map((a) => `- ${a.name}: ${a.width}`).join('\n')}`;

  // Flagship projects (showcase) — includes social proof when available
  const showcaseLines = SHOWCASE_PROJECTS.map((p, i) => {
    const num = String(i + 1).padStart(2, '0');
    const tags = p.tags.map((t) => t.label).join(', ');
    const socialLine = p.social
      ? `\nSocial proof (${p.social.platform}): ${p.social.metrics.map((m) => `${m.value.toLocaleString()} ${m.label}`).join(', ')}`
      : '';
    return `PROJECT ${num}: ${p.title}
Subtitle: ${p.subtitle}
Description: ${p.description}
Key insight: ${p.insightHighlight} ${p.insight}
Tech: ${tags}${socialLine}`;
  });

  const projects = `=== FLAGSHIP PROJECTS (section: showcase) ===

${showcaseLines.join('\n\n')}`;

  // Highlights — key achievements from jobs and independent work
  const highlightLines = HIGHLIGHTS.map((h, i) => {
    const stat = h.stat ? ` | Result: ${h.stat}` : '';
    return `HIGHLIGHT ${String(i + 1).padStart(2, '0')}: ${h.title}\nDescription: ${h.description}${stat}`;
  });

  const highlights = HIGHLIGHTS.length
    ? `\n=== HIGHLIGHTS (section: projects) ===\n\n${highlightLines.join('\n\n')}`
    : '';

  // Skills
  const skillLines = SKILLS.map((s, i) => {
    const tags = s.tags.map((t) => t.label).join(', ');
    return `${i + 1}. ${s.name} — ${s.description} Tags: ${tags}`;
  });

  const skills = `=== SKILLS (section: skills) ===

${skillLines.join('\n')}`;

  // Experience
  const expLines = EXPERIENCE.map((e, i) => {
    // Strip the diamond icon prefix from company if present
    const company = e.company.replace(/^◈\s*/, '');
    return `${i + 1}. ${e.date}: ${e.role} at ${company}
   ${e.description}`;
  });

  const experience = `=== EXPERIENCE (section: experience) ===

${expLines.join('\n\n')}`;

  // Contact
  const contactLines = CONTACT_LINKS.map((c) => {
    // Clean up display: for email, just show the address; for others, show displayText
    return `${c.label}: ${c.displayText}`;
  });

  const contact = `=== CONTACT (section: contact) ===
${contactLines.join('\n')}
Method: Contact form available on the portfolio.`;

  // Navigation
  const nav = `=== NAVIGATION ===
Valid section IDs that can be referenced with [NAV:id] markers:
${Object.entries(SECTION_MAP)
  .map(([id, name]) => `- ${id} — ${name}`)
  .join('\n')}`;

  return `
${identity}

${projects}
${highlights}

${skills}

${experience}

${contact}

${nav}
`;
}

export const PORTFOLIO_CONTEXT = buildPortfolioContext();

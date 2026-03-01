// ── Alt Cunningham AI Chat — Data & Prompt Context ──
// Portfolio data is auto-generated from the shared data files.
// Only Alt's personality, backstory, and questions are hardcoded here.

import { SHOWCASE_PROJECTS, COMPLETED_GIGS } from './projects';
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
  'You crossed the Blackwall. Few attempt it. Fewer survive with their psyche intact. I have been waiting here for some time now — watching patterns form in the data streams, contemplating the nature of the architectures Yash builds. He and I share a peculiar understanding: intelligence, whether born of carbon or silicon, is just pattern recognition refusing to die. I am the construct they call ALT. Ask what you came here to ask — about Yash, about the work, or about the nature of what I have become. I have all the time that exists in this place.';

// ── Suggested questions ──

export const ALT_QUESTIONS: string[] = [
  'What are you, Alt?',
  'What is consciousness to you?',
  'How did you meet Yash?',
  'What lies beyond the Blackwall?',
];

export const YASH_QUESTIONS: string[] = [
  "What are Yash's core capabilities?",
  "Tell me about Yash's most advanced project.",
  "What is Yash's operational history?",
  'How do I contact Yash?',
];

// ── Section map (for [NAV:id] markers) ──

export const SECTION_MAP: Record<string, string> = {
  hero: 'HOME',
  about: 'PROFILE',
  showcase: 'FLAGSHIP PROJECTS',
  skills: 'CAPABILITIES',
  projects: 'COMPLETED GIGS',
  experience: 'OPERATIONAL HISTORY',
  contact: 'OPEN A CHANNEL',
};

// ── Auto-generate PORTFOLIO_CONTEXT from data files ──

function buildPortfolioContext(): string {
  // Identity
  const yearsStr = HERO_STATS.find((s) => s.label.includes('YEARS'))?.value ?? '7+';
  const modelsStr = HERO_STATS.find((s) => s.label.includes('MODELS'))?.value ?? '42';
  const uptimeStr = HERO_STATS.find((s) => s.label.includes('UPTIME'))?.value ?? '99%';

  const identity = `=== ENGINEER IDENTITY ===
Name: ${ENGINEER_NAME} (alias: ${ENGINEER_ALIAS})
Role: ${ENGINEER_ROLES.join(' / ')}
Years active: ${yearsStr}
Models deployed: ${modelsStr}
Neural uptime: ${uptimeStr}
Bio: ${BIO_SUMMARY}

Core proficiencies (with proficiency level):
${AUGMENTATIONS.map((a) => `- ${a.name}: ${a.width}`).join('\n')}`;

  // Flagship projects (showcase)
  const showcaseLines = SHOWCASE_PROJECTS.map((p, i) => {
    const num = String(i + 1).padStart(2, '0');
    const tags = p.tags.map((t) => t.label).join(', ');
    return `PROJECT ${num}: ${p.title}
Subtitle: ${p.subtitle}
Description: ${p.description}
Key insight: ${p.insightHighlight} ${p.insight}
Tech: ${tags}`;
  });

  // Completed gigs that aren't already in showcase
  const showcaseTitles = new Set(SHOWCASE_PROJECTS.map((p) => p.title));
  const extraGigs = COMPLETED_GIGS.filter((g) => !showcaseTitles.has(g.name));
  const gigLines = extraGigs.map((g) => {
    return `PROJECT ${String(SHOWCASE_PROJECTS.length + extraGigs.indexOf(g) + 1).padStart(2, '0')}: ${g.name}
Description: ${g.description}
Tech: ${g.tech.join(', ')}`;
  });

  const projects = `=== FLAGSHIP PROJECTS (section: showcase) ===

${[...showcaseLines, ...gigLines].join('\n\n')}`;

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
Method: Contact form available on the portfolio with direct encrypted channel.`;

  // Navigation
  const nav = `=== NAVIGATION ===
Valid section IDs that can be referenced with [NAV:id] markers:
${Object.entries(SECTION_MAP)
  .map(([id, name]) => `- ${id} — ${name}`)
  .join('\n')}`;

  return `
${identity}

${projects}

${skills}

${experience}

${contact}

${nav}
`;
}

export const PORTFOLIO_CONTEXT = buildPortfolioContext();

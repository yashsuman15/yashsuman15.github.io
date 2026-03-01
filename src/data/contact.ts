// ── Contact Data ──
// Single source of truth for contact links.
// Used by Contact.tsx and chatContext.ts (auto-generated prompt).

export interface ContactLink {
  label: string;
  href: string;
  displayText: string;
  icon: string;
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    label: 'EMAIL',
    href: 'mailto:yashsuman15@gmail.com',
    displayText: 'yashsuman15@gmail.com',
    icon: '\u2709',
  },
  {
    label: 'GITHUB',
    href: 'https://github.com/yashsuman15',
    displayText: 'github.com/yashsuman15',
    icon: '\u25C8',
  },
  {
    label: 'LINKEDIN',
    href: 'https://www.linkedin.com/in/yash-raj-suman/',
    displayText: 'linkedin.com/in/yash-raj-suman',
    icon: '\u25C9',
  },
  {
    label: 'TWITTER/X',
    href: 'https://x.com/yashsuman69',
    displayText: '@yashsuman69',
    icon: '\u25C6',
  },
];

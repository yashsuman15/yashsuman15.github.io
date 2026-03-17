# How to Personalize Your Portfolio

This guide walks you through every placeholder in the project and how to replace it with your real information. Follow the steps in order or jump to whichever section you need.

---

## Table of Contents

1. [Your Name & Brand](#1-your-name--brand)
2. [Page Title & Meta Tags](#2-page-title--meta-tags)
3. [Nav Logo](#3-nav-logo)
4. [Hero Section](#4-hero-section)
5. [Profile Photo](#5-profile-photo)
6. [About Bio](#6-about-bio)
7. [Proficiency Bars](#7-proficiency-bars)
8. [Skill Columns](#8-skill-columns)
9. [AI Agent Projects](#9-ai-agent-projects)
10. [Computer Vision Projects (Showcase)](#10-computer-vision-projects-showcase)
11. [Adding Project Videos](#11-adding-project-videos)
12. [Writing & Content Section](#12-writing--content-section)
13. [Highlights](#13-highlights)
14. [Work Experience](#14-work-experience)
15. [Contact Info & Social Links](#15-contact-info--social-links)
16. [Contact Form (Formspree)](#16-contact-form-formspree)
17. [Footer](#17-footer)
18. [Navigation Links](#18-navigation-links)
19. [SEO & Meta Tags](#19-seo--meta-tags)
20. [Favicon & Social Preview Image](#20-favicon--social-preview-image)
21. [Deploying Your Changes](#21-deploying-your-changes)
22. [AI Chat & Cloudflare Worker](#22-ai-chat--cloudflare-worker)
23. [Resume PDF](#23-resume-pdf)
24. [PostHog Analytics](#24-posthog-analytics)

---

## 1. Your Name & Brand

Your name appears in several places:

### A) Hero section name

**File:** `src/data/about.ts`

```ts
export const ENGINEER_NAME = 'Yash Suman';
export const ENGINEER_ROLE = 'AI Engineer';
export const ENGINEER_ROLES = ['AI Engineer', 'Computer Vision Engineer', 'Gen-AI Engineer'];
```

### B) Footer copyright

**File:** `src/app/components/Footer.tsx`

```tsx
// Update the copyright text
&copy; {new Date().getFullYear()} Yash Suman
```

### C) Navigation name

**File:** `src/app/components/Navigation.tsx`

```tsx
<a className="nav-name" href="#">
  Yash Suman
</a>
```

---

## 2. Page Title & Meta Tags

**File:** `index.html`

```html
<title>Yash Suman — AI Engineer</title>
<meta name="description" content="AI Engineer specializing in real-time computer vision systems and LLM-powered AI agents..." />
```

---

## 3. Nav Logo

The navigation uses text by default. To use an image logo:

**File:** `src/app/components/Navigation.tsx`

```tsx
// Replace the text link with an image
<a className="nav-name" href="#">
  <img src="/logo.webp" alt="Logo" style={{ height: '32px' }} />
</a>
```

Place your logo file at `public/logo.webp`.

---

## 4. Hero Section

**File:** `src/data/about.ts`

### Headline and subtitle

```ts
export const HERO_HEADLINE = 'I build LLM-powered systems & autonomous AI agents.';
export const HERO_SUBTITLE =
  'Specializing in RAG pipelines, multi-agent orchestration, and production-grade AI systems that reason, retrieve, and act.';
```

### Stats

```ts
export const HERO_STATS: HeroStat[] = [
  { value: '10+', label: 'Projects shipped' },
  { value: '100+', label: 'Models trained' },
  { value: '1M+', label: 'Demo views' },
];
```

---

## 5. Profile Photo

Place your photo at `public/profile.webp`. The About section displays it automatically.

**Recommended specs:**
- Aspect ratio: 1:1 (square) works best
- Minimum size: 400x400px
- Format: WebP (best compression), PNG, or JPG

**File:** `src/app/components/About.tsx`

```tsx
<img
  src="/profile.webp"
  alt="Yash Suman"
  className="profile-image"
  loading="lazy"
/>
```

---

## 6. About Bio

**File:** `src/data/about.ts`

```ts
export const BIO_PARAGRAPHS: string[] = [
  "I'm an AI Engineer specializing in building production-grade computer vision systems and LLM-powered autonomous agents...",
  "Currently at Labellerr AI, I design and deploy vision pipelines for industrial applications...",
  "My projects have reached over 1 million views across Reddit and YouTube...",
];
```

Also update the short summary for the AI chat:

```ts
export const BIO_SUMMARY =
  'AI Engineer building real-time computer vision pipelines and LLM-powered agentic systems...';
```

---

## 7. Proficiency Bars

**File:** `src/data/about.ts`

```ts
export const PROFICIENCIES: Proficiency[] = [
  { name: 'Python', percentage: 97 },
  { name: 'Gen AI', percentage: 94 },
  { name: 'Computer Vision', percentage: 91 },
  { name: 'AI Agents', percentage: 88 },
];
```

---

## 8. Skill Columns

**File:** `src/data/about.ts`

```ts
export const SKILL_COLUMNS: SkillColumn[] = [
  {
    title: 'Large Language Models',
    items: [
      'Hugging Face & Transformers',
      'GPT / LLaMA / Ollama',
      'Fine-tuning (PEFT, LoRA)',
      'Quantization & Optimization',
      'Prompt Engineering',
    ],
  },
  // ... more columns
];
```

---

## 9. AI Agent Projects

**File:** `src/data/projects.ts` — `AGENT_PROJECTS` array

```ts
export const AGENT_PROJECTS: AgentProject[] = [
  {
    title: 'Meeting Summarizer',
    description: 'Processes meeting recordings into structured summaries with key decisions and action items.',
    tag: 'Agent',
    tech: 'LLM Agent · Transcription · Python',
    githubUrl: 'https://github.com/yashsuman15/Meeting_summarizer_agent',
  },
  // ... more projects
];
```

---

## 10. Computer Vision Projects (Showcase)

**File:** `src/data/projects.ts` — `SHOWCASE_PROJECTS` array

Each project has:

```ts
{
  index: '// PROJECT_01',
  title: 'GHOST SIGHT',
  subtitle: 'Detects Intrusions. Flags Anomalies. Keeps the Perimeter Safe.',
  description: 'Custom-trained Vision pipeline for detecting unauthorized zone entry...',
  insight: 'fine-tuned for every targeted intrusion scenario...',
  insightHighlight: 'Domain-specific CV fine-tuning pipeline',
  tags: [
    { label: 'YOLO', color: 'yellow' },
    { label: 'RTDETR', color: 'cyan' },
    { label: 'OpenCV', color: 'purple' },
  ],
  videoSrc: '/videos/intrusion_detection_compressed.mp4',
  social: {
    platform: 'reddit',  // or 'youtube'
    url: 'https://reddit.com/r/...',
    metrics: [
      { icon: '\u25C9', value: 45000, label: 'views' },
      { icon: '\u25B2', value: 400, label: 'upvotes' },
    ],
  },
  githubLink: 'https://github.com/...',
}
```

### Platform colors

| Platform | Color | Used for |
|----------|-------|----------|
| `reddit` | `#FF4500` (orange) | View count button |
| `youtube` | `#FF0000` (red) | View count button |
| `linkedin` | `#0A66C2` (blue) | View count button |

---

## 11. Adding Project Videos

1. Place your `.mp4` video file in `public/videos/`
2. Update the `videoSrc` field in `src/data/projects.ts`:

```ts
videoSrc: '/videos/your-video.mp4',
```

Videos will:
- Autoplay (muted) when scrolled into view
- Pause when scrolled away
- Loop continuously

**Tips:**
- Use landscape (16:9) videos
- Keep file sizes small (under 10MB) for fast loading
- MP4 with H.264 codec works in all browsers

---

## 12. Writing & Content Section

**File:** `src/data/writing.ts`

### Videos

```ts
export const VIDEOS: Video[] = [
  {
    title: 'Fine-Tune YOLO for Custom Object Detection',
    thumbnail: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg',
    url: 'https://youtu.be/VIDEO_ID',
    views: 15000,
    date: '2024-10-15',
  },
  // ... more videos
];
```

### Articles

```ts
export const ARTICLES: Article[] = [
  {
    title: 'Complete Guide to RAG Pipelines',
    url: 'https://labellerr.com/blog/...',
    category: 'LLM',
    date: '2024-11-01',
  },
  // ... more articles
];
```

---

## 13. Highlights

**File:** `src/data/projects.ts` — `HIGHLIGHTS` array

```ts
export const HIGHLIGHTS: Highlight[] = [
  {
    num: '01',
    title: 'Built a Open-Source GitHub Repo',
    description: 'Created a GitHub repository covering end-to-end CV pipelines...',
    stat: '300+ GitHub stars',
  },
  // ... more highlights
];
```

---

## 14. Work Experience

**File:** `src/data/experience.ts`

```ts
export const EXPERIENCE: ExperienceEntry[] = [
  {
    date: 'Oct 2023 — Present',
    role: 'AI Engineer',
    company: 'Labellerr AI',
    location: 'Bengaluru, India',
    type: 'Full-time',
    bullets: [
      'Built and deployed 20+ production computer vision pipelines...',
      'Developed AI agents and RAG systems...',
    ],
  },
  // ... more entries
];
```

---

## 15. Contact Info & Social Links

**File:** `src/data/contact.ts`

```ts
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
```

---

## 16. Contact Form (Formspree)

The contact form uses [Formspree](https://formspree.io) to receive submissions.

### Setup

1. Sign up at [formspree.io](https://formspree.io) (free tier: 50 submissions/month)
2. Create a new form — you'll get a form ID like `xaqdkzwe`
3. The form ID is hardcoded in `src/app/components/Contact.tsx`:

```tsx
const formspreeId = 'xaqdkzwe';
```

To change it, update this value.

---

## 17. Footer

**File:** `src/app/components/Footer.tsx`

```tsx
<footer>
  <span>&copy; {new Date().getFullYear()} Yash Suman</span>
  <div className="footer-links">
    <a href="https://github.com/yashsuman15">GitHub</a>
    <a href="https://linkedin.com/in/yash-raj-suman">LinkedIn</a>
    <a href="https://x.com/yashsuman69">X</a>
  </div>
</footer>
```

---

## 18. Navigation Links

**File:** `src/app/components/Navigation.tsx`

### Desktop navigation

```tsx
<div className="nav-center">
  <a href="#projects">Projects</a>
  <a href="#about">About</a>
  <a href="#experience">Experience</a>
  <a href="#contact">Contact</a>
</div>
```

### Mobile navigation

The mobile menu includes all sections. Update both desktop and mobile links when adding/removing sections.

### Available section IDs

- `#hero` — Hero/landing
- `#projects` — Projects section
- `#about` — About section (with profile)
- `#writing` — Writing & Content
- `#highlights` — Key achievements
- `#experience` — Work history
- `#skills` — Skills section
- `#contact` — Contact form

---

## 19. SEO & Meta Tags

**File:** `index.html`

### Title and description

```html
<title>Yash Suman — AI Engineer</title>
<meta name="description" content="AI Engineer specializing in real-time computer vision systems and LLM-powered AI agents." />
```

### Open Graph (social sharing)

```html
<meta property="og:title" content="Yash Suman — AI Engineer" />
<meta property="og:description" content="AI Engineer specializing in..." />
<meta property="og:image" content="https://yashsuman15.github.io/og-image.png" />
```

### Structured data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Yash Suman",
  "url": "https://yashsuman15.github.io",
  "jobTitle": "AI Engineer",
  "description": "AI Engineer specializing in...",
  "sameAs": [
    "https://github.com/yashsuman15",
    "https://linkedin.com/in/yash-raj-suman",
    "https://x.com/yashsuman69"
  ]
}
```

---

## 20. Favicon & Social Preview Image

### Favicon

Place your favicon at `public/logo.webp` (or use proper favicon files).

### Social preview image

Create a 1200x630px image and save as `public/og-image.png`. This is displayed when sharing on social media.

---

## 21. Deploying Your Changes

### Preview locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Deploy

```bash
git add .
git commit -m "update portfolio content"
git push origin main
```

GitHub Actions will automatically build and deploy.

---

## 22. AI Chat & Cloudflare Worker

The portfolio includes an AI chat assistant named "Alt" powered by Groq's LLM API via a Cloudflare Worker.

### How data flows

Portfolio data lives in `src/data/` files. At build time, `chatContext.ts` auto-generates a `PORTFOLIO_CONTEXT` string. The frontend sends this to the Cloudflare Worker, which combines it with Alt's personality prompt and forwards to Groq.

**When you update data files, the AI chat automatically knows about the changes.**

### Cloudflare Worker setup

```bash
# 1. Install Wrangler CLI
npm install -g wrangler

# 2. Login to Cloudflare
wrangler login

# 3. Set your Groq API key as a secret
cd serverless
wrangler secret put GROQ_API_KEY
# Get a free key at: https://console.groq.com/keys

# 4. Deploy
wrangler deploy
```

### Connect frontend to worker

Create `.env.local` in the project root:

```
VITE_CHAT_API_URL=https://alt-chat-proxy.your-subdomain.workers.dev
```

### Redeploying the worker

After editing `serverless/worker.js`:

```bash
cd serverless
wrangler deploy
```

### Customizing Alt's personality

Edit `PERSONALITY_PROMPT` in `serverless/worker.js` and redeploy.

### Changing the LLM model

**File:** `serverless/worker.js`

```js
const GROQ_MODEL = 'llama-3.3-70b-versatile';
```

Valid Groq models (as of 2024):
- `llama-3.3-70b-versatile` (recommended)
- `llama-3.1-8b-instant`
- `openai/gpt-oss-120b`
- `openai/gpt-oss-20b`

### Chat suggestions

**File:** `src/data/chatContext.ts`

```ts
export const ALT_QUESTIONS: string[] = [
  'What can you help me with?',
  'Why are you called Alt?',
];

export const YASH_QUESTIONS: string[] = [
  "What are Yash's main skills?",
  'Tell me about a standout project.',
];
```

---

## 23. Resume PDF

Place your resume at `public/resume.pdf`.

The navigation links to it:

**File:** `src/app/components/Navigation.tsx`

```tsx
<a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
  Resume
</a>
```

---

## 24. PostHog Analytics

The portfolio uses [PostHog](https://posthog.com) for privacy-friendly analytics tracking. It runs in **cookieless mode** (no cookie banner required).

### What's tracked

| Event | Location | Properties |
|-------|----------|------------|
| `click` (button clicks) | Hero, Navigation, Projects, Writing, Contact | `label`, context-specific props |
| `chat_message_sent` | Chat | `messageLength` |
| `chat_suggestion_clicked` | Chat | `suggestion` |
| `project_click` | Projects | `title`, `type` |
| `form_submitted` / `form_success` / `form_error` | Contact | `form`, `error` (if applicable) |

### Setup

1. Sign up at [posthog.com](https://posthog.com) (generous free tier)
2. Create a project and get your API key
3. Add to `.env.local`:

```
VITE_POSTHOG_KEY=phc_your_key_here
VITE_POSTHOG_HOST=https://us.i.posthog.com
```

### Adding new tracking events

**File:** `src/lib/analytics.ts`

Use the helper functions:

```ts
import { trackClick, trackChat, trackProject, trackForm, trackEvent } from '@/lib/analytics';

// Button clicks
trackClick('button_name', { optional: 'properties' });

// Chat interactions
trackChat('message_sent', { messageLength: 50 });

// Project interactions
trackProject('click', 'Project Title', { type: 'agent' });

// Form tracking
trackForm('submitted', 'contact');
trackForm('success', 'contact');
trackForm('error', 'contact', { error: 'Network error' });

// Generic events
trackEvent('custom_event', { any: 'data' });
```

### Disabling analytics

Remove or comment out the `initAnalytics()` call in `src/main.tsx`:

```tsx
// import { initAnalytics } from '@/lib/analytics';
// initAnalytics();
```

### Privacy notes

- **Cookieless mode:** Uses `persistence: 'memory'` — no cookies stored
- **No PII collected:** Only anonymous interaction data
- **GDPR compliant:** No consent banner needed in cookieless mode

---

## Quick Reference: All Files You Need to Edit

| What to update | File |
|----------------|------|
| Name, role, headline, stats | `src/data/about.ts` |
| Bio paragraphs | `src/data/about.ts` — BIO_PARAGRAPHS |
| Proficiency bars | `src/data/about.ts` — PROFICIENCIES |
| Skill columns | `src/data/about.ts` — SKILL_COLUMNS |
| AI Agent projects | `src/data/projects.ts` — AGENT_PROJECTS |
| CV Showcase projects | `src/data/projects.ts` — SHOWCASE_PROJECTS |
| Highlights | `src/data/projects.ts` — HIGHLIGHTS |
| Videos | `src/data/writing.ts` — VIDEOS |
| Articles | `src/data/writing.ts` — ARTICLES |
| Work experience | `src/data/experience.ts` — EXPERIENCE |
| Contact links | `src/data/contact.ts` — CONTACT_LINKS |
| Chat suggestions | `src/data/chatContext.ts` |
| Navigation links | `src/app/components/Navigation.tsx` |
| Footer | `src/app/components/Footer.tsx` |
| Page title, SEO | `index.html` |
| Profile photo | `public/profile.webp` |
| Project videos | `public/videos/` |
| Resume | `public/resume.pdf` |
| Favicon | `public/logo.webp` |
| Social preview | `public/og-image.png` |
| Alt personality | `serverless/worker.js` — PERSONALITY_PROMPT |
| LLM model | `serverless/worker.js` — GROQ_MODEL |
| Analytics tracking | `src/lib/analytics.ts` |
| Analytics config | `.env.local` — VITE_POSTHOG_KEY, VITE_POSTHOG_HOST |

---

## File Structure

```
./
├── index.html              ← SEO meta tags, page title
├── .env.local              ← Environment variables (create this)
│
├── public/
│   ├── logo.webp           ← Favicon
│   ├── profile.webp        ← Profile photo
│   ├── resume.pdf          ← Resume PDF
│   ├── og-image.png        ← Social preview image
│   └── videos/             ← Project demo videos
│
├── serverless/
│   ├── worker.js           ← Cloudflare Worker (AI chat proxy)
│   └── wrangler.toml       ← Worker config
│
└── src/
    ├── data/               ← ** ALL PORTFOLIO DATA **
    │   ├── about.ts        ← Bio, proficiencies, skills, hero content
    │   ├── projects.ts     ← Agent projects, CV showcase, highlights
    │   ├── writing.ts      ← Videos and articles
    │   ├── experience.ts   ← Work history
    │   ├── contact.ts      ← Contact links
    │   └── chatContext.ts  ← AI chat config
    │
    ├── lib/
    │   └── analytics.ts    ← PostHog analytics helpers
    │
    └── app/
        ├── App.tsx         ← Root component
        └── components/
            ├── Navigation.tsx
            ├── Hero.tsx
            ├── Projects.tsx
            ├── About.tsx
            ├── Writing.tsx
            ├── Highlights.tsx
            ├── Experience.tsx
            ├── Skills.tsx
            ├── Contact.tsx
            ├── Chat.tsx
            └── Footer.tsx
```

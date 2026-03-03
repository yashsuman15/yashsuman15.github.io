# How to Personalize Your Portfolio

This guide walks you through every placeholder in the project and how to replace it with your real information. Follow the steps in order or jump to whichever section you need.

---

## Table of Contents

1. [Your Name & Brand](#1-your-name--brand)
2. [Page Title](#2-page-title)
3. [Nav Logo Image](#3-nav-logo-image)
4. [Hero Section](#4-hero-section)
5. [Profile Photo](#5-profile-photo)
6. [About Bio](#6-about-bio)
7. [Skill Bars (Augmentations)](#7-skill-bars-augmentations)
8. [Flagship Projects (Showcase)](#8-flagship-projects-showcase)
9. [Adding Project Videos](#9-adding-project-videos)
10. [Completed Gigs List](#10-completed-gigs-list)
11. [Skills Cards](#11-skills-cards)
12. [Work Experience](#12-work-experience)
13. [Contact Info & Social Links](#13-contact-info--social-links)
14. [Contact Form (Formspree)](#14-contact-form-formspree)
15. [Footer](#15-footer)
16. [Nav Link Targets](#16-nav-link-targets)
17. [Boot Intro (Optional)](#17-boot-intro-optional)
18. [SEO & Meta Tags](#18-seo--meta-tags)
19. [Favicon & Social Preview Image](#19-favicon--social-preview-image)
20. [Deploying Your Changes](#20-deploying-your-changes)
21. [AI Chat & Cloudflare Worker](#21-ai-chat--cloudflare-worker)
22. [Browser Back Button & Chat History](#22-browser-back-button--chat-history)
23. [Resume PDF](#23-resume-pdf)

---

## 1. Your Name & Brand

Your name/brand text appears in **2 files**. The navbar uses an image logo instead (see Section 3).

### A) The big glitch name on the hero

**File:** `src/app/components/Hero.tsx` — **Line 3**

```ts
// BEFORE
const NAME = 'VIKTOR.EX';

// AFTER (example)
const NAME = 'YASH.DEV';
```

This is the canvas-rendered glitch text visitors see first. Keep it short (under 12 chars looks best).

### B) The footer copyright + logo text

**File:** `src/app/components/Footer.tsx` — **Lines 5 and 7**

```tsx
// BEFORE
&copy; 2077 VIKTOR.EX // ALL RIGHTS RESERVED // NO CORPO AFFILIATION
...
<span className="footer-logo">V.EX</span>

// AFTER (example)
&copy; 2025 YASH SUMAN // ALL RIGHTS RESERVED
...
<span className="footer-logo">Y.ASH</span>
```

---

## 2. Page Title

**File:** `index.html` — **Line 6**

```html
<!-- BEFORE -->
<title>V.EX // AI ENGINEER // NIGHT CITY</title>

<!-- AFTER (example) -->
<title>Yash Suman // Full Stack Developer</title>
```

This is what shows in the browser tab and search results.

---

## 3. Nav Logo Image

The navbar logo is an image, not text. It currently loads from `public/logo.webp`.

**File:** `src/app/components/Navigation.tsx` — **Line 9**

```tsx
<img src="/logo.webp" alt="Logo" style={{ height: '32px' }} />
```

### To change the logo:

1. Replace the file `public/logo.webp` with your own logo image
2. Recommended format: WebP (best compression), PNG with transparent background, or SVG
3. Recommended size: at least 64px tall (it will be displayed at 32px height)
4. The image auto-scales to 32px height. To adjust the size, change the `height` value:

```tsx
// Make it bigger
style={{ height: '40px' }}

// Make it smaller
style={{ height: '24px' }}
```

### To switch to an SVG file:

1. Place your SVG in `public/logo.svg`
2. Update the src:

```tsx
<img src="/logo.svg" alt="Logo" style={{ height: '32px' }} />
```

### To switch back to text instead of an image:

Replace the `<img>` tag with text:

```tsx
<a href="#hero" className="nav-logo">
  Y<span>.</span>ASH
</a>
```

The `<span>` wraps whichever character you want in the pink accent color.

---

## 4. Hero Section

All hero content is in **`src/app/components/Hero.tsx`**.

### Tag line (Line 210)

```tsx
// BEFORE
NEURAL ARCHITECT // MACHINE LEARNING SPECIALIST

// AFTER (example)
FULL STACK DEVELOPER // OPEN SOURCE CONTRIBUTOR
```

### Job title (Line 215)

```tsx
// BEFORE
<div className="hero-title">AI ENGINEER</div>

// AFTER (example)
<div className="hero-title">WEB DEVELOPER</div>
```

### Description paragraph (Lines 216-220)

Replace the entire text between `<p className="hero-desc">` and `</p>` with your own bio summary.

### Stats (Lines 221-235)

There are 3 stat blocks. Update the numbers and labels:

```tsx
// BEFORE
<span className="stat-num">7+</span>
<span className="stat-label">YEARS JACKED IN</span>

// AFTER (example)
<span className="stat-num">3+</span>
<span className="stat-label">YEARS EXPERIENCE</span>
```

Repeat for all 3 stats (YEARS, MODELS DEPLOYED, NEURAL UPTIME).

### Terminal widget (Lines 258-277)

This is the small terminal box at the bottom-right of the hero. Update the profile name, status, and specialization text to match yours.

```tsx
// BEFORE
> load_profile "viktor_ex"
> specialization: AI/ML Engineering

// AFTER (example)
> load_profile "yash_suman"
> specialization: Full Stack / React / Node.js
```

### Side system info (Lines 247-256)

The LAT/LNG coordinates and system stats on the right side. Update to your location or any fun data.

---

## 5. Profile Photo

Your profile photo is already wired up. It loads from `public/profile.webp` with `loading="lazy"` (deferred loading for better performance since the image is below the fold).

**File:** `src/app/components/About.tsx` — **Lines 20-28**

```tsx
<img
  src="/profile.webp"
  alt="Profile"
  loading="lazy"
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }}
/>
```

### To change the photo:

Simply replace the file `public/profile.webp` with your own image. No code changes needed.

### Recommended image specs:
- **Aspect ratio:** 3:4 (portrait) works best with the frame
- **Minimum size:** 400x533px
- **Format:** WebP (best compression), PNG, or JPG
- The cyberpunk scan line animation and corner brackets overlay on top automatically

### To adjust the image display:

```tsx
// Add a color filter for cyberpunk vibe
style={{
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  filter: 'saturate(1.2) contrast(1.1)',
}}

// Reposition the crop (if face is cut off)
style={{
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center top',  // or 'center 30%' etc.
}}
```

### To use an external URL instead of a local file:

```tsx
<img
  src="https://your-image-hosting.com/photo.jpg"
  alt="Profile"
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>
```

### Update the label text (Line 74)

```tsx
// BEFORE
// IDENTITY_CONFIRMED :: NIGHT_CITY_2077

// AFTER (example)
// IDENTITY_CONFIRMED :: YASH_SUMAN_2025
```

---

## 6. About Bio

**File:** `src/data/about.ts` — `BIO_PARAGRAPHS` array

The bio paragraphs are stored in a shared data file. They render in the About section and are also auto-included in the AI chat context.

```ts
// Current values
export const BIO_PARAGRAPHS: string[] = [
  "Born from the digital sprawl of Night City, I've spent 7 years engineering artificial minds...",
  'I specialize in large language models, autonomous AI agents, and computer vision systems...',
  "Current fixers: Militech AI Division, Arasaka DataSec...",
];

// Example replacement
export const BIO_PARAGRAPHS: string[] = [
  "I'm a full stack developer with 3+ years building clean, performant web applications.",
  'I specialize in React, Node.js, and TypeScript — shipping features fast without sacrificing code quality.',
  'Currently freelancing for startups and open source projects.',
];
```

Also update `BIO_SUMMARY` in the same file — this is a condensed version used specifically in the AI chat prompt:

```ts
export const BIO_SUMMARY =
  '3+ years building full stack web applications with React, Node.js, and TypeScript.';
```

**Note:** `About.tsx` renders bio as plain text (no `<strong>` tags). If you need inline formatting, you can switch from `BIO_PARAGRAPHS.map()` to hardcoded JSX in `About.tsx`.

---

## 7. Skill Bars (Augmentations)

**File:** `src/data/about.ts` — `AUGMENTATIONS` array

The `AUGMENTATIONS` array controls the skill bars in the About section. It's stored in the shared data file so the AI chat also knows your core proficiencies.

```ts
// Current values
export const AUGMENTATIONS: Augmentation[] = [
  { name: 'Python / PyTorch', width: '97%', delay: '0s' },
  { name: 'Computer Vision', width: '91%', delay: '.2s' },
  { name: 'GEN AI', width: '94%', delay: '.4s' },
  { name: 'AI AGENTS', width: '88%', delay: '.6s' },
];

// Example replacement
export const AUGMENTATIONS: Augmentation[] = [
  { name: 'React / Next.js', width: '95%', delay: '0s' },
  { name: 'TypeScript / Node.js', width: '90%', delay: '.2s' },
  { name: 'Python / Django', width: '80%', delay: '.4s' },
  { name: 'AWS / Docker', width: '75%', delay: '.6s' },
];
```

- `name` — Skill name displayed next to the bar
- `width` — How full the bar is (percentage string, e.g., `'85%'`)
- `delay` — Staggered animation delay (keep as is, or adjust)

You can add or remove items. Just follow the same `{ name, width, delay }` format.

---

## 8. Flagship Projects (Showcase)

**File:** `src/data/projects.ts` — `SHOWCASE_PROJECTS` array

These are the large featured projects with video panes and detailed descriptions. The "// PROJECTS" nav link scrolls directly to this section.

Each project has:

```ts
{
  index: '// PROJECT_01',           // Display label
  title: 'NEUROMANCER-7',           // Project name (big text)
  subtitle: 'Autonomous LLM Agent', // One-line subtitle
  description: '340M parameter...',  // 2-3 sentence description
  insight: 'pushed detection...',    // Key achievement/result
  insightHighlight: 'Fine-tuning with adversarially generated red-team data',
                                     // Bold prefix for the insight
  tags: [                            // Tech tags shown below
    { label: 'PyTorch', color: 'yellow' },
    { label: 'LangChain', color: 'purple' },
    { label: 'CUDA Kernels', color: 'cyan' },
  ],
  videoSrc: '',                      // Path to demo video (see Section 9)
  social: {                           // Social platform stats (optional — one per project)
    platform: 'reddit',              // Platform key (see PLATFORM_CONFIG below)
    url: 'https://reddit.com/...',   // Link to the post (opens in new tab)
    metrics: [                        // Flexible stats array — you define what to show
      { icon: '▲', value: 342, label: 'upvotes' },
      { icon: '◉', value: 12400, label: 'views' },
      { icon: '↗', value: 28, label: 'shares' },
    ],
  },
  githubLink: '#',                   // URL to GitHub repo
}
```

### Social platform stats

Each project can optionally show engagement metrics from **any platform** via the `social` field. The field is optional — if omitted, the stats block won't be shown for that project. Each project supports one platform.

**Interfaces** (defined in `src/data/projects.ts`):

- **`SocialMetric`** — `{ icon: string, value: number, label: string }` — a single stat
- **`ProjectSocial`** — `{ platform: string, url: string, metrics: SocialMetric[] }` — the social block

**`PLATFORM_CONFIG`** (defined in `src/app/components/Showcase.tsx`) maps platform keys to brand colors and display labels:

| Platform key   | Color     | Display label  |
|----------------|-----------|----------------|
| `reddit`       | `#FF4500` | REDDIT         |
| `linkedin`     | `#0A66C2` | LINKEDIN       |
| `youtube`      | `#FF0000` | YOUTUBE        |
| `twitter`      | `#1DA1F2` | X              |
| `producthunt`  | `#DA552F` | PRODUCT HUNT   |

**To add a new platform**, add one line to `PLATFORM_CONFIG` in `Showcase.tsx`:

```ts
newplatform: { color: '#HEX', label: 'DISPLAY NAME' },
```

Then use that key in your project data. CSS uses `var(--social-color)` so styling works automatically.

**Example data entries for different platforms:**

```ts
// Reddit
social: {
  platform: 'reddit',
  url: 'https://reddit.com/r/...',
  metrics: [
    { icon: '▲', value: 342, label: 'upvotes' },
    { icon: '◉', value: 12400, label: 'views' },
    { icon: '↗', value: 28, label: 'shares' },
  ],
},

// LinkedIn
social: {
  platform: 'linkedin',
  url: 'https://linkedin.com/posts/...',
  metrics: [
    { icon: '👍', value: 89, label: 'reactions' },
    { icon: '💬', value: 14, label: 'comments' },
    { icon: '↗', value: 5, label: 'reposts' },
  ],
},

// YouTube
social: {
  platform: 'youtube',
  url: 'https://youtube.com/watch?v=...',
  metrics: [
    { icon: '▶', value: 5200, label: 'views' },
    { icon: '👍', value: 230, label: 'likes' },
    { icon: '💬', value: 41, label: 'comments' },
  ],
},

// Twitter / X
social: {
  platform: 'twitter',
  url: 'https://x.com/.../status/...',
  metrics: [
    { icon: '♥', value: 120, label: 'likes' },
    { icon: '↻', value: 34, label: 'reposts' },
    { icon: '◉', value: 8900, label: 'views' },
  ],
},

// Product Hunt
social: {
  platform: 'producthunt',
  url: 'https://producthunt.com/posts/...',
  metrics: [
    { icon: '▲', value: 156, label: 'upvotes' },
    { icon: '💬', value: 22, label: 'comments' },
  ],
},
```

- Numbers 1000+ are auto-formatted with K suffix (e.g., 12400 → "12.4K").
- Stats are static/hardcoded — update them periodically from each platform's analytics.
- To remove social stats from a project, delete the entire `social: { ... }` block from that project object.

### To update:

1. Open `src/data/projects.ts`
2. Replace each object in the `SHOWCASE_PROJECTS` array with your own projects
3. You can add more or remove projects — the layout adapts automatically
4. Tag colors must be one of: `'yellow'`, `'cyan'`, or `'purple'`

---

## 9. Adding Project Videos

Each showcase project has a video pane. When `videoSrc` is empty, a placeholder is shown with scanning lines and "DEMO FEED OFFLINE" text.

### To add a video:

1. Place your `.mp4` video file in the `public/` folder (e.g., `public/videos/project1.mp4`)
2. Update the `videoSrc` field in `src/data/projects.ts`:

```ts
// BEFORE
videoSrc: '',

// AFTER
videoSrc: '/videos/project1.mp4',
```

The video will:
- Autoplay (muted) when scrolled into view
- Pause when scrolled away
- Toggle play/pause on click
- Show a "LIVE DEMO" badge while playing

### Tips:
- Use landscape (16:9) videos for best fit
- Keep file sizes small (under 10MB recommended) for fast loading
- MP4 with H.264 codec works in all browsers

---

## 10. Completed Gigs List

**File:** `src/data/projects.ts` — `COMPLETED_GIGS` array

These are the simpler row-based project entries below the showcase.

```ts
{
  num: '01',                          // Row number
  name: 'NEUROMANCER-7',              // Project name
  description: 'Autonomous LLM...',   // One-line description
  tech: ['PyTorch', 'LangChain'],     // Tech pills shown on the right
}
```

Add, remove, or edit entries freely. The numbering is just a display string — set whatever you want.

---

## 11. Skills Cards

**File:** `src/data/skills.ts`

Six skill cards displayed in a 3-column grid. Each card:

```ts
{
  icon: '🧠',                        // Emoji icon (displayed large)
  name: 'LARGE LANGUAGE MODELS',      // Card title (yellow text)
  description: 'Architecting and...', // 1-2 sentence description
  tags: [                             // Small tag pills
    { label: 'GPT-4', color: 'cyan' },
    { label: 'LLaMA', color: 'yellow' },
    { label: 'RLHF', color: 'pink' },
  ],
}
```

- Tag colors must be one of: `'cyan'`, `'yellow'`, or `'pink'`
- You can have 4-6 cards (3-column grid works best with multiples of 3)
- Icons can be any emoji or text character

---

## 12. Work Experience

**File:** `src/data/experience.ts`

Timeline entries for your work history. Each entry:

```ts
{
  date: '2075 — PRESENT',            // Date range
  role: 'SENIOR AI ENGINEER',         // Job title
  company: '◈ MILITECH AI DIVISION // NIGHT CITY',  // Company name
  description: 'Led a 12-person...',  // What you did (2-3 sentences)
  dotColor: '#FCE300',                // Timeline dot color (hex)
  dotShadow: '0 0 16px rgba(252,227,0,0.6)',  // Glow effect
}
```

### Suggested dot colors:
- First/current job: `#FCE300` (yellow)
- Second job: `#00F5FF` (cyan)
- Third job: `#BD00FF` (purple)

You can add more entries or reduce to fewer. The timeline line adapts.

---

## 13. Contact Info & Social Links

**File:** `src/data/contact.ts` — `CONTACT_LINKS` array

Contact links are stored in a shared data file. They render in the Contact section and are also auto-included in the AI chat context (so Alt knows your real contact info).

```ts
export const CONTACT_LINKS: ContactLink[] = [
  {
    label: 'EMAIL',
    href: 'mailto:YOUR_EMAIL@gmail.com',
    displayText: 'YOUR_EMAIL@gmail.com',
    icon: '\u2709',      // envelope icon
  },
  {
    label: 'GITHUB',
    href: 'https://github.com/YOUR_USERNAME',
    displayText: 'github.com/YOUR_USERNAME',
    icon: '\u25C8',      // diamond icon
  },
  {
    label: 'LINKEDIN',
    href: 'https://www.linkedin.com/in/YOUR_USERNAME/',
    displayText: 'linkedin.com/in/YOUR_USERNAME',
    icon: '\u25C9',      // circle icon
  },
  {
    label: 'TWITTER/X',
    href: 'https://x.com/YOUR_HANDLE',
    displayText: '@YOUR_HANDLE',
    icon: '\u25C6',      // filled diamond icon
  },
];
```

All contact links open in a new tab (`target="_blank" rel="noopener noreferrer"`), so users don't navigate away from the portfolio.

### To remove a social link:

Delete the entire `{ label, href, displayText, icon }` object from the array.

### To add a new link:

Add a new object to the array. Use any Unicode character for the icon.

### Heading and description

The heading ("JACK IN & LET'S BUILD.") and description paragraph are still in `src/app/components/Contact.tsx` (lines 72-80). Edit those directly if you want different messaging.

---

## 14. Contact Form (Formspree)

The contact form uses [Formspree](https://formspree.io) to receive submissions. It sends form data via `fetch()` and shows success/error feedback with cyberpunk-styled status messages.

### Setup (required for the form to work):

1. Sign up at [formspree.io](https://formspree.io) (free tier: 50 submissions/month)
2. Create a new form — you'll get an endpoint URL like `https://formspree.io/f/xyzabc123`
3. Copy the form ID (the part after `/f/` — e.g., `xyzabc123`)
4. Create a `.env.local` file in the project root:

```
VITE_FORMSPREE_ID=xyzabc123
```

5. Restart the dev server (`npm run dev`) — Vite only reads env files at startup

### How it works:

**File:** `src/app/components/Contact.tsx`

- 3 controlled form fields: name, email, message
- Client-side validation (required fields + email format check)
- POST to Formspree API with JSON payload
- Visual states: idle → submitting (button disabled) → success (green) / error (red)
- Inputs are disabled during submission to prevent double-sends

### Testing locally:

Run `npm run dev`, fill in all fields, and submit. If the Formspree ID is not set, you'll see an error message telling you to configure it.

### For production:

The `.env.local` file is gitignored. For GitHub Actions deployment, you have two options:

**Option A — Hardcode the ID (simplest):**
Since the form ID is not a secret (it's visible in network requests anyway), you can hardcode it directly in `Contact.tsx`:

```tsx
// Replace this line:
const formspreeId = import.meta.env.VITE_FORMSPREE_ID;

// With:
const formspreeId = 'xyzabc123';
```

**Option B — Use GitHub Actions secrets:**
1. Go to your repo → Settings → Secrets → Actions → New secret
2. Add `VITE_FORMSPREE_ID` with your form ID
3. Update `.github/workflows/deploy.yml` build step:

```yaml
- name: Build
  run: npm run build
  env:
    VITE_FORMSPREE_ID: ${{ secrets.VITE_FORMSPREE_ID }}
```

### Formspree email notifications:

By default, Formspree sends submissions to the email you signed up with. You can configure:
- Custom notification email addresses
- Auto-response emails to the submitter
- Spam filtering rules
- All in the Formspree dashboard at [formspree.io](https://formspree.io)

---

## 15. Footer

**File:** `src/app/components/Footer.tsx`

Already covered in [Section 1B](#b-the-footer-copyright--logo-text). Just update:
- Copyright year and name (line 5)
- Logo text (line 7)

---

## 16. Nav Link Targets

**File:** `src/app/components/Navigation.tsx`

### Navigation structure

The nav bar has 4 main areas:

```
Desktop:  [logo]  [nav-links: ABOUT | SKILLS | PROJECTS | EXP | CONTACT]  [nav-actions: SEND PING | VIEW RESUME]  [hamburger (hidden)]  [WORKING status]
Mobile:   [logo]  [nav-actions: SEND PING | VIEW RESUME]  [hamburger]
```

- **`nav-links`** — Section links. On desktop they sit in the nav bar. On mobile, they move into a **sidebar** that slides in from the right when the hamburger is tapped. A dark backdrop overlay dims the page behind the sidebar; tapping it closes the menu.
- **`nav-actions`** — CTA buttons (SEND PING + VIEW RESUME). Always visible on both desktop and mobile. On mobile they are compact (smaller font/padding) to fit in the bar.
- **WORKING status** — Hidden on mobile (< 768px) to save bar space.

### Section links (Lines 12-16)

```tsx
<a href="#about">// ABOUT</a>         → About/Profile section
<a href="#skills">// SKILLS</a>       → Skills cards section
<a href="#showcase">// PROJECTS</a>   → Flagship projects with video demos
<a href="#experience">// EXP</a>      → Work history timeline
<a href="#contact">// CONTACT</a>     → Contact form & social links
```

The "// PROJECTS" link points to `#showcase` (the flagship demo section), not `#projects` (the completed gigs list). This means clicking PROJECTS in the nav takes you to the video demo showcase first.

### To change where a link scrolls to:

Just change the `href` value. Available section IDs:
- `#hero` — Hero/landing
- `#about` — About/profile
- `#showcase` — Flagship projects (video demos)
- `#skills` — Skills cards grid
- `#projects` — Completed gigs list
- `#experience` — Work history timeline
- `#contact` — Contact form

### To add or remove nav links:

```tsx
// Add a new link
<a href="#showcase">// DEMOS</a>

// Remove a link — just delete the <a> line
```

### CTA buttons (Lines 19-20)

The `nav-actions` div contains two CTA buttons:

```tsx
<div className="nav-actions">
  <a href="#contact" className="nav-cta">SEND PING</a>
  <a href="/resume.pdf" className="nav-cta" target="_blank" rel="noopener noreferrer">VIEW RESUME</a>
</div>
```

- **SEND PING** scrolls to the contact section
- **VIEW RESUME** opens `public/resume.pdf` in a new tab (see [Section 23](#23-resume-pdf))

To change button text or targets, edit these links directly.

### To change the status text (Line 33):

```tsx
// BEFORE
WORKING

// AFTER (example)
AVAILABLE FOR HIRE
```

### Mobile sidebar styling

The sidebar CSS is in `src/styles/cyberpunk.css` inside the `@media (max-width: 768px)` block. Key classes:
- `.nav-links` — The sidebar panel (280px width, slides from right)
- `.sidebar-backdrop` — Dark overlay behind the sidebar (click to close)
- `.nav-actions .nav-cta` — Compact button sizing for mobile bar

---

## 17. Boot Intro (Optional)

The boot sequence that plays on page load can be customized.

### Terminal log lines

**File:** `src/data/bootLines.ts`

Each line has:
```ts
{
  text: '[  OK  ]  Core tensor mesh online',  // Displayed text
  cls: 'ok',    // Color class: 'ok' (green), 'warn' (yellow), 'err' (red),
                //              'dim' (gray), 'head' (cyan), '' (default gray)
  delay: 530,   // Milliseconds before this line appears
}
```

Replace with your own boot messages. Keep delays ascending for proper sequencing.

### Dark AI quotes

**File:** `src/data/quotes.ts`

One random quote is shown during boot. Each quote:
```ts
{
  text: "The question is not whether machines will think...",
  author: "// ANONYMOUS NETRUNNER, 2071",
}
```

Replace with your favorite quotes, or keep them as-is for the cyberpunk vibe.

---

## 18. SEO & Meta Tags

**File:** `index.html`

All SEO meta tags are in `index.html` `<head>`. Update these to match your actual info:

### Meta description (Line 11)

```html
<!-- BEFORE -->
<meta name="description" content="AI Engineer specializing in machine learning, computer vision, and generative AI. Explore projects, skills, and experience." />

<!-- AFTER (example) -->
<meta name="description" content="Full stack developer building performant web apps with React, Node.js, and TypeScript." />
```

This is the text Google shows under your page title in search results. Keep it under 160 characters.

### Open Graph tags (Lines 29-34)

These control the preview card when your link is shared on LinkedIn, Facebook, etc. Update `og:title`, `og:description`, and `og:image`:

```html
<meta property="og:title" content="Your Name — Your Title" />
<meta property="og:description" content="Your description here." />
<meta property="og:image" content="https://yashsuman15.github.io/og-image.png" />
```

### Twitter Card tags (Lines 37-42)

Same as Open Graph but for Twitter/X. Update the same fields.

### Structured data / JSON-LD (Lines 45-55)

The JSON-LD block provides search engines with structured info about you. Update:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Your Name",
  "url": "https://yashsuman15.github.io",
  "jobTitle": "Your Job Title",
  "description": "Your description.",
  "sameAs": [
    "https://github.com/your-username",
    "https://linkedin.com/in/your-username",
    "https://x.com/your-handle"
  ]
}
```

The `sameAs` array links your social profiles for Google Knowledge Graph.

### Canonical URL (Line 14)

If you set up a custom domain later, update:

```html
<link rel="canonical" href="https://your-custom-domain.com/" />
```

---

## 19. Favicon & Social Preview Image

### Favicon

Currently using `public/logo.webp` as the favicon. To use a proper favicon:

1. Go to [realfavicongenerator.net](https://realfavicongenerator.net)
2. Upload your logo
3. Download the generated favicon package
4. Place the files in `public/` (favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, etc.)
5. Update the `<link>` tags in `index.html`:

```html
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

### Social preview image (OG Image)

When someone shares your link on social media, this image is displayed. To add one:

1. Create an image (recommended: 1200x630px, PNG or JPG)
2. Save it as `public/og-image.png`
3. The `og:image` and `twitter:image` meta tags already point to this path

**Tip:** Use a screenshot of your hero section or create a branded card with your name and title.

### Web manifest

**File:** `public/site.webmanifest`

Update the `name` and `short_name` fields if you change your branding. If you add properly sized icon files, update the `icons` array:

```json
"icons": [
  { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
  { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" }
]
```

### Sitemap

**File:** `public/sitemap.xml`

Update the `<lastmod>` date whenever you make significant content changes:

```xml
<lastmod>2026-03-15</lastmod>
```

---

## 20. Deploying Your Changes

### Preview locally

```bash
npm run dev
```

Open the URL shown in terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
```

This creates the `dist/` folder. If the build succeeds with no errors, you're good to push.

### Deploy

```bash
git add .
git commit -m "personalize portfolio with my info"
git push origin main
```

GitHub Actions will automatically build and deploy to your `yashsuman15.github.io` URL within 2-3 minutes.

---

## 21. AI Chat & Cloudflare Worker

The portfolio includes an AI chat feature powered by a Cyberpunk 2077 "Alt Cunningham" character. It uses a Cloudflare Worker that proxies requests to the Groq API (llama-3.3-70b-versatile).

### How the data flows

Portfolio data lives in `src/data/` files (the single source of truth). At build time, `chatContext.ts` auto-generates a `PORTFOLIO_CONTEXT` string from all data files. The frontend sends this context to the Cloudflare Worker alongside chat messages. The Worker combines it with Alt's hardcoded personality prompt and forwards everything to the Groq LLM.

```
src/data/projects.ts  ──┐
src/data/skills.ts     ──┤
src/data/experience.ts ──┼──> chatContext.ts: buildPortfolioContext()
src/data/about.ts      ──┤        │
src/data/contact.ts    ──┘        ▼
                          PORTFOLIO_CONTEXT (string)
                                  │
                      Chat.tsx sends in request body
                                  │
                                  ▼
                      worker.js: buildSystemPrompt()
                      = PERSONALITY_PROMPT + portfolioContext
                                  │
                                  ▼
                            Groq API (LLM)
```

**This means:** When you update projects, skills, experience, bio, or contact info in the data files, the AI chat automatically knows about the changes. No manual syncing needed. Just rebuild the frontend.

### Cloudflare Worker setup (one-time)

```bash
# 1. Install Wrangler CLI globally
npm install -g wrangler

# 2. Login to your Cloudflare account (opens browser)
wrangler login

# 3. Set your Groq API key as a secret
#    Get a free key at: https://console.groq.com/keys
cd serverless
wrangler secret put GROQ_API_KEY
# Paste your Groq API key when prompted

# 4. Deploy the worker
wrangler deploy
```

Wrangler reads `serverless/wrangler.toml` (worker name: `alt-chat-proxy`, entrypoint: `worker.js`) and deploys to Cloudflare's edge network.

After deployment, Wrangler outputs a URL like:
```
https://alt-chat-proxy.<your-subdomain>.workers.dev
```

### Connect frontend to the worker

Add the worker URL to your environment:

```bash
# .env.local (for local dev)
VITE_CHAT_API_URL=https://alt-chat-proxy.<your-subdomain>.workers.dev
```

For production (GitHub Actions), either hardcode the URL in `Chat.tsx` or add it as a GitHub Actions secret:

1. Go to your repo → Settings → Secrets → Actions → New secret
2. Add `VITE_CHAT_API_URL` with your worker URL
3. Update `.github/workflows/deploy.yml` build step:

```yaml
- name: Build
  run: npm run build
  env:
    VITE_CHAT_API_URL: ${{ secrets.VITE_CHAT_API_URL }}
```

### Redeploying the worker

After making changes to `serverless/worker.js`:

```bash
cd serverless
wrangler deploy
```

That's it. The worker deploys in seconds. Secrets (like `GROQ_API_KEY`) persist across deploys — you only set them once.

### Deployment order (when both frontend and worker change)

1. **Deploy frontend first** — `git push` to main triggers GitHub Actions
2. **Deploy worker second** — `wrangler deploy` from `serverless/`

This order is safest: the new frontend sends `portfolioContext` in the request body. If the old worker receives it, it simply ignores the extra field (no breakage). If the new worker goes live before the new frontend, old requests without `portfolioContext` get a graceful fallback.

### Customizing Alt's personality

Alt's personality, backstory, and philosophical views are hardcoded in `serverless/worker.js` (the `PERSONALITY_PROMPT` constant). These are character design, not portfolio data — they stay in the worker and don't need to change when you update portfolio content.

To modify Alt's character (voice, backstory, how she references Yash, etc.), edit the `PERSONALITY_PROMPT` string in `serverless/worker.js` and redeploy:

```bash
cd serverless
wrangler deploy
```

### Customizing chat suggestions

The suggested question buttons ("About Alt" / "About Yash") are in `src/data/chatContext.ts`:

```ts
export const ALT_QUESTIONS: string[] = [
  'What are you, Alt?',
  'What is consciousness to you?',
  // ...
];

export const YASH_QUESTIONS: string[] = [
  "What are Yash's core capabilities?",
  // ...
];
```

### Switching the LLM model

The model is set in `serverless/worker.js`:

```js
const GROQ_MODEL = 'llama-3.3-70b-versatile';
```

Groq offers several models. Check [console.groq.com](https://console.groq.com) for available options. After changing the model, redeploy: `cd serverless && wrangler deploy`.

### Worker configuration reference

**File:** `serverless/wrangler.toml`

```toml
name = "alt-chat-proxy"        # Worker name on Cloudflare
main = "worker.js"             # Entrypoint file
compatibility_date = "2024-01-01"
```

**Rate limiting:** The worker has built-in rate limiting (10 requests/minute/IP). This resets on worker restart. To adjust, edit `RATE_LIMIT_MAX` and `RATE_LIMIT_WINDOW` in `worker.js`.

**CORS:** Allowed origins are defined in the `ALLOWED_ORIGINS` array in `worker.js`. If you use a custom domain, add it there and redeploy.

---

## 22. Browser Back Button & Chat History

When a user opens the AI chat ("JACK INTO AI"), the app pushes a browser history entry. This enables two behaviors:

1. **Pressing the browser back button while in chat** triggers the full "CONNECTION SEVERED" disconnect animation and returns to the main portfolio page — without replaying the boot intro.
2. **Clicking the DISCONNECT button** (or pressing Escape) also plays the disconnect animation and cleans up the extra history entry automatically.

### How it works

**File:** `src/app/App.tsx`

- `openChat()` calls `window.history.pushState({ chat: true }, '')` when the chat opens
- A `popstate` event listener detects back-button presses and triggers the disconnect animation via the `triggerDisconnect` prop on `Chat`
- `handleManualClose()` (DISCONNECT button / Escape) calls `history.back()` to pop the extra entry, with an `ignoringPopstate` ref to prevent double-trigger
- The boot intro is **not replayed** because pressing back doesn't reload the page — React state (`bootComplete`) remains `true` in memory

**File:** `src/app/components/Chat.tsx`

- Accepts a `triggerDisconnect?: boolean` prop
- A `useEffect` watches this prop and calls the internal `handleDisconnect()` function when it becomes `true`
- This plays the full 1.35s disconnect animation, then calls `onClose()`

### Boot intro persistence

The boot intro uses in-memory React state. It plays once when the page first loads. It does **not** replay when:
- Pressing browser back from chat
- Closing the chat via DISCONNECT button
- Navigating via in-chat section links

It **does** replay when the page is fully refreshed/reloaded (browser refresh, new tab, etc.).

---

## 23. Resume PDF

The "VIEW RESUME" button in the navigation bar opens a PDF in a new tab.

### Setup

Place your resume PDF at `public/resume.pdf`. The button links to `/resume.pdf` with `target="_blank"`.

**File:** `src/app/components/Navigation.tsx` — **Line 20**

```tsx
<a href="/resume.pdf" className="nav-cta" target="_blank" rel="noopener noreferrer">VIEW RESUME</a>
```

### To update the resume

Simply replace `public/resume.pdf` with your updated file and redeploy. No code changes needed.

### To change the button text

Edit the link text in `Navigation.tsx` (appears twice — once in `nav-actions` for all screens, line 20):

```tsx
// BEFORE
VIEW RESUME

// AFTER (example)
VIEW CV
```

### To link to an external URL instead

```tsx
<a href="https://drive.google.com/your-resume-link" className="nav-cta" target="_blank" rel="noopener noreferrer">VIEW RESUME</a>
```

### To remove the button entirely

Delete the `<a href="/resume.pdf" ...>VIEW RESUME</a>` line from `Navigation.tsx` (line 20).

---

## Quick Reference: All Files You Need to Edit

| What to update | File | How |
|---|---|---|
| Glitch name | `src/app/components/Hero.tsx` line 3 | Change the `NAME` constant |
| Nav logo | `public/logo.webp` | Replace the image file |
| Nav logo size | `src/app/components/Navigation.tsx` line 9 | Change `height` value |
| Nav section links | `src/app/components/Navigation.tsx` lines 12-16 | Change `href` values |
| Nav CTA buttons | `src/app/components/Navigation.tsx` lines 19-20 | Change text/href |
| Nav status text | `src/app/components/Navigation.tsx` line 33 | Change text |
| Resume PDF | `public/resume.pdf` | Replace file (linked from VIEW RESUME button) |
| Hero tag, title, desc, stats | `src/app/components/Hero.tsx` lines 209-235 | Edit text directly |
| Hero terminal widget | `src/app/components/Hero.tsx` lines 258-277 | Edit text directly |
| Profile photo | `public/profile.webp` | Replace the image file |
| Profile photo display | `src/app/components/About.tsx` | Adjust style/objectFit |
| About bio paragraphs | `src/data/about.ts` — BIO_PARAGRAPHS | Edit the array (auto-syncs to AI chat) |
| Bio summary (chat) | `src/data/about.ts` — BIO_SUMMARY | Edit the string |
| Skill bars | `src/data/about.ts` — AUGMENTATIONS | Edit the array (auto-syncs to AI chat) |
| Engineer identity | `src/data/about.ts` — ENGINEER_NAME, ROLES | Edit the constants |
| Hero stats | `src/data/about.ts` — HERO_STATS | Edit the array |
| Showcase projects | `src/data/projects.ts` — SHOWCASE_PROJECTS | Edit the array (auto-syncs to AI chat) |
| Social platform stats | `src/data/projects.ts` — `social` field per project + `Showcase.tsx` PLATFORM_CONFIG | Set platform, url, metrics array (or omit field). Add new platforms to PLATFORM_CONFIG |
| Project demo videos | `public/videos/` + `src/data/projects.ts` | Add files, set videoSrc |
| Completed gigs | `src/data/projects.ts` — COMPLETED_GIGS | Edit the array (auto-syncs to AI chat) |
| Skills cards | `src/data/skills.ts` | Edit the SKILLS array (auto-syncs to AI chat) |
| Work experience | `src/data/experience.ts` | Edit the EXPERIENCE array (auto-syncs to AI chat) |
| Contact links | `src/data/contact.ts` — CONTACT_LINKS | Edit the array (auto-syncs to AI chat) |
| Contact form backend | `.env.local` | Set `VITE_FORMSPREE_ID` (see Section 14) |
| Footer copyright | `src/app/components/Footer.tsx` lines 5, 7 | Edit text |
| Page title | `index.html` line 8 | Edit `<title>` tag |
| SEO description | `index.html` line 11 | Edit `<meta name="description">` |
| Open Graph tags | `index.html` lines 29-34 | Edit og:title, og:description |
| Social preview image | `public/og-image.png` | Replace file (1200x630px) |
| Favicon | `public/logo.webp` | Replace file (or add proper favicon set) |
| JSON-LD structured data | `index.html` lines 45-55 | Edit person schema |
| Sitemap last modified | `public/sitemap.xml` | Update `<lastmod>` date |
| Boot log lines | `src/data/bootLines.ts` | Edit the BOOT_LINES array |
| Boot quotes | `src/data/quotes.ts` | Edit the DARK_AI_QUOTES array |
| AI chat suggestions | `src/data/chatContext.ts` — ALT/YASH_QUESTIONS | Edit the arrays |
| Alt's personality | `serverless/worker.js` — PERSONALITY_PROMPT | Edit + redeploy worker |
| LLM model | `serverless/worker.js` — GROQ_MODEL | Change model + redeploy |
| Worker CORS origins | `serverless/worker.js` — ALLOWED_ORIGINS | Add your domain + redeploy |

---

## File Structure: Where Everything Lives

```
./
├── .env.example          ← Template for environment variables
├── .env.local            ← Your local env vars (gitignored, create this)
├── .gitignore            ← Git ignore rules
├── index.html            ← SEO meta tags, favicon, JSON-LD, page title
│
├── public/
│   ├── logo.webp         ← Nav logo + favicon image (replace this file)
│   ├── profile.webp      ← Profile photo, lazy-loaded (replace this file)
│   ├── resume.pdf        ← Resume PDF, opened by VIEW RESUME button (add this file)
│   ├── og-image.png      ← Social preview image (add this, 1200x630px)
│   ├── robots.txt        ← Search engine crawl rules
│   ├── sitemap.xml       ← Sitemap for SEO
│   ├── site.webmanifest  ← PWA manifest (uses WebP icon)
│   └── videos/           ← Project demo videos (add .mp4 files)
│
├── serverless/
│   ├── worker.js         ← Cloudflare Worker — AI chat proxy to Groq API
│   └── wrangler.toml     ← Worker deployment config
│
└── src/
    ├── data/                    ← ** SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO DATA **
    │   ├── about.ts             ← Bio, augmentations, hero stats, identity (auto-syncs to AI chat)
    │   ├── contact.ts           ← Contact links with real values (auto-syncs to AI chat)
    │   ├── projects.ts          ← Showcase projects + completed gigs (auto-syncs to AI chat)
    │   ├── skills.ts            ← Skills cards data (auto-syncs to AI chat)
    │   ├── experience.ts        ← Work history timeline entries (auto-syncs to AI chat)
    │   ├── chatContext.ts       ← AI chat: auto-generated context + Alt's questions + section map
    │   ├── bootLines.ts         ← Boot intro terminal log messages
    │   └── quotes.ts            ← Boot intro dark AI quotes
    └── app/
        ├── App.tsx              ← Root component: boot intro, chat open/close, browser history management
        └── components/
            ├── Navigation.tsx   ← Nav logo, section links, CTA buttons (SEND PING + VIEW RESUME), sidebar menu, status
            ├── Hero.tsx         ← Glitch name, tag, title, stats, terminal
            ├── About.tsx        ← Imports bio + augmentations from data/about.ts
            ├── Contact.tsx      ← Imports links from data/contact.ts, Formspree form
            ├── Chat.tsx         ← AI chat UI, sends portfolioContext to worker, supports external disconnect trigger
            ├── HologramAvatar.tsx ← 3D holographic avatar (Three.js, lazy-loaded)
            └── Footer.tsx       ← Copyright text, logo text
```

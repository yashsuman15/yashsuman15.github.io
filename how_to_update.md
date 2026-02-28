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

The navbar logo is an image, not text. It currently loads from `public/logo.png`.

**File:** `src/app/components/Navigation.tsx` — **Line 5**

```tsx
<img src="/logo.png" alt="Logo" style={{ height: '32px' }} />
```

### To change the logo:

1. Replace the file `public/logo.png` with your own logo image
2. Recommended format: PNG with transparent background, or SVG
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

Your profile photo is already wired up. It loads from `public/profile.png`.

**File:** `src/app/components/About.tsx` — **Lines 56-64**

```tsx
<img
  src="/profile.png"
  alt="Profile"
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }}
/>
```

### To change the photo:

Simply replace the file `public/profile.png` with your own image. No code changes needed.

### Recommended image specs:
- **Aspect ratio:** 3:4 (portrait) works best with the frame
- **Minimum size:** 400x533px
- **Format:** PNG or JPG
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

**File:** `src/app/components/About.tsx` — **Lines 18-34**

There are 3 `<p>` paragraphs. Replace the text inside each one. Words wrapped in `<strong>` tags appear highlighted in yellow.

```tsx
// BEFORE
<p>
  Born from the digital sprawl of Night City, I've spent{' '}
  <strong>7 years</strong> engineering artificial minds...
</p>

// AFTER (example)
<p>
  I'm a <strong>full stack developer</strong> with a passion for
  building clean, performant web applications. I've been coding
  for <strong>3+ years</strong> and love open source.
</p>
```

---

## 7. Skill Bars (Augmentations)

**File:** `src/app/components/About.tsx` — **Lines 1-6**

The `AUGMENTATIONS` array controls the skill bars in the About section.

```ts
// Current values
const AUGMENTATIONS = [
  { name: 'Python / PyTorch', width: '97%', delay: '0s' },
  { name: 'Computer Vision', width: '91%', delay: '.2s' },
  { name: 'GEN AI', width: '94%', delay: '.4s' },
  { name: 'AI AGENTS', width: '88%', delay: '.6s' },
];

// Example replacement
const AUGMENTATIONS = [
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
  caseLink: '#',                     // URL to case study or live demo
  githubLink: '#',                   // URL to GitHub repo
}
```

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

**File:** `src/app/components/Contact.tsx`

### Social links (Lines 22-41)

Update the `href` and display text for each link:

```tsx
// EMAIL — Line 22
<a href="mailto:YOUR_EMAIL@gmail.com" className="contact-link">
  <span className="contact-link-text">YOUR_EMAIL@gmail.com</span>

// GITHUB — Lines 27-29
<a href="https://github.com/YOUR_USERNAME" className="contact-link">
  <span className="contact-link-text">github.com/YOUR_USERNAME</span>

// LINKEDIN — Lines 32-34
<a href="https://linkedin.com/in/YOUR_USERNAME" className="contact-link">
  <span className="contact-link-text">linkedin.com/in/YOUR_USERNAME</span>

// TWITTER/X — Lines 37-39
<a href="https://x.com/YOUR_HANDLE" className="contact-link">
  <span className="contact-link-text">@YOUR_HANDLE</span>
```

### Heading and description (Lines 12-20)

Replace the heading text and description paragraph with your own messaging.

### To remove a social link:

Simply delete the entire `<a className="contact-link">...</a>` block for that platform.

### To add a new link:

Copy one of the existing `<a>` blocks and change the icon, text, label, and href.

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

**File:** `src/app/components/Navigation.tsx` — **Lines 7-12**

The navigation links scroll to different sections of the page. Current mapping:

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

### To change the status text (Line 16):

```tsx
// BEFORE
WORKING

// AFTER (example)
AVAILABLE FOR HIRE
```

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

Currently using `public/logo.png` as the favicon. To use a proper favicon:

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

## Quick Reference: All Files You Need to Edit

| What to update | File | How |
|---|---|---|
| Glitch name | `src/app/components/Hero.tsx` line 3 | Change the `NAME` constant |
| Nav logo | `public/logo.png` | Replace the image file |
| Nav logo size | `src/app/components/Navigation.tsx` line 5 | Change `height` value |
| Nav link targets | `src/app/components/Navigation.tsx` lines 8-12 | Change `href` values |
| Nav status text | `src/app/components/Navigation.tsx` line 16 | Change text |
| Hero tag, title, desc, stats | `src/app/components/Hero.tsx` lines 209-235 | Edit text directly |
| Hero terminal widget | `src/app/components/Hero.tsx` lines 258-277 | Edit text directly |
| Profile photo | `public/profile.png` | Replace the image file |
| Profile photo display | `src/app/components/About.tsx` lines 56-64 | Adjust style/objectFit |
| About bio paragraphs | `src/app/components/About.tsx` lines 18-34 | Edit text directly |
| Skill bars | `src/app/components/About.tsx` lines 1-6 | Edit the AUGMENTATIONS array |
| Showcase projects | `src/data/projects.ts` — SHOWCASE_PROJECTS | Edit the array |
| Project demo videos | `public/videos/` + `src/data/projects.ts` | Add files, set videoSrc |
| Completed gigs | `src/data/projects.ts` — COMPLETED_GIGS | Edit the array |
| Skills cards | `src/data/skills.ts` | Edit the SKILLS array |
| Work experience | `src/data/experience.ts` | Edit the EXPERIENCE array |
| Contact links | `src/app/components/Contact.tsx` lines 83-103 | Edit href and text |
| Contact form backend | `.env.local` | Set `VITE_FORMSPREE_ID` (see Section 14) |
| Footer copyright | `src/app/components/Footer.tsx` lines 5, 7 | Edit text |
| Page title | `index.html` line 8 | Edit `<title>` tag |
| SEO description | `index.html` line 11 | Edit `<meta name="description">` |
| Open Graph tags | `index.html` lines 29-34 | Edit og:title, og:description |
| Social preview image | `public/og-image.png` | Replace file (1200x630px) |
| Favicon | `public/logo.png` | Replace file (or add proper favicon set) |
| JSON-LD structured data | `index.html` lines 45-55 | Edit person schema |
| Sitemap last modified | `public/sitemap.xml` | Update `<lastmod>` date |
| Boot log lines | `src/data/bootLines.ts` | Edit the BOOT_LINES array |
| Boot quotes | `src/data/quotes.ts` | Edit the DARK_AI_QUOTES array |

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
│   ├── logo.png          ← Nav logo + favicon image (replace this file)
│   ├── profile.png       ← Profile photo (replace this file)
│   ├── og-image.png      ← Social preview image (add this, 1200x630px)
│   ├── robots.txt        ← Search engine crawl rules
│   ├── sitemap.xml       ← Sitemap for SEO
│   ├── site.webmanifest  ← PWA manifest
│   └── videos/           ← Project demo videos (create this folder, add .mp4 files)
│
└── src/
    ├── data/
    │   ├── bootLines.ts  ← Boot intro terminal log messages
    │   ├── quotes.ts     ← Boot intro dark AI quotes
    │   ├── projects.ts   ← Showcase projects + completed gigs
    │   ├── skills.ts     ← Skills cards data
    │   └── experience.ts ← Work history timeline entries
    └── app/
        └── components/
            ├── Navigation.tsx ← Nav logo, links, status text
            ├── Hero.tsx       ← Glitch name, tag, title, stats, terminal
            ├── About.tsx      ← Bio text, skill bars, photo display
            ├── Contact.tsx    ← Social links, contact form (Formspree), heading
            └── Footer.tsx     ← Copyright text, logo text
```

# TASKS.md — Kangaroo Logistics
> Claude writes task specs here. OpenCode executes them in order.

---

## Status Tracker
- [x] Repo cloned locally
- [x] npm install done
- [x] npm run dev working
- [x] CLAUDE.md placed in project root
- [x] TASKS.md placed in project root
- [x] TASK-001 executed — Partners: "Coming Soon" UI
- [x] TASK-002 executed — Hero Track Shipment + CTA Register buttons wired
- [x] TASK-003 executed (partial) — WhatsApp + Facebook + Instagram + TikTok wired into Footer; fake phone/email removed; CTA section rebuilt with two buttons (Register / Login); Footer restructured into 4 columns with WhatsApp display. Phone & email still pending from company.
- [~] TASK-004 — SEO / favicon / og:image meta tags  **(skipped for now — current meta info is sufficient; favicon replaced separately, see commit d06438f)**
- [~] TASK-005 — WhatsApp floating chat button  **(skipped — will be replaced by a custom n8n chatbot widget later)**
- [x] TASK-006 executed — Tajawal swapped in as primary Arabic font; Cairo retained as fallback (commit c8eddac)
- [x] TASK-007 executed — Sticky-stack services section: 5 cards with progressive sticky tops (120/140/160/180/200px) and growing heights (+20px each), sticky pill column (٠١-٠٥ AR / 01-05 EN) with IntersectionObserver-driven active state, flat list on mobile (commits 1627187, e056337)
- [x] TASK-008 executed — Stats marquee strip mounted between CTASection and Footer, reuses existing animate-marquee keyframe, items localized AR/EN (commit 6aa93a2)

## Extra work completed (outside numbered tasks)
- [x] URL fix — corrected Olivery `register` and `track` URLs to real Olivery paths
- [x] Design pass — Archivo + JetBrains Mono fonts, warmer ivory palette, mono numerals, sharper card edges, route-accent hover ("cargo-manifest" aesthetic)
- [x] A11y polish — `aria-hidden="true"` on decorative icons; `decoding="async"` + `fetchpriority="high"` on hero LCP image (lowercase to silence React warning)
- [x] Services card visual upgrade — corner-bracket frames, circular numbered badge, gradient icon tile (ported from a discarded second design variant)
- [x] Retired the experimental `/new-design` industrial route — deleted `IndexNew`, `industrial/` folder, `variant="industrial"` props on Navbar/ChatWidget, industrial color tokens and Bebas Neue / Playfair Display fonts in `tailwind.config.ts`
- [x] Hero RTL fix — removed hardcoded `dir="rtl"`, swapped `ms-auto` → `me-auto`, dropped `sm:flex-row-reverse`, replaced `text-right` with `text-start`; Hero content now anchors to logical start (right in RTL, left in LTR) and the Primary CTA is rightmost in RTL
- [x] CTA contrast bug fix — `gradient-hero` + `hero-pattern` were both using the CSS `background` shorthand and clobbering each other, leaving the section near-transparent on the cream page; switched to `gradient-cta` and dropped the pattern overlay
- [x] RTL/LTR numerals + arrow polish — Services pill numbers now switch between Arabic-Indic (٠١-٠٥) and Western (01-05) digits via `dir`; card CTA arrow flips between ArrowLeft (RTL) and ArrowRight (LTR) via inline conditional (commit e056337)

---

## TASK-001 — Fix Partners Section

**Priority:** Critical
**OpenCode mode:** Edit single file

```
TASK: TASK-001 Fix Partners Section
FILE: src/components/site/Partners.tsx

GOAL:
Replace the 8 fake placeholder names (AURA, NOVA, ORBIT, PEAK, ZENITH, PULSE, ATLAS, ECHO)
with a professional "Coming Soon" UI that doesn't look like placeholder content.

DETAILS:
- Keep the same grid layout: 2 columns on mobile, 4 columns on desktop
- Each box should show: a Building2 icon from lucide-react + text "Coming Soon"
- Add a subtle dashed border style instead of solid to signal "in progress"
- Keep the hover animation that's already there
- Use t.partners from the existing translations for section title/subtitle
- The "Coming Soon" text can be hardcoded as it is temporary

RULES:
- Edit src/components/site/Partners.tsx ONLY
- Do not touch translations.ts
- Do not touch any other file
- No TypeScript any or ts-ignore
- Tailwind classes only, no inline styles

EXPECTED OUTPUT:
Diff only — do not rewrite the entire file
```

---

## TASK-002 — Connect Olivery Links

**Priority:** Critical
**OpenCode mode:** Edit two files

```
TASK: TASK-002 Connect Olivery Buttons
FILES:
  - src/components/site/Hero.tsx
  - src/components/site/CTASection.tsx

GOAL:
Connect the main call-to-action buttons to real Olivery URLs.

In Hero.tsx:
- Keep ctaPrimary button (Contact Us / تواصل معنا) pointing to #contact (no change)
- Add a third button: "Track Shipment" / "تتبع شحنتك" → https://kangaroo-pal.olivery.io/ar_SY/order_tracking
- New button style: outline variant, same size as existing buttons

In CTASection.tsx:
- Update "Get Started" / "ابدأ الآن" button → https://kangaroo-pal.olivery.io/ar_SY/olivery/sign_up/form

In translations.ts:
- Add hero.ctaTrack key:
  ar: "تتبع شحنتك"
  en: "Track Shipment"

RULES:
- All external links must have: target="_blank" rel="noopener noreferrer"
- Preserve RTL layout in Hero (button order matters in Arabic)
- TypeScript strict — no any
- Use existing Button component from shadcn

EXPECTED OUTPUT:
Diff for all three files
```

---

## TASK-003 — Update Real Contact Information

**Priority:** Critical
**OpenCode mode:** Edit two files
**Status:** Phone/email still pending from company. WhatsApp + socials available.

```
TASK: TASK-003 Wire Real Social & WhatsApp Info into Footer
FILES:
  - src/i18n/translations.ts
  - src/components/site/Footer.tsx

GOAL:
Replace placeholder contact info in the footer with real values where available.
Where values are still missing (phone, email), remove the fake placeholders so
nothing inaccurate is displayed until real values arrive.

Real values to use:
  whatsappUrl:   "https://wa.me/972593150120"
  facebookUrl:   "http://www.facebook.com/prokangaroo"
  instagramUrl:  "https://www.instagram.com/prokangaroo"
  (phone: pending)
  (email: pending)

In translations.ts:
- Under footer for both AR and EN, add three new keys:
    whatsappUrl, facebookUrl, instagramUrl
- Do not remove any existing keys

In Footer.tsx:
- Replace the Facebook/Instagram/LinkedIn icon block (which currently maps
  over icons with href="#") with explicit anchors for Facebook and Instagram
  only, using t.footer.facebookUrl and t.footer.instagramUrl. Drop LinkedIn
  since no real URL is available.
- Add a WhatsApp icon link (lucide MessageCircle) pointing to t.footer.whatsappUrl.
- All external links must have target="_blank" rel="noopener noreferrer".
- Remove the two hardcoded <li> lines that show the fake phone (+970 2 000 0000)
  and fake email (hello@kangaroo.ps). Keep the address line.

RULES:
- All Olivery/social/WhatsApp links: target="_blank" rel="noopener noreferrer"
- TypeScript strict, no any
- Tailwind only, no inline styles
- Do not touch src/components/ui/

EXPECTED OUTPUT:
Diff for both files
```

---

## TASK-004 — Add SEO Meta Tags

**Priority:** Important
**OpenCode mode:** Edit single file

```
TASK: TASK-004 Add SEO and Open Graph Meta Tags
FILE: index.html

GOAL:
Add missing SEO and social sharing meta tags to the <head> section.

Add the following (do not duplicate any existing tags):
  <link rel="icon" type="image/png" href="/src/assets/kangaroo-logo.png" />
  <meta name="description" content="حلول لوجستية مخصصة وذكية في فلسطين والأردن | Smart logistics solutions in Palestine & Jordan" />
  <meta property="og:title" content="Kangaroo كنغارو — الشريك اللوجستي الأول" />
  <meta property="og:description" content="حلول لوجستية مخصصة وذكية في فلسطين والأردن" />
  <meta property="og:image" content="/src/assets/kangaroo-logo.png" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="ar_PS" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Kangaroo كنغارو — الشريك اللوجستي الأول" />
  <meta name="twitter:description" content="Smart logistics solutions in Palestine & Jordan" />

RULES:
- Edit index.html ONLY
- Keep all existing tags intact
- Only add what is missing
- Place new tags inside <head>, after existing meta tags

EXPECTED OUTPUT:
Diff showing the added lines in <head>
```

---

## TASK-005 — Implement WhatsApp Chat Button

**Priority:** Important
**OpenCode mode:** Full rewrite of one file
**BLOCKED:** Need real WhatsApp number from TASK-003 first

```
TASK: TASK-005 Implement WhatsApp Chat Button
FILE: src/components/site/ChatWidget.tsx

GOAL:
Replace the current empty ChatWidget with a real WhatsApp floating button.

Requirements:
- Fixed position: bottom-6, left-6 (flips to right-6 in RTL)
- Round green button (bg-green-500 hover:bg-green-600)
- Use MessageCircle icon from lucide-react
- On click: open https://wa.me/970XXXXXXXXX in new tab (use whatsappUrl from translations)
- Add a small tooltip on hover: "Chat on WhatsApp" / "تواصل على واتساب"
- Add a subtle pulse animation to draw attention
- Button size: w-14 h-14

RULES:
- Edit src/components/site/ChatWidget.tsx ONLY
- Get WhatsApp URL from translations.ts (t.footer.whatsappUrl or similar key)
- Use useLang() hook for direction and translations
- Tailwind only
- TypeScript strict

EXPECTED OUTPUT:
Full file content (this is a complete rewrite)
```

---

## TASK-006 — Switch Arabic UI font to Tajawal

**Priority:** Important
**OpenCode mode:** Edit two files
**Source:** SMSA Express uses Tajawal — currently we use Cairo

```
TASK: TASK-006 Switch to Tajawal font

GOAL:
Replace Cairo with Tajawal as the primary Arabic font across the site,
matching the SMSA Express look. Keep Archivo for Latin/English. The
goal is a more SMSA-style modern logistics feel, not a full type system
overhaul.

FILES (planned):
  - index.html              (add Google Fonts <link> for Tajawal weights)
  - tailwind.config.ts      (swap "Cairo" → "Tajawal" in fontFamily.sans
                             and any other place Cairo is referenced)

NOTES:
- Tajawal has weights 200, 300, 400, 500, 700, 800, 900. Pull the same
  weight set Cairo currently uses (check tailwind.config.ts).
- Verify visual change in Chrome RTL + LTR — Tajawal renders Latin too,
  but we keep Archivo as the display font for English headings.
- Don't touch translations.ts — purely a font swap.

EXPECTED OUTPUT:
Diff for both files + a screenshot comparison.
```

---

## TASK-007 — Sticky-stack services section

**Priority:** Nice-to-have
**Source:** SMSA Express scroll pattern — service cards stack with the
heading sticking on scroll, creating a sense of progression.

```
TASK: TASK-007 Sticky-stack services section

GOAL:
Reshape the Services section so the section heading (h2 + subtitle)
stays visible at the top while the service cards scroll past or stack
underneath. Should preserve all current cards and translations.

FILE: src/components/site/Services.tsx (plus minor CSS if needed)

OPEN QUESTIONS for spec time:
- Sticky heading only, or do cards also stick one-by-one in a stack
  reveal pattern? (Decide by reviewing SMSA reference live.)
- How does the section coexist with the existing scroll-in fade? May
  need to remove the use-in-view fade on this section since stickiness
  conflicts visually.

EXPECTED OUTPUT:
Diff + screencast / screenshots of the scroll behaviour.
```

---

## TASK-008 — Stats marquee strip

**Priority:** Nice-to-have
**Source:** Common SMSA-style band — a thin strip of key numbers
auto-scrolling horizontally.

```
TASK: TASK-008 Stats marquee strip

GOAL:
Add a slim horizontal strip somewhere between Hero and Services (or
between WhyUs and Coverage — pick at spec time) that scrolls headline
stats sideways in a loop. Should reuse the existing animate-marquee
keyframe already defined in src/index.css line ~208.

CONTENT (planned, finalise at spec time):
- "+15 مدينة مغطاة"
- "24/7 دعم متواصل"
- "98% توصيل في الوقت"
- "4 فروع نشطة"
- (repeat to fill the strip)

FILE: new component, e.g. src/components/site/StatsMarquee.tsx, mounted
in src/pages/Index.tsx between two sections.

RULES at spec time:
- Translations in src/i18n/translations.ts (new key block)
- Marquee direction respects dir (RTL vs LTR)
- pause-on-hover
- No new packages — use the existing animate-marquee keyframe

EXPECTED OUTPUT:
New file + Index.tsx insertion + translations diff.
```

---

## How to Use This File

1. Open Claude and say: "Let's work on TASK-001"
2. Claude gives you the full task block ready to copy
3. Paste it into OpenCode and run it
4. Paste the result (diff or error) back to Claude
5. Claude reviews and you move to the next task

## After Each Task
```bash
npm run build        # check for TypeScript errors
npm run dev          # visual check in browser
git add -A
git commit -m "task: [task name and number]"
git push
```

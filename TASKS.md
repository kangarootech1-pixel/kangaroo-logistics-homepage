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
- [x] TASK-003 executed (partial) — WhatsApp + Facebook + Instagram wired into Footer; fake phone/email removed. Phone & email still pending from company
- [ ] TASK-004 executed — SEO / favicon / og:image meta tags
- [ ] TASK-005 executed — WhatsApp floating chat button

## Extra work completed (outside numbered tasks)
- [x] URL fix — corrected Olivery `register` and `track` URLs to real Olivery paths
- [x] Design pass — Archivo + JetBrains Mono fonts, warmer ivory palette, mono numerals, sharper card edges, route-accent hover ("cargo-manifest" aesthetic)
- [x] A11y polish — `aria-hidden="true"` on decorative icons; `decoding="async"` + `fetchPriority="high"` on hero LCP image

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

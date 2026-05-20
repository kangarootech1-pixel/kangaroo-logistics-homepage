# TASKS.md — Kangaroo Logistics
> Claude writes task specs here. OpenCode executes them in order.

---

## Status Tracker
- [x] ✅ Repo cloned locally
- [x] ✅ npm install done
- [x] ✅ npm run dev working
- [x] ✅ CLAUDE.md placed in project root
- [x] ✅ TASKS.md placed in project root
- [x] ✅ TASK-001 — Partners: "Coming Soon" UI
- [x] ✅ TASK-002 — Hero Track Shipment + CTA Register buttons wired
- [x] ✅ TASK-003 (partial) — WhatsApp + Facebook + Instagram + TikTok wired into Footer; fake phone/email removed; CTA section rebuilt with two buttons (Register / Login); Footer restructured into 4 columns with WhatsApp display. Phone & email still pending from company.
- [~] TASK-004 — SEO / favicon / og:image meta tags  **(skipped earlier — see TASK-019 below for revival)**
- [~] TASK-005 — WhatsApp floating chat button  **(skipped — replaced by n8n chatbot, see TASK-016)**
- [x] ✅ TASK-006 — Tajawal swapped in as primary Arabic font; Cairo retained as fallback (commit c8eddac)
- [x] ✅ TASK-007 — Sticky-stack services section: 5 cards with progressive sticky tops (120/140/160/180/200px) and growing heights (+20px each), sticky pill column (٠١-٠٥ AR / 01-05 EN) with IntersectionObserver-driven active state, flat list on mobile (commits 1627187, e056337)
- [x] ✅ TASK-008 — Stats marquee strip mounted between CTASection and Footer, reuses existing animate-marquee keyframe, items localized AR/EN (commit 6aa93a2)
- [ ] 🔄 TASK-016 — n8n chatbot widget — **in progress** (response shape issue pending). Widget UI, session ID, fetch logic shipped (commits 67d969d, bb893a2). Plain-text parser added in bd2e73c — works on localhost but production reliability not yet verified. See TASK-017.
- [ ] TASK-017 — Fix chatbot response display (debug webhook response shape — production verification)
- [ ] TASK-018 — Deploy to Vercel (production URL)
- [x] ✅ TASK-019 — SEO meta tags shipped (commits 288789c, 01cffe8, 92b378d). Deferred: `og:url` + `canonical` (need final prod URL from TASK-018); designed 1200×630 `/og-image.png` (using `/kangaroo-logo.png` for now).
- [ ] TASK-020 — Performance audit (image optimization, Lighthouse score) — image-weight portion partly addressed by TASK-021; Lighthouse run + WebP/AVIF + srcset still pending
- [x] ✅ TASK-021 — Compress hero + logo via `scripts/compress-images.js` (sharp). `warehouse-hero.jpg` 369 KB → 168 KB (1600px @ q60, mozjpeg, behind overlays); `kangaroo-logo.png` 299 KB → 27 KB (palette PNG, 512px). 100 KB hero target not met at JPEG — would need WebP/AVIF, deferred to TASK-020's srcset work.

## Extra work completed (outside numbered tasks)
- [x] URL fix — corrected Olivery `register` and `track` URLs to real Olivery paths
- [x] Design pass — Archivo + JetBrains Mono fonts, warmer ivory palette, mono numerals, sharper card edges, route-accent hover ("cargo-manifest" aesthetic)
- [x] A11y polish — `aria-hidden="true"` on decorative icons; `decoding="async"` + `fetchpriority="high"` on hero LCP image (lowercase to silence React warning)
- [x] Services card visual upgrade — corner-bracket frames, circular numbered badge, gradient icon tile (ported from a discarded second design variant)
- [x] Retired the experimental `/new-design` industrial route — deleted `IndexNew`, `industrial/` folder, `variant="industrial"` props on Navbar/ChatWidget, industrial color tokens and Bebas Neue / Playfair Display fonts in `tailwind.config.ts`
- [x] Hero RTL fix — removed hardcoded `dir="rtl"`, swapped `ms-auto` → `me-auto`, dropped `sm:flex-row-reverse`, replaced `text-right` with `text-start`; Hero content now anchors to logical start (right in RTL, left in LTR) and the Primary CTA is rightmost in RTL
- [x] CTA contrast bug fix — `gradient-hero` + `hero-pattern` were both using the CSS `background` shorthand and clobbering each other, leaving the section near-transparent on the cream page; switched to `gradient-cta` and dropped the pattern overlay
- [x] RTL/LTR numerals + arrow polish — Services pill numbers now switch between Arabic-Indic (٠١-٠٥) and Western (01-05) digits via `dir`; card CTA arrow flips between ArrowLeft (RTL) and ArrowRight (LTR) via inline conditional (commit e056337)
- [x] Services sticky cards visual polish — soft `from-primary/5 to-primary/10` gradient layer, large faded service icon (`h-56 w-56 text-primary/10`) anchored at `-bottom-10 -end-10` (RTL-aware), 3-pill stats row per card (`bg-primary/10 text-primary rounded-full px-3 py-1`), padding tightened to `p-6 md:p-10 lg:p-[44px]`; translations gained `stats: string[]` on all 6 services AR + EN (commit 403e112; commit message labeled `task-020`, which collides with the file's TASK-020 perf-audit slot — kept the commit for history and logged the work here instead)

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

## TASK-016 — n8n chatbot widget (in progress)

**Priority:** Important
**Status:** 🔄 In progress — UI + session ID shipped; response parsing fix landed in `bd2e73c`; production deployment + reliability checks still pending.

```
TASK: TASK-016 n8n chatbot widget
FILES:
  - src/components/site/ChatWidget.tsx
  - src/i18n/translations.ts

DONE:
- Floating button (bottom-left LTR / bottom-right RTL), round green, w-14 h-14.
- Panel 300x400, header / messages / input, RTL-aware.
- Auto bot greeting on first open.
- Typing indicator (3-dot animate-bounce with [animation-delay:150ms]/[300ms]).
- POST to webhook with body { message, lang, session_id }.
- crypto.randomUUID() session_id persisted in sessionStorage.kangaroo_chat_id.
- Plain-text or JSON reply parser: handles {reply}, {output}, {text},
  {message}, arrays, and bare plain-text bodies (n8n's current shape).

OUTSTANDING:
- See TASK-017 for verification once the site is on a public domain.
```

---

## TASK-017 — Verify chatbot response display in production

**Priority:** Important
**Blocker:** Needs the site live (TASK-018) so the n8n webhook can be hit from the real origin, not localhost.

```
TASK: TASK-017 Production chatbot verification
GOAL:
After Vercel deploy, send a real message from the production URL and
confirm:
- CORS: n8n returns Access-Control-Allow-Origin matching the prod origin
  (kangaroo.ps or vercel domain). Add allowlist if needed.
- Webhook URL: swap /webhook-test/... → /webhook/... once n8n workflow is
  activated (the test URL is single-shot and expires).
- Reply shape: confirm extractReply() handles whatever the production
  workflow emits. If n8n is updated to return { "reply": "..." } JSON,
  no client change needed — parser already covers that shape.
- Mobile: verify the panel + keyboard behaviour on a real phone, not just
  Chrome devtools.

If reply still doesn't display:
- Open DevTools → Network → click the webhook POST → inspect raw response.
- Compare to the shapes covered in extractReply (ChatWidget.tsx).
- Extend the parser if a new shape is seen.

EXPECTED OUTPUT:
- Network screenshot of a successful POST + 200 with valid body.
- Screenshot of a working bot reply rendered in the panel on prod.
- Updated parser if a new response shape is encountered.
```

---

## TASK-018 — Deploy to Vercel

**Priority:** Critical (blocks every other production task)

```
TASK: TASK-018 Deploy site to Vercel
GOAL:
Stand up a public production URL for the homepage. Default plan is Vercel
(Vite + React deploys natively). Hostinger/cPanel is an alternative if
preferred but Vercel keeps the dev story simple.

STEPS:
1. Create a Vercel project pointing at the GitHub repo, default branch =
   main. Build command: `npm run build`. Output dir: `dist`.
2. Set env vars if needed (none currently — site is fully client-side).
3. Confirm the auto-detected framework preset is "Vite".
4. First deploy → grab the *.vercel.app preview URL → smoke-test all
   sections in both AR and EN.
5. Connect the company domain (kangaroo.ps or whichever) when DNS is ready.
6. Ensure HTTPS, www→apex redirect, and 200 OK on /.

POST-DEPLOY:
- Run TASK-017 (chatbot prod verify).
- Run TASK-020 (Lighthouse) against the prod URL.

EXPECTED OUTPUT:
- Vercel project URL + custom domain.
- Smoke-test screenshots (hero, services scroll, marquee, footer) AR + EN.
```

---

## TASK-019 — SEO meta tags (revival of TASK-004)

**Priority:** Important
**Status:** ✅ Shipped on `feature/pre-launch` in commits `288789c`, `01cffe8`, `92b378d`.
**Note:** Originally TASK-004 was skipped. Bring it back now that we're
about to deploy.

### What shipped
- `<title>` and `description` rewritten to "الشريك اللوجستي الأول…" copy.
- `og:title`, `og:description` refreshed; `og:locale=ar_PS`; added `og:locale:alternate=en_US`.
- Replaced the lovable.dev `og:image` placeholder. First commit used `/src/assets/kangaroo-logo.png` (which Vite does not serve in prod), fixed in `01cffe8` to `/kangaroo-logo.png` (the file already present in `public/` and used as favicon).
- `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image` mirroring og:image.
- `robots=index, follow`, `theme-color=#1f6b3c` (spec value; actual primary computes to ~`#1e6736` from `hsl(140 55% 26%)` — close enough for mobile chrome).

### Deferred (intentionally)
- `og:url` and `<link rel="canonical">` — both need the final prod URL; revisit after TASK-018 Vercel deploy.
- Designed 1200×630 `/og-image.png` — current `og:image` and `twitter:image` point at the logo, which is square (not the 1200×630 SMSA-style social card the spec calls for). Crawlers will render the logo until a real card is dropped into `public/og-image.png`.

```
TASK: TASK-019 SEO and Open Graph meta
FILE: index.html

GOAL:
Replace the leftover lovable.dev og:image and the generic description
with real Kangaroo content. Add Twitter card tags.

WHAT'S THERE NOW (audit before editing):
- description: "كنغارو - الشريك اللوجستي الأول في فلسطين والأردن..."
- og:image: still points to lovable.dev/opengraph-image-p98pqg.png ← FIX
- og:type, og:title, og:description: present
- twitter:card: summary_large_image (present)
- twitter:title / twitter:description / og:locale: missing

ADD / FIX:
- og:image → /og-image.png (1200x630 PNG) — needs a designed image, not the logo.
  Interim: use a screenshot of the hero, or a branded card.
- og:url → final prod URL
- og:locale → ar_PS (and og:locale:alternate → en_US)
- twitter:title, twitter:description, twitter:image (same as og:image)
- meta name="theme-color" content="#1f6b3c" (primary green for mobile chrome)
- canonical link

RULES:
- index.html only.
- Don't drop existing tags unless replacing them.

EXPECTED OUTPUT:
Diff of index.html + the new /public/og-image.png file.
```

---

## TASK-020 — Performance audit (Lighthouse)

**Priority:** Important
**Blocker:** Easier to run against the production URL after TASK-018.

```
TASK: TASK-020 Performance + accessibility audit

GOAL:
Get the site into a healthy Lighthouse range (target ≥90 across Perf,
A11y, Best Practices, SEO).

CHECKS:
- LCP: hero warehouse image is 378 KB jpeg — convert to AVIF/WebP + add
  responsive srcset. Keep a small jpeg fallback.
- Logo: kangaroo-logo.png is 306 KB — should be < 30 KB. Compress or
  convert to SVG.
- Total JS: ~349 KB. Consider route-splitting if more pages get added,
  but for a single-page site this is acceptable.
- Fonts: 4 Google Fonts requested (Tajawal, Cairo, Archivo, JetBrains Mono).
  Decide whether Cairo is still needed (now that Tajawal is primary) and
  drop it if not. Self-host if perf budget tight.
- A11y: run axe DevTools — fix any colour-contrast / aria issues.
- Console: should remain clean (current state: 0 errors, just 2 React
  Router future-flag warnings — harmless).

EXPECTED OUTPUT:
- Before/after Lighthouse reports on prod URL.
- Diff for image swaps + font cleanup.
- Note remaining items that need design input (e.g., new hero image).
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

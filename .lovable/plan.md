
## Kangaroo (كنغارو) — Logistics Homepage

A professional, RTL-first homepage with EN/AR toggle, built on the existing React + Vite + Tailwind + shadcn stack (Next.js isn't supported here — same look, same speed).

### Brand & design system
- Palette: Primary green `#2E7D32`, deeper accent `#1B5E20`, white, dark gray `#1F2937`, light surface `#F8FAF8`. Wired into `index.css` HSL tokens + Tailwind theme.
- Typography: **Cairo** (AR) + **Inter** (EN), loaded from Google Fonts. Bold, generous spacing, SMSA-style clean professionalism.
- Direction: `dir="rtl"` by default with `lang` toggle that flips to `ltr`. All layouts use logical Tailwind classes so they mirror correctly.

### Sections (single-page `Index.tsx`, componentized)
1. **Sticky Navbar** — Kangaroo logo (lucide icon + wordmark), nav links (الرئيسية، خدماتنا، من نحن، التغطية، تواصل), language toggle (AR/EN), green CTA "تواصل معنا".
2. **Hero** — Full-width brand-green gradient with subtle repeating logistics icon pattern (truck/box/plane SVG). Bold AR headline, subheadline, two CTAs (primary white-on-green + outline). Floating stat chips.
3. **Services (6 cards)** — Responsive grid (3×2 desktop, 2×3 tablet, 1col mobile). Each card: icon, title, short description, hover lift + green accent border. Covers all 6 services listed.
4. **Why Us (4 stats)** — Animated counter row with icons for coverage, speed, pricing, e-commerce support.
5. **Coverage Map** — Stylized SVG illustration showing Palestine + Jordan highlighted, with dotted lines extending to Turkey and "International". City pins for Ramallah, Nablus, Hebron, Amman.
6. **Partners** — "شركاؤنا وعملاؤنا" — grayscale placeholder logo grid (8 slots) with subtle marquee on mobile.
7. **CTA Band** — Green section: "ابدأ شحنتك اليوم" + contact button.
8. **Footer** — 4 columns: branches, quick links, services, contact info (phone/email/address) + social icons + copyright.

### Floating chatbot widget
- Bottom-left in RTL (bottom-right in LTR), green WhatsApp-style FAB with chat icon + pulse ring.
- Click opens a small mock chat panel: greeting bubble in Arabic, disabled input with "قريباً..." placeholder. Ready to wire to AI later.

### i18n
- Lightweight context-based translator (no extra deps): `useLang()` returns strings + current dir. All copy stored in one `translations.ts` map (ar/en). Toggling updates `<html dir lang>` and re-renders.

### Responsiveness & polish
- Mobile-first. Hamburger menu under `md`. Hero text scales with `clamp`. Reduced-motion respected. Lazy images. Lighthouse-friendly (no heavy libs added).

### Files to add/modify
- `index.html` — set `lang="ar" dir="rtl"`, preconnect Google Fonts.
- `src/index.css` — green-based HSL tokens, font families, gradient + pattern utilities.
- `tailwind.config.ts` — extend brand colors, font families, container.
- `src/i18n/translations.ts` + `src/i18n/LangProvider.tsx` — AR/EN toggle.
- `src/components/site/` — `Navbar`, `Hero`, `Services`, `WhyUs`, `CoverageMap`, `Partners`, `CTASection`, `Footer`, `ChatWidget`, `LangToggle`, `KangarooLogo`.
- `src/pages/Index.tsx` — assemble sections.

No backend needed for this scope.

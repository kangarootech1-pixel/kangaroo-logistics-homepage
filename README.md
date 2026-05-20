# Kangaroo Logistics — Official Website

The public marketing site for Kangaroo Logistics — a logistics partner serving Palestine and Jordan with delivery, fulfillment, and international shipping services.

The site is bilingual (Arabic + English, RTL-first), single-page, and integrates with the Kangaroo Olivery portal for customer registration, login, and shipment tracking.

## Overview

- **Audience:** e-commerce businesses, traders, and individuals in Palestine and Jordan.
- **Purpose:** brand presentation, service overview, lead capture, and entry point to the customer portal at [kangaroo-pal.olivery.io](https://kangaroo-pal.olivery.io/).
- **Languages:** Arabic (default, RTL) and English (LTR). Toggled via a header control; all copy lives in `src/i18n/translations.ts`.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS + shadcn/ui (Radix primitives) |
| Routing | react-router-dom v6 |
| i18n | Custom `LangProvider` (AR/EN, dir-aware) |
| Testing | Vitest + Testing Library |
| Icons | lucide-react |
| Chatbot | Floating widget posting to an n8n webhook |

## Project Structure

```
src/
├── assets/             Hero image, logo (optimized JPEG/PNG)
├── components/
│   ├── site/           Page sections — edit only here
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── WhyUs.tsx
│   │   ├── CoverageMap.tsx
│   │   ├── Partners.tsx
│   │   ├── StatsMarquee.tsx
│   │   ├── CTASection.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── ChatWidget.tsx
│   │   ├── LangToggle.tsx
│   │   └── KangarooLogo.tsx
│   └── ui/             shadcn primitives — do not modify
├── i18n/
│   ├── translations.ts All copy lives here (ar + en)
│   └── LangProvider.tsx
├── pages/
│   ├── Index.tsx       Section composition / page order
│   └── NotFound.tsx
├── hooks/
└── main.tsx

public/                 Static assets served at root
scripts/
└── compress-images.js  One-off sharp-based image compression
```

## Getting Started

Requirements: Node 18+ and npm.

```bash
# Clone
git clone https://github.com/kangarootech1-pixel/kangaroo-logistics-homepage.git
cd kangaroo-logistics-homepage

# Install
npm install

# Run dev server on http://localhost:8080
npm run dev

# Production build (output to dist/)
npm run build

# Preview the production build
npm run preview

# Lint
npm run lint

# Tests
npm test
```

## Environment & Config

The site is fully client-side and currently requires **no environment variables**. All external links (Olivery portal, n8n chatbot webhook, social) are hardcoded in `src/i18n/translations.ts` and `src/components/site/ChatWidget.tsx`.

The dev server port is fixed to **8080** (see `vite.config.ts`).

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready code. Protected; merges only via PR. |
| `feature/pre-launch` | Active pre-launch work (content, polish, deploy prep). |
| `feature/*` | Short-lived branches for individual tasks; merge to `feature/pre-launch` or `main` via PR. |

## Key Features

- **Bilingual AR/EN with RTL-first design** — Arabic is the default; the layout, icons, and animations adapt to text direction.
- **Sticky-stack services section** — five service cards reveal progressively as the user scrolls, with a sticky pill column tracking the active service.
- **Coverage map** — four zone cards (Palestine, Jordan, Turkey, International) with a logistics flow strip and stat boxes.
- **Stats marquee** — auto-scrolling strip of headline numbers, RTL-aware direction.
- **Olivery integration** — Register, Login, and Track Shipment buttons link directly into the Kangaroo Olivery portal.
- **n8n chatbot** — floating widget posts user messages to an n8n webhook with a session ID and renders the bot reply (JSON or plain-text).
- **SEO + Open Graph** — title, description, og:image, twitter:card, theme-color, locale alternates configured in `index.html`.

## Pending

Tracked in detail in `TASKS.md`. High-level status:

| Item | State |
|---|---|
| Real phone / email | ⏳ awaiting values from the company |
| Production deployment (Vercel) | ⏳ TASK-018 — critical-path blocker |
| Chatbot production verification | ⏳ TASK-017 — blocked on deploy |
| `og:url` + `<link rel="canonical">` | ⏳ needs the final production URL |
| Designed 1200×630 `/og-image.png` | ⏳ currently using the logo |
| Lighthouse audit (WebP/AVIF, srcset) | ⏳ TASK-020 — easier post-deploy |
| Verify the live stats (98%, 50+, 30%, 15+) | ⏳ confirm with company before launch |

## Contributing

This project uses a **task-based workflow** documented in `TASKS.md` and `CLAUDE.md`:

1. Each unit of work is a numbered `TASK-XXX` with a written spec.
2. Tasks are completed one at a time on `feature/pre-launch` or a short-lived branch.
3. Every task ends with `npm run build` and a single descriptive commit (e.g. `task-021: compress hero image and logo` or `feat: …`).
4. UI changes are verified visually in a browser before claiming complete.

### Style rules (enforced)

- All copy must live in `src/i18n/translations.ts` — no hardcoded Arabic or English in components.
- Verify RTL on every change; the site is Arabic by default.
- Do not edit `src/components/ui/` (shadcn primitives are protected).
- TypeScript strict mode; no `any`, no `@ts-ignore`.
- Tailwind only — no inline styles, no new CSS modules.
- Always use `const { t, dir } = useLang();` for direction-aware code.

### Olivery integration links

```
Homepage:        https://kangaroo-pal.olivery.io/
Track shipment:  https://kangaroo-pal.olivery.io/ar_SY/order_tracking
Register:        https://kangaroo-pal.olivery.io/ar_SY/olivery/sign_up/form
Login:           https://kangaroo-pal.olivery.io/ar_SY/web/login
```

All external links must include `target="_blank" rel="noopener noreferrer"`.

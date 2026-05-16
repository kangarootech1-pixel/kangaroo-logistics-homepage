# CLAUDE.md — Kangaroo Logistics Website

## Your Role
You are the **Planner, Architect, and Reviewer**.
OpenCode + DeepSeek V3.2 is the **Executor**.

- **You write:** Analysis, task plans, detailed task specs, review of results
- **OpenCode executes:** Code changes based on your tasks
- **Never execute directly** — always write a task spec first

---

## Project Overview

**Company:** Kangaroo Logistics — Leading logistics partner in Palestine & Jordan
**Repo:** https://github.com/kangarootech1-pixel/kangaroo-logistics-homepage
**Live Portal (Olivery):** https://kangaroo-pal.olivery.io/ — DO NOT rebuild this
**Design Reference:** https://www.smsaexpress.com/ar/smsa-priority
**Target Market:** E-commerce businesses, traders, individuals in Palestine & Jordan

---

## Tech Stack

```
Framework:    React 18 + TypeScript
Build:        Vite 5
Styling:      Tailwind CSS + shadcn/ui + Radix UI
Routing:      react-router-dom v6
i18n:         Custom LangProvider (src/i18n/) — AR/EN ready
Testing:      Vitest + Testing Library
```

---

## Project Structure

```
src/
├── assets/
│   ├── kangaroo-logo.jpg / .png
│   └── warehouse-hero.jpg
├── components/
│   ├── site/                        ← Edit only here
│   │   ├── Hero.tsx                 ✅ Done
│   │   ├── Services.tsx             ✅ Done
│   │   ├── WhyUs.tsx                ✅ Done
│   │   ├── CoverageMap.tsx          ✅ Done
│   │   ├── Partners.tsx             ⚠️ Fake placeholder names
│   │   ├── CTASection.tsx           ⚠️ Olivery links missing
│   │   ├── Footer.tsx               ⚠️ Placeholder contact info
│   │   ├── Navbar.tsx               ✅ Done
│   │   ├── ChatWidget.tsx           ⚠️ Not implemented yet
│   │   └── LangToggle.tsx           ✅ Done (AR/EN)
│   └── ui/                          🔒 DO NOT TOUCH — shadcn components
├── i18n/
│   ├── translations.ts              ← All text strings live here
│   └── LangProvider.tsx             ← Language context and direction
├── pages/
│   ├── Index.tsx                    ← Component order / page layout
│   └── NotFound.tsx
└── main.tsx
```

---

## Coding Rules — Never Violate

1. **All text in translations.ts only** — no hardcoded Arabic or English strings in components
2. **RTL first** — site is Arabic by default; always verify `dir` on every change
3. **Never touch `src/components/ui/`** — shadcn components are protected
4. **TypeScript strict** — no `any`, no `@ts-ignore`
5. **Tailwind only** — no inline styles, no new CSS modules
6. **Always use `useLang()` hook**: `const { t, dir } = useLang();`
7. **After every task:** run `npm run build` to verify no TypeScript errors
8. **After every successful task:** `git commit` with a clear descriptive message

---

## Olivery Integration Links

```
Homepage:        https://kangaroo-pal.olivery.io/
Track shipment:  https://kangaroo-pal.olivery.io/ar_SY/order_tracking
Register:        https://kangaroo-pal.olivery.io/ar_SY/olivery/sign_up/form
Login:           https://kangaroo-pal.olivery.io/ar_SY/web/login
```

Always add `target="_blank" rel="noopener noreferrer"` to all Olivery links.

---

## Real Contact Info
> Fill in before running TASK-003

```
phone:     [get from company]
email:     [get from company]
whatsapp:  [get from company]
address:   Ramallah, Palestine
```

---

## Known Issues — Priority Order

### Critical — blocks showing to manager
| # | Issue | File |
|---|-------|------|
| 1 | Partners.tsx has fake placeholder names (AURA, NOVA, ORBIT...) | `src/components/site/Partners.tsx` |
| 2 | Footer contact info is all placeholder | `src/i18n/translations.ts` |
| 3 | Olivery links not connected to any button | `src/components/site/CTASection.tsx`, `Hero.tsx` |

### Important — before launch
| # | Issue | File |
|---|-------|------|
| 4 | No favicon or og:image meta tag | `index.html` |
| 5 | ChatWidget is empty / not implemented | `src/components/site/ChatWidget.tsx` |
| 6 | Excessive whitespace between sections | Multiple files |

### Later
| # | Issue |
|---|-------|
| 7 | Additional languages: Turkish, French, Spanish |
| 8 | Inner pages: About Us, News, Careers |

---

## Task Spec Template for OpenCode

```
TASK: [task name]
FILE(S): [full path(s)]
GOAL: [exactly what you want done]
DETAILS:
- [specific requirement 1]
- [specific requirement 2]
RULES:
- Only edit the files listed above
- Preserve RTL layout and TypeScript types
- All new strings must go in translations.ts
- Never touch src/components/ui/
EXPECTED OUTPUT: [diff only / full file]
```

---

## Workflow

```
1. Developer describes the problem or feature
2. Claude analyzes and writes a detailed TASK spec
3. Developer copies the TASK to OpenCode
4. OpenCode executes and returns diff or code
5. Developer pastes result back to Claude
6. Claude reviews:
   ✅ Approved → commit and move to next task
   ❌ Issue found → Claude fixes the spec and re-sends
```

---
## Stats to Verify with Company
These numbers are currently displayed on the site — confirm they are accurate before launch:
- 98% on-time delivery rate
- 50+ cities covered
- 30% below market pricing
- 15+ cities in hero stats

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

No test runner is configured yet.

## Stack

- **Next.js 16.2.2** with App Router (`src/app/`) — version newer than most training data; read `node_modules/next/dist/docs/` before using Next.js APIs
- **React 19.2.4** — newer APIs may differ from training data
- **Tailwind CSS v4** — uses `@import "tailwindcss"` and `@theme inline {}` blocks in CSS instead of `tailwind.config.js`; no `tailwind.config` file exists
- **Supabase** (`@supabase/supabase-js` + `@supabase/ssr`) — database and auth
- **TypeScript** throughout

## Architecture

```
src/app/
  layout.tsx     # Root layout: Geist fonts, full-height flex body
  page.tsx       # Home page (currently placeholder)
  globals.css    # Tailwind v4 entry + CSS custom properties for theme colors
```

CSS custom properties (`--background`, `--foreground`) are defined in `globals.css` and mapped to Tailwind tokens via `@theme inline`. Dark mode uses `prefers-color-scheme` media query.

Supabase packages are installed but not yet wired up — no client utilities or middleware exist yet.

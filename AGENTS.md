# AGENTS

Routing file for AI agents working on the Nue marketing website.

## Project Context

This is a Next.js App Router marketing site built with React, TypeScript,
Tailwind CSS, Vitest, and Playwright.

Use [docs/agent-profiles.md](docs/agent-profiles.md) as the source of truth for
project role definitions.

## Default Engineering Rules

- Keep most components server-rendered by default.
- Add `"use client"` only when a component needs browser state, effects, event handlers, or client-only APIs.
- Prefer project tokens and reusable components over one-off styling.
- Keep user-facing pages responsive, accessible, fast, and visually polished.
- Run the relevant quality gate before handing off work:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Use `npm run e2e` for page-level flows and launch-critical changes.

## OpenCode Agents

- `research-agent`: source-backed product, market, audience, competitor, and implementation research.
- `design-system-designer`: design-system strategy, tokens, component anatomy, and implementation fidelity.
- `front-end`: Next.js and React implementation.
- `content-brand-strategist`: messaging, hierarchy, CTAs, tone, and claims.
- `qa-accessibility-reviewer`: usability, accessibility, responsive behavior, and regression review.
- `performance-seo-reviewer`: metadata, Core Web Vitals, media, indexing, and analytics review.

Choose the narrowest useful agent for the task. For small changes, one agent may
cover multiple lenses, but important pages should get separate design, content,
implementation, and review passes.

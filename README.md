# Nue Marketing Website

A basic open frontend development harness for a Next.js and React marketing site.

## Stack

- Next.js App Router
- React 19
- TypeScript in strict mode
- Tailwind CSS v4
- ESLint and Prettier
- Vitest with Testing Library
- Playwright for browser smoke tests

## Local Development

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Run the quality gates:

```bash
npm run typecheck
npm run lint
npm run test
npm run e2e
```

Run the full local check:

```bash
npm run check
```

## Harness Shape

- `src/app` contains the App Router entry points.
- `src/components` contains reusable UI components.
- `src/lib` contains framework-light logic that is easy to unit test.
- `src/test` contains shared test setup.
- `tests/e2e` contains Playwright browser flows.
- `docs/agent-profiles.md` defines the project working roles.
- `opencode.jsonc`, `AGENTS.md`, and `.opencode/agents` wire those roles into OpenCode.

Keep most components server-rendered by default. Add `"use client"` only where a
component needs browser state, effects, event handlers, or client-only APIs.

## OpenCode

Start OpenCode from the project root:

```bash
opencode
```

Available project agents:

- `research-agent`
- `design-system-designer`
- `front-end`
- `content-brand-strategist`
- `qa-accessibility-reviewer`
- `performance-seo-reviewer`

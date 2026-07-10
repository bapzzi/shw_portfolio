# CLAUDE.md — portfolio app

One-line: personal portfolio SPA (신해원 — DX·AI-driven, "판단은 사람이, 구현은 AI가").
Deploy: Vercel `shw-portfolio.vercel.app`, repo `bapzzi/shw_portfolio` (Root Directory=`app`), auto-redeploy on main push.

## Commands
- dev: `npm run dev` (port 5173)
- test: `npm test` (vitest run) / lint: `npx oxlint` / build: `npm run build` (tsc -b + vite)

## Stack & gotchas
- Vite + React 19 + TS, react-router v7. No backend, no Supabase — fully static.
- Routes: `/` (hero·works·journey·about·contact) · `/case/:slug` · `/how`. Unknown slug → redirect home.
- `vite.config.ts` has `server.fs.allow: ['..']` — content lives OUTSIDE app root; removing it breaks dev/test.

## Content layer  (this app's "data layer")
- Single source of copy: `../content/*.md` (case-*.md, journey.md, how.md), raw-imported in
  `src/lib/content.ts` via `?raw`. NEVER hardcode copy in app code.
- Parser: `src/lib/parse.ts` — the manuscript is the source of truth; the parser adapts to the
  manuscript format, not the other way (H1 `제목 — 태그라인` / `## 요약` empty-header table /
  `## 타임라인` `### ◆ node (time)` + `**라벨**: text` bullets / `## 프롬프트 펼침 (label)` quotes / `## 배운 것`).
- Stats on Home are computed from manuscripts (`src/lib/content.ts` stats) — no inflated hand-written numbers.

## Design
- Numeric spec: `~/claude/_design-system/spec-numeric.md` (read before UI work)
- Approved visual source: `../docs/시안/다크시안-2026-07-10.html` (dark + vivid accent `.y`, no cream tones)
- 3 viewports: 375 / 768 / 1440.

## File rules
- Max 300 lines/file (size-guard hook warns). Split before it grows.
- Ledger: root `../작업기록.md` (what/why/AI-use). SPEC.md is one-shot — archive after done
  (see ~/claude/docs/standards/webapp-docs-set.md).

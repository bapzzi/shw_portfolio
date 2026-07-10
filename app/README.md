# app — 포트폴리오 웹앱 알맹이

Vite + React + TypeScript. 그릇형 구조 — 프로젝트 설명·현재상태는 루트 `README.md` 참조.

- 문안 원천: `../content/*.md` (빌드 시 raw import → `src/lib/parse.ts` 파싱. 코드에 원고 하드코딩 금지)
- 디자인 단일원천: `~/claude/erp-club/docs/specs/2026-07-10-design-rules.md` (토큰 = `src/styles/global.css`)
- 명령: `npm run dev` / `npm run build` / `npm run preview`
- 배포: Vercel (루트 디렉토리 = `app`, SPA rewrites = `vercel.json`)

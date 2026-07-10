# 신해원 포트폴리오 (Shin Haewon Portfolio)

## 목적

"AI 활용 역량 증명" 장르의 개인 포트폴리오. 케이스 스터디를 **버전 타임라인(의사결정 지도)** 형식으로
보여준다 — 분기점마다 문제 / AI활용 / 결정 / ⊘기각 / 수치. 동시에 ERP연구회 산하 스터디의 프로토타입.

## 현재상태

**앱 구현 완료, Vercel 연결 대기.** (2026-07-10)

- 구조: 그릇형 — 앱 알맹이 `app/`(Vite+React+TS), 문안 원천 `content/*.md`(코드에 하드코딩 금지),
  디자인 단일원천 = erp-club 디자인규칙(다크+옐로, 토큰 `app/src/styles/global.css`)
- 라우트: `/` · `/case/adsp-board` · `/case/ai-relay` · `/case/portfolio` · `/how`
- 검증: 빌드·lint 클린, 3뷰포트(390/1280/1920) 가로 오버플로우 0, 캡처 `docs/shots/v2/`
- 옛 정적 페이지는 은퇴(`v1-internet-course` 태그로 보존), 승인 시안 = `docs/시안/`
- 원고: 케이스 3건 + journey v1(검토 대기), `content/how.md`는 구현 세션 v0 초안(검토 대기)

## 다음 할 일

1. 사용자가 Vercel 프로젝트 생성·repo 연결(루트 디렉토리=`app`) → 라이브 URL 확보
2. 통제 세션 session-review 검증(브리프 `docs/브리프-2026-07-10-앱구현.md` §6) → 원고 v2 반영
3. `content/case-portfolio.md` 실측 수치 기입(라이브 URL·커밋 수) — 검토 후
4. 카드 썸네일을 CSS 목업 → 라이브 스크린샷으로 교체(백로그)

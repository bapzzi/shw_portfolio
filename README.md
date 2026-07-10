# 신해원 포트폴리오 (Shin Haewon Portfolio)

## 목적

"AI 활용 역량 증명" 장르의 개인 포트폴리오. 케이스 스터디를 **버전 타임라인(의사결정 지도)** 형식으로
보여준다 — 분기점마다 문제 / AI활용 / 결정 / ⊘기각 / 수치. 동시에 ERP연구회 산하 스터디의 프로토타입.

## 현재상태

**라이브 — https://shw-portfolio.vercel.app** (2026-07-10, 통제 세션 검증 완료·실측 기입)

- 구조: 그릇형 — 앱 알맹이 `app/`(Vite+React+TS), 문안 원천 `content/*.md`(코드에 하드코딩 금지),
  디자인 단일원천 = erp-club 디자인규칙(다크+옐로, 토큰 `app/src/styles/global.css`)
- 라우트: `/` · `/case/adsp-board` · `/case/ai-relay` · `/case/portfolio` · `/how`
- 검증: 빌드·lint 클린, 3뷰포트(390/1280/1920) 가로 오버플로우 0, 캡처 `docs/shots/v2/`
- 옛 정적 페이지는 은퇴(`v1-internet-course` 태그로 보존), 승인 시안 = `docs/시안/`
- 원고: 케이스 3건 + journey v1(검토 대기), `content/how.md`는 구현 세션 v0 초안(검토 대기)

## 다음 할 일

1. 카드 썸네일을 CSS 목업 → 라이브 실스크린샷으로 교체 (1순위)
2. favicon 추가(스캐폴드 기본값 삭제 후 미부착 상태)
3. ai-relay 첫 노드 ⊘기각 인라인을 곁가지 불릿으로 분리할지 — 원고 형식, owner 결정 대기
4. kwu-erpclub.github.io 링크를 사이트에 추가할지 — owner 결정 대기

# 신해원 포트폴리오 (Shin Haewon Portfolio)

**라이브: https://shw-portfolio.vercel.app**

- 개인 포트폴리오 웹앱 — 케이스 스터디를 버전 타임라인(의사결정 지도) 형식으로 제시
- 스택: Vite + React + TypeScript · Vercel 배포
- 구조: `app/` 앱 본체 · `content/` 원고(md, 코드 하드코딩 금지) · `docs/` 설계·캡처
- 검증: 빌드·lint 클린 · 3뷰포트(390/1280/1920) 가로 오버플로우 0

---

## 목적

"AI 활용 역량 증명" 장르의 개인 포트폴리오. 케이스 스터디를 **버전 타임라인(의사결정 지도)** 형식으로
보여준다 — 분기점마다 문제 / AI활용 / 결정 / ⊘기각 / 수치. 동시에 ERP연구회 산하 스터디의 프로토타입.

## 현재상태

**라이브 — https://shw-portfolio.vercel.app** (2026-07-10, 통제 세션 검증 완료·실측 기입)

**▶ 동결 해제 · 재정의 SPEC 확정(2026-08-12 owner)** — `SPEC.md` 발행. 구 동결 사유 중
**"담긴 것이 실제 한 일의 일부뿐"**(케이스 3건에서 정지)을 이번 범위로 잡았다. 디자인(다크+옐로 토큰·
타임라인 시그니처)은 **유지·범위 밖**.

- 확정 요구 = ①기존 웹앱 재정의 ②독자 4종(채용·캠프·교내·본인) ③**전량 축적 후 조립식 제거**
- 핵심 설계 = **축적(원천)과 노출(화면) 분리** — 빼는 행위는 삭제가 아니라 frontmatter `노출: false` 한 줄
- 적재 목표 = 케이스 8건(신규 6: lesson-replay·aim-hub·adsp-study·harness·lgcns-til + 기존 갱신)
  + 워크 11건(letter-db 파생) + 자산 목록
- 구현 미착수 — 다음 세션에서 C1~C6(글롭 로딩·frontmatter 파서·프리셋 필터)

- 구조: 그릇형 — 앱 알맹이 `app/`(Vite+React+TS), 문안 원천 `content/*.md`(코드에 하드코딩 금지),
  디자인 단일원천 = erp-club 디자인규칙(다크+옐로, 토큰 `app/src/styles/global.css`)
- 라우트: `/` · `/case/adsp-board` · `/case/ai-relay` · `/case/portfolio` · `/how`
- 검증: 빌드·lint 클린, 3뷰포트(390/1280/1920) 가로 오버플로우 0, 캡처 `docs/shots/v2/`
- 옛 정적 페이지는 은퇴(`v1-internet-course` 태그로 보존), 승인 시안 = `docs/시안/`
- 원고: 케이스 3건 + journey v1(검토 대기), `content/how.md`는 구현 세션 v0 초안(검토 대기)

## 다음 할 일

1. **SPEC §8 열린 항목 4건 결정**(owner) — 원고 작성 순서 / `본인` 프리셋 공개 여부 /
   letter-db 연동 수준 / 캠프 산출물 게재 경계
2. **구현 C1~C6** — 글롭 로딩·frontmatter 파서·독자 프리셋·요약형 카드·자산 섹션·테스트
3. **원고 6건 신규 집필** — lesson-replay → aim-hub → harness → adsp-study → lgcns-til (강한 순)
4. (별건·미해결) 디자인 "느낌" 문제 — 이번 범위 밖. 콘텐츠 개편 후에도 어긋나면 별도 패스

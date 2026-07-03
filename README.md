# 신해원 포트폴리오 (Shin Haewon Portfolio)

## 목적

개인 포트폴리오 사이트. 광운대학교 인터넷활용 수업 과제로 처음 만들었고,
지금은 그 위에서 **단일 소스 빌드 구조**로 다시 만들고 있다.
내용을 한 곳(`content/portfolio.md`)에서만 관리하고, 거기서 웹용·PDF용을 자동으로 뽑아
GitHub Pages에 배포하는 것이 목표다.

## 현재상태

**아직 배포 전이다.** 라이브 URL(`bapzzi.github.io`)은 아직 게시하지 않았다.

- **단일 소스 빌드 파이프라인 도입**: `content/portfolio.md`(원본 하나) →
  `scripts/build.sh`(pandoc) → `build/web.html`(웹용)·`build/pdf.html`(PDF용) 생성.
  서식(`styles/web.css`·`styles/pdf.css`)만 매체별로 다르게 입힌다.
  - 단, `content/portfolio.md`는 아직 **골격만** 잡힌 상태다(About/역량/프로젝트/Contact 제목만 있고 내용은 빈칸).
  - `build/`는 `.gitignore`로 커밋 제외(빌드 산출물이라 소스만 추적).
- **프로젝트 페이지 추가**: `lotte-erp.html`(롯데 ERP 발표), `university.html`(대학 과제 관리) 두 개를 추가.
- **옛 수업 실습은 박제**: D-Day 계산기·저녁 메뉴 랜덤 등 인터넷활용 실습 페이지는
  `v1-internet-course` 태그로 남기고 루트에서는 제거했다.
- **남아 있는 옛 구조**: 루트에는 초기 수업 과제 시절의 정적 페이지
  (`index.html`·`about.html`·`portfolio.html`·`contact.html`)와 공용 `style.css`·`script.js`가 아직 그대로 있다.
  단일 소스 빌드(`content` → `build`)와 이 옛 페이지들이 **아직 병존**한다.
- **태그 2개**: `v0.1.0`(단일 소스 baseline), `v1-internet-course`(수업 실습 버전 박제).

## 다음 할 일

1. `content/portfolio.md`의 빈 골격을 실제 내용으로 채운다(About·핵심 역량·프로젝트 STAR·Contact).
2. `bash scripts/build.sh`로 웹·PDF를 뽑아 결과를 확인한다.
3. **GitHub Pages에 실제 배포**하고 라이브 링크를 활성화한다.
4. 옛 루트 페이지(`index`·`about`·`portfolio`·`contact`)와 단일 소스 빌드의 관계를 정리한다
   (통합할지, 옛 페이지를 태그로 박제하고 걷어낼지 결정).

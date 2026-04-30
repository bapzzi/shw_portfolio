# 신해원 포트폴리오 (Shin Haewon Portfolio)

광운대학교 경영학부 인터넷활용 수업 과제로 제작한 개인 포트폴리오 사이트입니다.
실제로 GitHub Pages 등에 배포해 사용할 수 있는 수준으로 만들었습니다.

🔗 **Live**: https://bapzzi.github.io _(배포 후 활성화)_
🐙 **Repo**: https://github.com/bapzzi

---

## 📂 파일 구조

```
shw_portfolio/
├── index.html         # 홈 (히어로 + 핵심 스킬 미리보기)
├── about.html         # 소개 (자기소개 + 학력 타임라인 + 관심분야)
├── portfolio.html     # 프로젝트 카드 그리드
├── contact.html       # 연락처 카드 + 메시지 폼
├── style.css          # 모든 페이지가 공유하는 스타일시트
├── script.js          # 모든 페이지가 공유하는 자바스크립트
└── README.md          # 이 문서
```

총 4개의 HTML 페이지가 단일 `style.css` 와 `script.js` 를 공유하는 구조이며,
이는 인터넷활용 수업의 **HTML / CSS / JavaScript 분리 원칙**을 따릅니다.

---

## 🎨 사용한 기술 정리

### HTML

- **시맨틱 태그** 적극 활용: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`,
  `<aside>`, `<footer>`, `<ol>`, `<ul>`
- **접근성 속성**: `aria-label`, `aria-labelledby`, `aria-current`, `aria-live`,
  `alt`, `role`
- **메타 태그**: `description`, `Open Graph` (카카오톡/페북 공유 시 미리보기)
- **시맨틱 폼**: `<label>` + `for`, `required`, `type="email"` 등

### CSS

- **CSS 변수(`--`)**: 색상·폰트·라운드·그림자·트랜지션을 한곳에서 관리
- **Flexbox + Grid 혼용**: 헤더는 Flex, 카드 레이아웃은 Grid
- **`grid-template-columns: repeat(auto-fill, minmax(...))`** 로 반응형 자동 그리드
- **`clamp()`** 로 화면 크기에 따라 부드럽게 변하는 폰트 사이즈
- **`::before` / `::after`** 가상 요소로 장식 추가
- **`@keyframes`** 애니메이션 (히어로 진입, 타이핑 커서, 펄스)
- **`backdrop-filter`** 로 헤더 글래스모피즘
- **`@media`** 미디어 쿼리로 모바일 대응
- **`@media (prefers-reduced-motion: reduce)`** 접근성 — 모션을 줄이고 싶은 사용자 배려
- **`:focus-visible`** 키보드 포커스 스타일 (마우스 클릭엔 안 보임)

### JavaScript

- **`DOMContentLoaded`** 로 안전한 시점에 스크립트 실행
- **`document.getElementById` / `querySelectorAll` / `forEach`** 로 DOM 조작
- **타이핑 애니메이션**: `setTimeout` 재귀 호출로 단어 단위 타이핑/지우기
- **`location.pathname`** 으로 현재 페이지 감지 → 네비 active 표시
- **`IntersectionObserver`** 로 스크롤 페이드인 (구형 브라우저 폴백 포함)
- **폼 검증**: 정규식, `closest()`, `classList.add/remove`
- **`mailto:` 링크 + `encodeURIComponent`** 로 한글 깨짐 없이 메일 클라이언트 실행
- **`window.matchMedia('(prefers-reduced-motion)')`** 로 사용자 환경 존중

---

## ✨ 주요 인터랙션

1. **히어로 타이핑 효과** — `ERP 개발자` → `SAP 컨설턴트` → `Business Developer` →
   `경영학도` 가 반복 타이핑됩니다.
2. **현재 페이지 강조** — 페이지를 이동할 때마다 네비의 해당 메뉴가 인디고 색으로 강조됩니다.
3. **스크롤 페이드인** — 스크롤하면서 카드들이 부드럽게 나타납니다.
4. **헤더 블러** — 스크롤할 때 헤더가 살짝 투명해지며 배경에 블러가 적용됩니다.
5. **컨택트 폼** — 검증을 통과하면 사용자의 메일 앱이 자동으로 열려 실제로 메일을 보낼 수 있습니다.

---

## 🎯 디자인 시스템

| 항목 | 값 |
|---|---|
| 메인 폰트 (한글) | **Pretendard** (모던한 한글 산세리프) |
| 모노 폰트 | **JetBrains Mono** (메타 텍스트 / 라벨용) |
| 액센트 컬러 | `#4f46e5` (Indigo 600) |
| 텍스트 컬러 | `#18181b` (거의 검정) |
| 배경 | `#fafaf9` (살짝 따뜻한 흰색) |
| 컨테이너 너비 | `1080px` |

---

## 🚀 GitHub Pages 배포 방법

```bash
# 1. 이 폴더를 깃허브에 푸시
cd shw_portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/bapzzi/bapzzi.github.io.git
git push -u origin main
```

푸시 후 1~2분이면 `https://bapzzi.github.io` 에서 확인 가능합니다.

---

## 📝 라이선스

개인 포트폴리오. 학습 목적의 코드 참고는 자유롭게 가능합니다.

© 2026 Shin Haewon

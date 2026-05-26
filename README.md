# 신해원 포트폴리오 (Shin Haewon Portfolio)

광운대학교 인터넷활용 수업 과제로 제작한 개인 포트폴리오 사이트입니다.
실제로 GitHub Pages 등에 배포해 사용할 수 있는 수준으로 만들었습니다.

🔗 **Live**: https://bapzzi.github.io _(배포 후 활성화)_
🐙 **Repo**: https://github.com/bapzzi

---

## 📂 파일 구조

```
shw_portfolio/
├── index.html         # 홈 (히어로 + 핵심 스킬 미리보기)
├── about.html         # 소개 (자기소개 + 학력 타임라인 + 관심분야)
├── portfolio.html     # 프로젝트 카드 그리드 + JavaScript 실습 연결
├── dday.html          # Date 객체 기반 D-Day 계산기
├── random.html        # String/Array/Math 기반 저녁 메뉴 랜덤 뽑기
├── contact.html       # 연락처 카드 + 메시지 폼
├── style.css          # 모든 페이지가 공유하는 스타일시트
├── script.js          # 모든 페이지가 공유하는 자바스크립트
└── README.md          # 이 문서
```

총 4개의 HTML 페이지가 단일 `style.css` 와 `script.js` 를 공유하는 구조이며,
이는 인터넷활용 수업의 **HTML / CSS / JavaScript 분리 원칙**을 따릅니다.

---

## 🧪 11주차 JavaScript 코어 객체 실습 반영

인터넷활용 11주차 실습 요구사항을 포트폴리오 내부 기능으로 확장했습니다.

### D-Day 계산기

`dday.html`은 `Date` 객체를 활용해 목표 날짜와 기준 날짜의 차이를 계산합니다.  
사용자는 과제, 시험, 발표일 같은 목표 이름과 날짜를 입력할 수 있으며, 결과는 `D-`, `D-Day`, `D+` 형식으로 표시됩니다.

사용한 핵심 개념은 다음과 같습니다.

- `new Date()`로 날짜 객체 생성
- `Date.getTime()`으로 날짜를 밀리초 단위 숫자로 변환
- `Math.ceil()`로 남은 일수 올림 처리
- `Math.abs()`로 지난 날짜의 절댓값 처리

### 저녁 메뉴 랜덤 뽑기

`random.html`은 콤마로 입력한 저녁 메뉴 후보를 배열로 변환한 뒤, 무작위로 하나를 추천합니다.  
한식, 간단식, 랜덤 믹스 프리셋과 최근 뽑기 기록 기능을 추가해 단순 실습 예제보다 실제 웹 기능처럼 보이도록 구성했습니다.

사용한 핵심 개념은 다음과 같습니다.

- `String.split(',')`으로 문자열을 배열로 변환
- `String.trim()`으로 공백 제거
- `Array.length`로 후보 개수 확인
- `Math.random()`과 `Math.floor()`로 랜덤 인덱스 생성

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

## 📝 라이선스

개인 포트폴리오. 학습 목적의 코드 참고는 자유롭게 가능합니다.

© 2026 Shin Haewon


---

## 🧪 13주차 DOM 객체 제어 및 동적 문서 구성 실습 반영

인터넷활용 13주차 실습 요구사항을 기존 포트폴리오의 디자인 톤에 맞춰 확장했습니다.

### DOM Style Lab

`dom_style.html`은 DOM 객체의 `style` 프로퍼티를 직접 제어하는 실습 페이지입니다.  
버튼 클릭에 따라 타겟 문장의 글자색, 글자 크기, 배경색, 표시 여부가 즉시 변경됩니다.

사용한 핵심 개념은 다음과 같습니다.

- `document.getElementById()`로 변경 대상 요소 선택
- `style.color`로 글자색 변경
- `style.fontSize`로 글자 크기 변경
- `style.backgroundColor`로 배경색 변경
- `style.display`로 숨기기/보이기 토글

### Contact Guestbook Comments

`contact.html#guestbook`은 Contact 페이지 하단에 통합한 댓글 추가/삭제 실습입니다.  
사용자가 이름과 댓글을 입력하면 JavaScript가 새로운 댓글 카드를 생성해 목록에 추가하고,
삭제 버튼을 누르면 해당 댓글 요소를 DOM에서 제거합니다.

사용한 핵심 개념은 다음과 같습니다.

- `createElement()`로 댓글 카드 요소 생성
- `appendChild()`와 `insertBefore()`로 댓글 목록에 추가
- `removeChild()`로 댓글 삭제
- `localStorage`로 새로고침 이후에도 댓글 유지

두 실습은 `portfolio.html`의 프로젝트 카드에 연결되어 있으며, 기존 D-Day 계산기와 저녁 메뉴 랜덤 뽑기처럼 포트폴리오 내부 JavaScript 실습 프로젝트로 구성했습니다.

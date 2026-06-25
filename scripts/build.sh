#!/usr/bin/env bash
# 단일 소스(content/portfolio.md) → 웹용·PDF용 HTML 두 개를 생성한다.
# 내용은 portfolio.md 한 곳에서만 관리하고, 서식만 매체별로 다르게 입힌다.
set -e
cd "$(dirname "$0")/.."   # portfolio/ 루트로 이동

SRC="content/portfolio.md"
mkdir -p build

# 웹용: 반응형 스타일 (스크롤·넓은 화면)
pandoc "$SRC" \
  --standalone --embed-resources \
  --css=styles/web.css \
  -o build/web.html

# PDF용: A4 인쇄 스타일 (페이지 분할)
pandoc "$SRC" \
  --standalone --embed-resources \
  --css=styles/pdf.css \
  -o build/pdf.html

echo "✓ 빌드 완료"
echo "  웹  → build/web.html  (브라우저로 열거나 GitHub Pages에 게시)"
echo "  PDF → build/pdf.html  (브라우저로 열고 Cmd+P → 'PDF로 저장', 용지 A4)"

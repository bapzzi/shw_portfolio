// 실스크린샷 썸네일 — 다크 브라우저 프레임(.mock 바)은 유지, 몸체만 라이브 캡처.
// 원천 이미지 = scripts 캡처(setViewport 1280, 카드 노출 크기의 2배 해상도 webp).

export function Shot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mock">
      <div className="bar">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  )
}

import { Inline } from './Inline'

// 터미널 창 오브젝트 — 프롬프트 펼침(케이스당 1곳). 신호등 도트 + 파일명 바. 디자인규칙 §4.
export function Terminal({ name, body }: { name: string; body: string }) {
  return (
    <details className="term" open={false}>
      <summary>
        <span className="bar">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="name">{name}</span>
          <span className="hint">▸ 클릭해 펼치기</span>
        </span>
      </summary>
      <div className="body">
        <span className="k">프롬프트 &gt; </span>
        <Inline text={body} chips={false} />
      </div>
    </details>
  )
}

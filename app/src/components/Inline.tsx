import type { ReactNode } from 'react'

// 원고 인라인 문법 렌더: `칩` → 칩, **강조** → strong, [텍스트](url) → 링크. 나머지 텍스트는 그대로.
export function Inline({ text, chips = true }: { text: string; chips?: boolean }) {
  const parts: ReactNode[] = []
  const re = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  let key = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[1] !== undefined) {
      parts.push(
        chips ? (
          <span className="chip" key={key++}>
            {m[1]}
          </span>
        ) : (
          <code key={key++}>{m[1]}</code>
        ),
      )
    } else if (m[2] !== undefined) {
      parts.push(<strong key={key++}>{m[2]}</strong>)
    } else {
      parts.push(
        <a key={key++} href={m[4]} target="_blank" rel="noreferrer">
          {m[3]}
        </a>,
      )
    }
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}

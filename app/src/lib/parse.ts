// content/*.md 원고 구조 파서 — 원고가 원천, 파서가 원고에 맞춘다(브리프 §4).
// 지원 구조: H1 제목 / ## 요약(표) / ## 타임라인(### ◆ 노드 + 불릿) / ## 프롬프트 펼침(인용) / ## 배운 것 한 줄

export interface NodeField {
  label: string // 문제 · AI활용 · 결정 · ⊘기각 · ⊘보류 · 결과 · 칩 · 한 줄 · 원천 · ''(플레인)
  text: string
}

export interface TimelineNodeData {
  title: string
  time?: string
  fields: NodeField[]
}

export interface ContentDoc {
  title: string
  tagline?: string
  summary: { key: string; value: string }[]
  nodes: TimelineNodeData[]
  prompt?: { label?: string; body: string }
  lesson?: string
}

export function parseDoc(raw: string): ContentDoc {
  const lines = raw.split(/\r?\n/)
  const doc: ContentDoc = { title: '', summary: [], nodes: [] }
  let section: 'none' | 'summary' | 'timeline' | 'prompt' | 'lesson' | 'other' = 'none'
  let cur: TimelineNodeData | null = null
  let promptLabel: string | undefined
  const promptLines: string[] = []
  const lessonLines: string[] = []

  for (const line of lines) {
    const t = line.trim()

    if (t.startsWith('# ') && !doc.title) {
      const h = t.slice(2).trim()
      const idx = h.indexOf(' — ')
      if (idx > 0) {
        doc.title = h.slice(0, idx).trim()
        doc.tagline = h.slice(idx + 3).trim()
      } else {
        doc.title = h
      }
      continue
    }

    if (t.startsWith('## ')) {
      const h = t.slice(3).trim()
      if (h.startsWith('요약')) section = 'summary'
      else if (h.startsWith('타임라인') || h.startsWith('원칙')) section = 'timeline'
      else if (h.startsWith('프롬프트')) {
        section = 'prompt'
        const m = h.match(/\(([^)]*)\)/)
        promptLabel = m ? m[1].trim() : undefined
      } else if (h.startsWith('배운')) section = 'lesson'
      else section = 'other'
      cur = null
      continue
    }

    if (section === 'summary') {
      const m = t.match(/^\|(.+)\|$/)
      if (m) {
        const cells = m[1].split('|').map((c) => c.trim())
        if (cells.length >= 2 && cells[0] && !/^[-\s]+$/.test(cells[0])) {
          doc.summary.push({ key: cells[0], value: cells.slice(1).join(' ').trim() })
        }
      }
      continue
    }

    if (section === 'timeline') {
      if (t.startsWith('### ')) {
        let h = t.slice(4).replace(/^◆\s*/, '').trim()
        let time: string | undefined
        const m = h.match(/^(.*?)\s*\(([^()]*)\)\s*$/)
        if (m && m[1]) {
          h = m[1].trim()
          time = m[2].trim()
        }
        cur = { title: h, time, fields: [] }
        doc.nodes.push(cur)
        continue
      }
      if (t.startsWith('- ') && cur) {
        const item = t.slice(2).trim()
        const fm = item.match(/^\*\*(.+?)\*\*\s*[::]\s*(.*)$/)
        if (fm) {
          cur.fields.push({ label: fm[1].trim(), text: fm[2].trim() })
        } else {
          const km = item.match(/^(칩|한 줄|원천)\s*[::]\s*(.*)$/)
          if (km) cur.fields.push({ label: km[1], text: km[2].trim() })
          else cur.fields.push({ label: '', text: item })
        }
      }
      continue
    }

    if (section === 'prompt') {
      if (t.startsWith('>')) promptLines.push(t.replace(/^>\s?/, ''))
      continue
    }

    if (section === 'lesson') {
      if (t && !t.startsWith('>')) lessonLines.push(t)
      continue
    }
  }

  if (promptLines.length) doc.prompt = { label: promptLabel, body: promptLines.join('\n') }
  if (lessonLines.length) doc.lesson = lessonLines.join(' ')
  return doc
}

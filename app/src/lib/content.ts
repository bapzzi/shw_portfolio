// content/ md = 문안 유일 원천(브리프 §2). 빌드 시 raw import → 파싱. 앱 코드에 원고 하드코딩 금지.
import adspRaw from '../../../content/case-adsp-board.md?raw'
import relayRaw from '../../../content/case-ai-relay.md?raw'
import pfRaw from '../../../content/case-portfolio.md?raw'
import journeyRaw from '../../../content/journey.md?raw'
import howRaw from '../../../content/how.md?raw'
import { parseDoc, type ContentDoc } from './parse'

export interface CaseEntry {
  slug: string
  doc: ContentDoc
  live?: string
  termName: string
}

function liveUrl(doc: ContentDoc): string | undefined {
  const row = doc.summary.find((r) => r.key === '라이브')
  const m = row?.value.match(/https?:\/\/\S+/)
  return m ? m[0] : undefined
}

function makeCase(slug: string, raw: string): CaseEntry {
  const doc = parseDoc(raw)
  return { slug, doc, live: liveUrl(doc), termName: `decision-log — ${slug}` }
}

export const cases: CaseEntry[] = [
  makeCase('adsp-board', adspRaw),
  makeCase('ai-relay', relayRaw),
  makeCase('portfolio', pfRaw),
]

export function getCase(slug: string): CaseEntry | undefined {
  return cases.find((c) => c.slug === slug)
}

export const journey = parseDoc(journeyRaw)
export const how = parseDoc(howRaw)

// 과정 수치 — 원고에서 집계(부풀린 수치 금지, 디자인규칙 §3)
const allFields = cases.flatMap((c) => c.doc.nodes.flatMap((n) => n.fields))
export const stats = {
  live: 3, // 라이브 서비스(journey.md "라이브 3")
  nodes: cases.reduce((s, c) => s + c.doc.nodes.length, 0),
  decisions: allFields.filter((f) => f.label === '결정').length,
  rejected: allFields.filter((f) => f.label.startsWith('⊘')).length,
}

import type { TimelineNodeData, NodeField } from '../lib/parse'
import { Inline } from './Inline'

// 시그니처 — 버전 타임라인(의사결정 지도). 디자인규칙 §4.
// 노드 = 버전/시기 칩 → 문제 → AI활용 칩 → 결정 + ⊘기각 곁가지(스탬프 #E0604C) → 결과 수치.

function chipsOf(text: string): string[] {
  return [...text.matchAll(/`([^`]+)`/g)].map((m) => m[1])
}

function Field({ f }: { f: NodeField }) {
  if (f.label === '원천') return null // 내부 데이터 출처 표기 — 화면 미노출

  if (f.label.startsWith('⊘')) {
    const stamp = f.label.replace('⊘', '')
    return (
      <div className="treject">
        <span className="stamp">{stamp}</span>
        <span>
          <Inline text={f.text} />
        </span>
      </div>
    )
  }

  if (f.label === '칩' || f.label === 'AI활용') {
    const chips = chipsOf(f.text)
    const rest = f.text.replace(/`[^`]+`/g, '').replace(/^\s*\+\s*자격\s*$/, '').trim()
    return (
      <div className="trow">
        <span className={f.label === 'AI활용' ? 'tkey hot' : 'tkey'}>
          {f.label === '칩' ? '' : f.label}
        </span>
        <span className="tval">
          <span className="chips">
            {chips.map((c, i) => (
              <span className="chip" key={i}>
                {c}
              </span>
            ))}
          </span>
          {rest && rest !== '—' && <span style={{ display: 'block', marginTop: 6 }}><Inline text={rest} /></span>}
        </span>
      </div>
    )
  }

  if (f.label === '한 줄') {
    return (
      <div className="trow dimrow">
        <span className="tkey" />
        <span className="tval">
          <Inline text={f.text} />
        </span>
      </div>
    )
  }

  if (f.label === '') {
    return (
      <div className="trow">
        <span className="tval">
          <Inline text={f.text} />
        </span>
      </div>
    )
  }

  return (
    <div className="trow">
      <span className={f.label === '결정' ? 'tkey hot' : 'tkey'}>{f.label}</span>
      <span className="tval">
        <Inline text={f.text} />
      </span>
    </div>
  )
}

export function Timeline({ nodes }: { nodes: TimelineNodeData[] }) {
  return (
    <div className="timeline">
      {nodes.map((n, i) => (
        <div className="tnode" key={i}>
          <div className="thead">
            {n.time && <span className="chip time">{n.time}</span>}
            <span className="ttitle">{n.title}</span>
          </div>
          <div className="tbody">
            {n.fields.map((f, j) => (
              <Field f={f} key={j} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

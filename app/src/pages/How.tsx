import { Link } from 'react-router-dom'
import { how, stats } from '../lib/content'
import { Timeline } from '../components/Timeline'

// 과정 수치는 케이스 원고에서 집계(content.ts stats) — 스펙 §2 "작업 방식: 통제 체계 + 과정 수치"

const numItems = [
  { v: stats.nodes, k: '기록된 분기점' },
  { v: stats.decisions, k: '기록된 결정' },
  { v: stats.rejected, k: '기각·보류한 대안' },
]

export default function How() {
  return (
    <>
      <div className="wrap">
        <section className="case-head">
          <span className="sec-label">HOW I WORK</span>
          <h1 className="case-title">{how.title}</h1>
          {how.tagline && <p className="sub">{how.tagline}</p>}
        </section>

        <section className="sec" style={{ paddingBottom: 48 }}>
          <Timeline nodes={how.nodes} />
        </section>
      </div>

      <section className="nums">
        <div className="wrap in">
          {numItems.map((n) => (
            <div className="n" key={n.k}>
              <div className="v">{n.v}</div>
              <div className="k">{n.k}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="wrap">
        {how.lesson && <div className="lesson">{how.lesson}</div>}
        <nav className="case-nav">
          <Link to="/">← 홈</Link>
          <Link to="/case/portfolio">이 사이트의 제작 과정 →</Link>
        </nav>
      </div>
    </>
  )
}

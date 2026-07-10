import { Link, Navigate, useParams } from 'react-router-dom'
import { cases, getCase } from '../lib/content'
import { Timeline } from '../components/Timeline'
import { Terminal } from '../components/Terminal'

function linkify(value: string) {
  const m = value.match(/https?:\/\/\S+/)
  if (!m) return value
  const url = m[0]
  const i = value.indexOf(url)
  return (
    <>
      {value.slice(0, i)}
      <a href={url} target="_blank" rel="noreferrer">
        {url}
      </a>
      {value.slice(i + url.length)}
    </>
  )
}

export default function CasePage() {
  const { slug } = useParams()
  const entry = slug ? getCase(slug) : undefined
  if (!entry) return <Navigate to="/" replace />
  const { doc } = entry
  const idx = cases.findIndex((c) => c.slug === entry.slug)
  const next = cases[(idx + 1) % cases.length]

  return (
    <div className="wrap">
      <section className="case-head">
        <span className="sec-label">CASE STUDY</span>
        <h1 className="case-title">{doc.title}</h1>
        {doc.tagline && <p className="sub">{doc.tagline}</p>}
        <div className="case-summary">
          {doc.summary.map((r) => (
            <div className="srow" key={r.key}>
              <span className="sk">{r.key}</span>
              <span className="sv">{linkify(r.value)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sec" style={{ paddingBottom: 0 }}>
        <span className="sec-label">DECISION TIMELINE</span>
        <Timeline nodes={doc.nodes} />
      </section>

      {doc.prompt && (
        <section className="sec" style={{ paddingBottom: 0 }}>
          <h2>
            프롬프트까지 <span className="y">공개</span>
          </h2>
          {doc.prompt.label && <p className="sub">{doc.prompt.label}</p>}
          <Terminal name={entry.termName} body={doc.prompt.body} />
        </section>
      )}

      {doc.lesson && <div className="lesson">{doc.lesson}</div>}

      <nav className="case-nav">
        <Link to="/">← 홈</Link>
        <Link to={`/case/${next.slug}`}>다음 케이스: {next.doc.title} →</Link>
      </nav>
    </div>
  )
}

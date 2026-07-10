import { Link } from 'react-router-dom'
import { cases, journey, stats } from '../lib/content'
import { Timeline } from '../components/Timeline'
import { MockDashboard, MockPanel } from '../components/Mock'
import { Shot } from '../components/Shot'
import shotAdsp from '../assets/shot-adsp-board.webp'
import shotRelay from '../assets/shot-ai-relay.webp'
import shotPf from '../assets/shot-portfolio.webp'

// 히어로·섹션 헤드라인 문안 원천 = 승인 시안(docs/시안/다크시안-2026-07-10.html).
// About·Contact 데이터 원천 = journey.md 표기 규칙 + cover-letter-db profile(공개 범위만).

const numItems = [
  { v: stats.live, k: '라이브 서비스' },
  { v: stats.nodes, k: '기록된 분기점' },
  { v: stats.decisions, k: '기록된 결정' },
  { v: stats.rejected, k: '기각·보류한 대안' },
]

const thumbs: Record<string, React.ReactNode> = {
  'adsp-board': <Shot src={shotAdsp} alt="ADsP 보드 라이브 화면" />,
  'ai-relay': <Shot src={shotRelay} alt="AI 릴레이 라이브 화면" />,
  portfolio: <Shot src={shotPf} alt="포트폴리오 라이브 화면" />,
}

function highlightAI(text: string) {
  const i = text.lastIndexOf('AI')
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <span className="y">AI</span>
      {text.slice(i + 2)}
    </>
  )
}

export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <span className="sec-label">DX · AI-DRIVEN</span>
        <h1>
          판단은 사람이,
          <br />
          구현은 <span className="y">AI</span>가.
        </h1>
        <p className="sub">경영학부생이 AI를 통제해 배포한 라이브 서비스 3개.</p>
        <div className="cta">
          <a className="btn btn-y" href="/#works">
            실물 보기
          </a>
          <Link className="btn btn-o" to="/how">
            과정 보기
          </Link>
        </div>
        <div className="hero-visual">
          <div className="m1">
            <MockDashboard />
          </div>
          <div className="m2">
            <MockPanel />
          </div>
        </div>
      </section>

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

      <section className="sec wrap" id="works">
        <h2>
          실물이 <span className="y">증거</span>
        </h2>
        <div className="grid3">
          {cases.map((c) => (
            <div className="card" key={c.slug}>
              <Link to={`/case/${c.slug}`} className="thumb">
                {thumbs[c.slug]}
              </Link>
              <div className="meta">
                <Link to={`/case/${c.slug}`} className="t">
                  {c.doc.title}
                </Link>
                {c.live ? (
                  <a className="tag2" href={c.live} target="_blank" rel="noreferrer">
                    LIVE ↗
                  </a>
                ) : (
                  <Link className="tag2" to={`/case/${c.slug}`}>
                    PROCESS ↗
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec wrap" id="journey" style={{ paddingTop: 0 }}>
        <span className="sec-label">JOURNEY</span>
        <h2>{journey.tagline ? highlightAI(journey.tagline) : journey.title}</h2>
        <Timeline nodes={journey.nodes} />
      </section>

      <section className="sec wrap" id="about" style={{ paddingTop: 0 }}>
        <span className="sec-label">ABOUT</span>
        <h2>About</h2>
        <div className="about-grid">
          <div className="about-card">
            <div className="ak">학력</div>
            <ul>
              <li>
                광운대학교 경영학부
                <span className="d">학점 3.94 · 2027.02 졸업예정</span>
              </li>
            </ul>
          </div>
          <div className="about-card">
            <div className="ak">자격증</div>
            <ul>
              <li>
                SAP S/4HANA Cloud Private Edition
                <span className="d">SAP SE · 2025.07</span>
              </li>
              <li>
                Backend Developer — ABAP Cloud
                <span className="d">SAP SE · 2026.03</span>
              </li>
            </ul>
          </div>
          <div className="about-card">
            <div className="ak">수상</div>
            <ul>
              <li>
                글로벌챌린저 우수상
                <span className="d">광운대학교 · 2025.02 · 교내 2등</span>
              </li>
              <li>
                Dean&apos;s List
                <span className="d">광운대학교 · 2025-2학기 성적우수</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="contact wrap" id="contact">
        <h2>Contact</h2>
        <a className="mail" href="mailto:win737449@gmail.com">
          win737449@gmail.com
        </a>
      </section>
    </>
  )
}

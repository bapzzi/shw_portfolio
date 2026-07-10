// CSS 목업 시각물 — 승인 시안(docs/시안/다크시안-2026-07-10.html) 이관.
// §5 금지목록에 따라 고스트 워터마크·blob은 제외.

export function MockDashboard({ tight = false }: { tight?: boolean }) {
  return (
    <div className="mock">
      <div className="bar">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
      <div className={tight ? 'm-body tight' : 'm-body'}>
        <div className="row">
          <div className="cell y h20 w30" />
          <div className="cell h20 w70" />
        </div>
        <div className="bars" style={tight ? { height: 70 } : undefined}>
          <div className="b" style={{ height: '35%' }} />
          <div className="b" style={{ height: '60%' }} />
          <div className="b y" style={{ height: '95%' }} />
          <div className="b" style={{ height: '50%' }} />
          <div className="b" style={{ height: '75%' }} />
          <div className="b y" style={{ height: '85%' }} />
          <div className="b" style={{ height: '40%' }} />
        </div>
        {!tight && (
          <div className="row">
            <div className="cell h48 w45" />
            <div className="cell h48 w70" />
          </div>
        )}
      </div>
    </div>
  )
}

export function MockPanel({ tight = false }: { tight?: boolean }) {
  return (
    <div className="mock">
      <div className="bar">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
      <div className={tight ? 'm-body tight' : 'm-body'}>
        <div className="cell h20" style={{ width: '55%' }} />
        <div className="row">
          <div className="cell y h90 w45" />
          <div className="cell h90 w70" />
        </div>
        <div className="cell h48" />
      </div>
    </div>
  )
}

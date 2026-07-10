import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import CasePage from './pages/CasePage'
import How from './pages/How'
import { cases } from './lib/content'

// main.tsx와 동일한 라우트 트리 (BrowserRouter만 MemoryRouter로 대체)
function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/case/:slug" element={<CasePage />} />
          <Route path="/how" element={<How />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('라우팅과 핵심 화면', () => {
  it('홈: 히어로 헤드라인과 케이스 카드 3개가 보인다', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('판단은 사람이')
    for (const c of cases) {
      expect(screen.getAllByText(c.doc.title).length).toBeGreaterThan(0)
    }
  })

  it('케이스 페이지: 슬러그에 맞는 케이스 제목과 타임라인이 보인다', () => {
    const first = cases[0]
    renderAt(`/case/${first.slug}`)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(first.doc.title)
    expect(screen.getByText('DECISION TIMELINE')).toBeInTheDocument()
  })

  it('없는 슬러그는 홈으로 돌려보낸다', () => {
    renderAt('/case/없는-케이스')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('판단은 사람이')
  })
})

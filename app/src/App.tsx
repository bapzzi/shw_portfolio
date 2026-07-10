import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <header className="site-header">
        <div className="wrap in">
          <Link to="/" className="logo">
            신해원<span className="y">.</span>
          </Link>
          <nav>
            <NavLink to="/#works">실물</NavLink>
            <NavLink to="/#journey">여정</NavLink>
            <NavLink to="/how">작업 방식</NavLink>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">© 2026 신해원 · 판단은 사람이, 구현은 AI가.</footer>
    </>
  )
}

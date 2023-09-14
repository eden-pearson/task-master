import Nav from './Nav.tsx'
import Footer from './Footer.tsx'
import { Link, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>
      <nav>
        <Nav />
      </nav>
      <main id="main-content">
        <Outlet />
      </main>
      <footer>
        {' '}
        <Footer />{' '}
      </footer>
    </>
  )
}

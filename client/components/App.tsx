import Nav from './Nav.tsx'
import Footer from './Footer.tsx'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="flex flex-col bg-zinc-50 min-h-screen">
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>
      <nav>
        <Nav />
      </nav>
      <main id="main-content" className="flex-grow">
        <Outlet />
      </main>
      <footer className="p-4 shadow bg-white text-center">
        <Footer />
      </footer>
    </div>
  )
}

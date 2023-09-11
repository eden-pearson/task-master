import Nav from './Nav.tsx'
import Footer from './Footer.tsx'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <>
      <header>
        <h1 className="title">TaskMaster</h1>
      </header>
      <Nav />
      <Outlet />
      <Footer />
    </>
  )
}

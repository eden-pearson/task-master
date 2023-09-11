import Nav from './Nav.tsx'
// import Footer from './Footer.tsx'
import { Link, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <>
      <header>
        <Link to="/">
          <h1 className="title">TaskMaster</h1>
        </Link>
      </header>
      <Nav />
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}

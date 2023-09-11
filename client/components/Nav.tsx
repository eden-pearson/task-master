import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { useProfile } from '../hooks/users'

export default function Nav() {
  const { data: userData } = useProfile()
  const { user, logout, loginWithRedirect } = useAuth0()

  function handleSignOut() {
    logout({ returnTo: `${window.location.origin}/login` })
  }

  const handleSignIn = () => {
    loginWithRedirect({ redirectUri: `${window.location.origin}/register` })
  }

  if (user) {
    console.log(user)
  }

  return (
    <>
      <nav className="">
        <div className="">
          {!user ? (
            <button className="text-lg " onClick={handleSignIn}>
              Login
            </button>
          ) : (
            <button className="text-lg" onClick={handleSignOut}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </>
  )
}

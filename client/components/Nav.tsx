import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
// import { useUser } from '../hooks/users'

export default function Nav() {
  const { user, logout, loginWithRedirect } = useAuth0()

  function handleSignOut() {
    logout({ returnTo: `${window.location.origin}/` })
  }

  const handleSignIn = () => {
    loginWithRedirect({ redirectUri: `${window.location.origin}/register` })
  }

  if (user) {
    console.log(user)
  }

  return (
    <>
      <nav className="flex items-center bg-red-700 h-20 justify-between">
        <img
          src="TaskMaster-white-logo.png"
          alt="TaskMaster logo"
          className="h-20 ml-4"
        ></img>
        <div className="mr-4">
          {!user ? (
            <button
              className="text-lg text-white hover:text-xl focus:outline-none focus:ring-2"
              onClick={handleSignIn}
            >
              Login
            </button>
          ) : (
            <div className="flex gap-6">
              <button
                className="text-lg text-white hover:text-xl focus:outline-none focus:ring-2"
                onClick={handleSignOut}
              >
                Logout
              </button>
              <img
                className="h-14 rounded-full"
                src={user.picture}
                alt={`${user.name} profile`}
              ></img>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

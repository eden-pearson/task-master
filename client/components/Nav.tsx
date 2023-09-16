import { useAuth0 } from '@auth0/auth0-react'

export default function Nav() {
  const { user, logout } = useAuth0()

  function handleSignOut() {
    logout({ returnTo: `${window.location.origin}/` })
  }

  return (
    <>
      <nav className="flex items-center bg-red-700 h-20 justify-between">
        <img
          src="images/TaskMaster-white-logo.png"
          alt="TaskMaster logo"
          className="h-20 ml-4"
        ></img>
        <div className="mr-4">
          {user ? (
            <div className="flex gap-6">
              <button
                tabIndex={0}
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
          ) : (
            ''
          )}
        </div>
      </nav>
    </>
  )
}

import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import AddTodo from './AddTodo.tsx'
import TodoList from './TodoList.tsx'
// import Filters from './Filters.tsx'

export default function Home() {
  const { loginWithRedirect } = useAuth0()

  const handleSignIn = () => {
    loginWithRedirect({ redirectUri: `${window.location.origin}/register` })
  }
  return (
    <>
      <IfAuthenticated>
        <section>
          <div
            id="main"
            className="font-sans text-gray-900 bg-zinc-50 antialiased font-light min-w-[230px] max-w-[550px] mx-auto leading-[1.4em] text-[14px]"
          >
            <div className="bg-white mt-20 mb-6 relative shadow-lg">
              <AddTodo />
              <TodoList />
            </div>
          </div>
          <p className="text-gray-400 text-center mb-14">
            Double-click to edit a task
          </p>
        </section>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <div className="flex-col text-center justify-center mt-40">
          <div className="text-3xl mb-11">Welcome to TaskMaster!</div>
          <div>
            <button
              onClick={handleSignIn}
              className="bg-red-700 text-xl text-white rounded-lg px-4 py-2"
            >
              login
            </button>
          </div>
        </div>
      </IfNotAuthenticated>
    </>
  )
}

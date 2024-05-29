import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import AddTodo from './AddTodo.tsx'
import ToDoList from './TodoList.tsx'
import { useQuery } from '@tanstack/react-query'
import { getTasksByAuthId } from '../apis/tasks.ts'

export default function Home() {
  const { getAccessTokenSilently } = useAuth0()
  const { loginWithRedirect } = useAuth0()

  const handleSignIn = () => {
    loginWithRedirect({ redirectUri: `${window.location.origin}/register` })
  }

  const { data: allTasks } = useQuery(['tasks'], async () => {
    const token = await getAccessTokenSilently()
    return getTasksByAuthId(token)
  })

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
              <ToDoList />
            </div>
          </div>
          <p className="text-gray-500 text-center mb-14">
            {allTasks && allTasks.length > 0
              ? 'Double-click to edit a task'
              : 'Press enter to add your first task'}
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

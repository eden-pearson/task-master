import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import AddTodo from './AddTodo.tsx'
import TodoList from './TodoList.tsx'
// import Filters from './Filters.tsx'

export default function Home() {
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
        <div className="flex items-center justify-center mt-40">
          <p>Welcome to TaskMaster! please login to get started</p>
        </div>
      </IfNotAuthenticated>
    </>
  )
}

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
            className="m-0 p-0 font-sans text-gray-900 bg-gray-100 antialiased font-light min-w-[230px] max-w-[550px] mx-auto leading-[1.4em] text-[14px]"
          >
            <div className="bg-white my-[130px] mt-[40px] relative shadow-lg">
              <AddTodo />
              <TodoList />
              {/* <Filters /> */}
            </div>
          </div>
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

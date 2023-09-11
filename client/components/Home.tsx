import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import AddTodo from './AddTodo.tsx'
import TodoList from './TodoList.tsx'

export default function Home() {
  return (
    <>
      {/* <IfAuthenticated> */}
      <section id="main">
        <AddTodo />
        <TodoList />
      </section>
      {/* </IfAuthenticated>
      <IfNotAuthenticated>
        <div className="flex items-center justify-center mt-40">
          <p>Welcome to TaskMaster! please login to get started</p>
        </div>
      </IfNotAuthenticated> */}
    </>
  )
}

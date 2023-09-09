import AddTodo from './AddTodo.tsx'
import TodoList from './TodoList.tsx'
// import Footer from './Footer.tsx'

function App() {
  return (
    <>
      <header className="header">
        <h1>TaskMaster</h1>
      </header>
      <section className="main">
        <AddTodo />
        <TodoList />
      </section>
    </>
  )
}

export default App

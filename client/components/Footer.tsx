import { useQuery } from '@tanstack/react-query'
import { getAllTasks, getIncompleteTasks } from '../apis/tasks'
import { useState } from 'react'

export default function Footer() {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery(['tasks'], () => getAllTasks())

  const [active, setActive] = useState(false)
  const [completed, setCompleted] = useState(false)

  const {
    data: incompleteTasks,
    isLoading: incompleteTasksLoading,
    error: incompleteTasksError,
  } = useQuery(['incompleteTasks'], () => getIncompleteTasks())

  if (isLoading || incompleteTasksLoading) {
    return <div>Tasks loading...</div>
  }

  if (error instanceof Error) {
    return <div>Tasks error: {error.message}</div>
  }

  return (
    <div>
      {/* <!-- This should be `0 items left` by default --> */}
      <span className="todo-count">
        <strong>{0}</strong> item left
      </span>
      {/* <!-- Remove this if you don't implement routing --> */}
      <ul className="filters">
        <li>
          <a className="selected" href="#/">
            All
          </a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      {/* <!-- Hidden if no completed items are left ↓ --> */}
      <button className="clear-completed">Clear completed</button>
    </div>
  )
}

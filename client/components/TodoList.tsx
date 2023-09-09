import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import {
  getAllTasks,
  getCompletedTasks,
  getIncompleteTasks,
  updateTask,
} from '../apis/tasks'
import { useState } from 'react'

export default function TodoList() {
  const queryClient = useQueryClient()
  const [active, setActive] = useState(false)
  const [completed, setCompleted] = useState(false)

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery(['tasks'], () => getAllTasks())
  const {
    data: incompleteTasks,
    isLoading: incompleteTasksLoading,
    error: incompleteTasksError,
  } = useQuery(['incompleteTasks'], () => getIncompleteTasks())
  const {
    data: completedTasks,
    isLoading: completedTasksLoading,
    error: completedTasksError,
  } = useQuery(['completedTasks'], () => getCompletedTasks())
  const taskComplete = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        'tasks',
        'incompleteTasks',
        'completedTasks',
      ])
    },
  })

  if (isLoading || incompleteTasksLoading || completedTasksLoading) {
    return <div>Tasks loading...</div>
  }

  if (error instanceof Error) {
    return <div>Tasks error: {error.message}</div>
  }

  console.log(tasks)

  function handleChange(task, event) {
    const isChecked = event.target.checked
    if (isChecked) {
      taskComplete.mutate({ ...task, completed: true })
    } else {
      taskComplete.mutate({ ...task, completed: false })
    }
  }

  function handleAllClick() {
    setActive(false)
    setCompleted(false)
  }

  function handleActiveClick() {
    setActive(true)
    setCompleted(false)
  }

  function handleCompletedClick() {
    setActive(false)
    setCompleted(true)
  }

  return (
    <div>
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {!active && !completed
          ? tasks.map((task) => {
              return (
                <li key={task.id} className={task.completed ? 'completed' : ''}>
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={task.completed}
                      onChange={(event) => handleChange(task, event)}
                    />
                    <label>{task.name}</label>
                    <button
                      className={task.completed ? 'destroy' : ''}
                    ></button>
                  </div>
                  <input className="edit" value={task.name} />
                </li>
              )
            })
          : active
          ? incompleteTasks.map((task) => {
              return (
                <li key={task.id} className={task.completed ? 'completed' : ''}>
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={task.completed}
                      onChange={(event) => handleChange(task, event)}
                    />
                    <label>{task.name}</label>
                    <button
                      className={task.completed ? 'destroy' : ''}
                    ></button>
                  </div>
                  <input className="edit" value={task.name} />
                </li>
              )
            })
          : completedTasks.map((task) => {
              return (
                <li key={task.id} className={task.completed ? 'completed' : ''}>
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={task.completed}
                      onChange={(event) => handleChange(task, event)}
                    />
                    <label>{task.name}</label>
                    <button
                      className={task.completed ? 'destroy' : ''}
                    ></button>
                  </div>
                  <input className="edit" value={task.name} />
                </li>
              )
            })}
      </ul>
      <div className="footer">
        {/* <!-- This should be `0 items left` by default --> */}
        <span className="todo-count">
          <strong>{0}</strong> item left
        </span>
        {/* <!-- Remove this if you don't implement routing --> */}
        <ul className="filters">
          <li>
            <button
              onClick={handleAllClick}
              className={!active && !completed ? 'selected' : ''}
            >
              All
            </button>
          </li>
          <li>
            <button
              onClick={handleActiveClick}
              className={active ? 'selected' : ''}
            >
              Active
            </button>
          </li>
          <li>
            <button
              onClick={handleCompletedClick}
              className={completed ? 'selected' : ''}
            >
              Completed
            </button>
          </li>
        </ul>
        {/* <!-- Hidden if no completed items are left ↓ --> */}
        <button className="clear-completed">Clear completed</button>
      </div>
    </div>
  )
}

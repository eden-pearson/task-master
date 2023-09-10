import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import {
  deleteTask,
  getAllTasks,
  getCompletedTasks,
  getIncompleteTasks,
  updateTask,
  updateTaskStatus,
} from '../apis/tasks'
import { useState } from 'react'

export default function TodoList() {
  const queryClient = useQueryClient()
  const [active, setActive] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [editTaskName, setEditTaskName] = useState('')

  const {
    data: tasks,
    isLoading,
    isError,
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
  const taskComplete = useMutation(updateTaskStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        'tasks',
        'incompleteTasks',
        'completedTasks',
      ])
    },
  })
  const [tasksList, setTasksList] = useState(tasks)
  const [count, setCount] = useState(incompleteTasks?.length || 0)

  const taskEdit = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        'tasks',
        'incompleteTasks',
        'completedTasks',
      ])
    },
  })

  const taskDeletion = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        'tasks',
        'incompleteTasks',
        'completedTasks',
      ])
    },
  })

  if (isError) {
    return <div>Error retrieving tasks</div>
  }

  if (isLoading || incompleteTasksLoading || completedTasksLoading) {
    return <div>Tasks loading...</div>
  }
  function handleChange(id, event) {
    const isChecked = event.target.checked
    taskComplete.mutate({ id, status: isChecked })
  }

  function filterAll() {
    setActive(false)
    setCompleted(false)
    queryClient.invalidateQueries([
      'tasks',
      'incompleteTasks',
      'completedTasks',
    ])
  }

  function filterActive() {
    setActive(true)
    setCompleted(false)
    setTasksList(incompleteTasks)
    queryClient.invalidateQueries([
      'tasks',
      'incompleteTasks',
      'completedTasks',
    ])
  }

  function filterCompleted() {
    setActive(false)
    setCompleted(true)
    setTasksList(completedTasks)
    queryClient.invalidateQueries([
      'tasks',
      'incompleteTasks',
      'completedTasks',
    ])
  }

  function handleDoubleClick(id) {
    setEditTask(id)
  }

  function handleEditInputChange(event) {
    setEditTaskName(event.target.value)
  }

  function saveEditedTask(event, id) {
    event.preventDefault()
    taskEdit.mutate({ id, name: editTaskName })
    setEditTask(null)
    setCount(incompleteTasks.length)
  }

  function deleteTaskClick(id: number) {
    taskDeletion.mutate(id)
    setCount(incompleteTasks.length)
  }

  return (
    <div>
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {tasks.map((task) => {
          return (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={task.completed}
                  onChange={(event) => handleChange(task.id, event)}
                />
                {task.id === editTask ? (
                  <form onSubmit={(event) => saveEditedTask(event, task.id)}>
                    <input
                      className="edit"
                      value={editTaskName}
                      onChange={(event) => handleEditInputChange(event)}
                      autoFocus
                      onBlur={(event) => saveEditedTask(event, task.id)}
                    />
                  </form>
                ) : (
                  <label onDoubleClick={() => handleDoubleClick(task.id)}>
                    {task.name}
                  </label>
                )}
                <button
                  onClick={() => deleteTaskClick(task.id)}
                  className="destroy"
                ></button>
              </div>
            </li>
          )
        })}
      </ul>
      <div className="footer">
        <span className="todo-count">
          <strong>{count}</strong> {count === 1 ? 'item' : 'items'} left
        </span>
        <ul className="filters">
          <li>
            <button
              onClick={filterAll}
              className={!active && !completed ? 'selected' : ''}
            >
              All
            </button>
          </li>
          <li>
            <button onClick={filterActive} className={active ? 'selected' : ''}>
              Active
            </button>
          </li>
          <li>
            <button
              onClick={filterCompleted}
              className={completed ? 'selected' : ''}
            >
              Completed
            </button>
          </li>
        </ul>
        {completedTasks?.length > 0 ? (
          <button className="clear-completed">Clear completed</button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

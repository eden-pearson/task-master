import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import {
  deleteTask,
  getTasksByAuthId,
  updateTask,
  updateTaskStatus,
} from '../apis/tasks'
import { useEffect, useState } from 'react'
import { Task } from '../../models/tasks'
import { useAuth0 } from '@auth0/auth0-react'
import Filter from './Filter'

export default function TodoList() {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()
  const [tasks, setTasks] = useState<Task[]>([])
  const [editTaskId, setEditTaskId] = useState<number | null>(null)
  const [taskForm, setTaskForm] = useState('')
  const [active, setActive] = useState(false)
  const [completed, setCompleted] = useState(false)

  const {
    data: allTasks,
    isLoading,
    error,
  } = useQuery(['tasks'], async () => {
    const token = await getAccessTokenSilently()
    return getTasksByAuthId(token)
  })

  const taskComplete = useMutation(updateTaskStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })
  const editTask = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })
  const removeTask = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  useEffect(() => {
    if (allTasks) {
      setTasks(allTasks)
    }
  }, [allTasks])

  if (isLoading) {
    return (
      <div role="status" aria-live="polite">
        Tasks loading...
      </div>
    )
  }

  if (error) {
    error instanceof Error ? (
      <div role="alert">Something went wrong: {error.message}</div>
    ) : (
      <div role="alert">An unknown error has occurred</div>
    )
  }

  function handleStatusChange(
    taskId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const isChecked = event.target.checked
    taskComplete.mutate({ id: taskId, completed: isChecked })
  }

  function deleteTaskClick(taskId: number) {
    removeTask.mutate(taskId)
  }

  function handleDoubleClick(taskId: number, taskName: string) {
    setEditTaskId(taskId)
    setTaskForm(taskName)
  }

  function handleTaskChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTaskForm(event.target.value)
  }

  function submitTaskUpdate(taskId: number) {
    editTask.mutate({ id: taskId, name: taskForm })
    setEditTaskId(null)
    setTaskForm('')
  }

  function filterByAll() {
    if (allTasks) {
      setActive(false)
      setCompleted(false)
      setTasks(allTasks)
    }
  }

  function filterByActive() {
    if (allTasks) {
      setActive(true)
      setCompleted(false)
      setTasks(allTasks.filter((task) => task.completed === 0))
    }
  }

  function filterByCompleted() {
    if (allTasks) {
      setActive(false)
      setCompleted(true)
      setTasks(allTasks.filter((task) => task.completed === 1))
    }
  }
  function handleClearCompleted() {
    for (const task of tasks.filter((task) => task.completed === 1)) {
      removeTask.mutate(task.id)
    }
  }

  return (
    <div>
      <h2 className="sr-only" id="todo-header">
        Tasks List
      </h2>
      <a
        href="#filters-section"
        className="sr-only focus:not-sr-only"
        tabIndex={0}
      >
        Skip to filters
      </a>
      <ul aria-labelledby="todo-header" id="todoList" className="todo-list">
        {allTasks &&
          tasks.length > 0 &&
          tasks.map((task) => {
            return (
              <li
                key={task.id}
                className={`group flex items-center justify-between px-4 py-3 text-xl border-b border-gray-400 `}
              >
                <div className="flex">
                  <input
                    id={`${task.id}-checkbox`}
                    className={`appearance-none bg-color-none h-10 w-10 rounded-full absolute`}
                    type="checkbox"
                    checked={Boolean(task.completed)}
                    onChange={(event) => handleStatusChange(task.id, event)}
                    aria-label={
                      task.completed
                        ? `Mark "${task.name}" as incomplete`
                        : `Mark "${task.name}" as complete`
                    }
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        event.currentTarget.click()
                      }
                    }}
                    tabIndex={0}
                  />
                  <label
                    aria-label={`Mark task "${task.name}" as complete`}
                    htmlFor={`${task.id}-checkbox`}
                    className={`w-10 h-10 bg-no-repeat bg-center cursor-pointer ${
                      task.completed ? 'checked' : 'unchecked'
                    }`}
                  />
                  {editTaskId === task.id ? (
                    <input
                      type="text"
                      className="ml-4 border focus:shadow-md"
                      onChange={(event) => handleTaskChange(event)}
                      onBlur={() => submitTaskUpdate(task.id)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          submitTaskUpdate(task.id)
                        }
                      }}
                      value={taskForm}
                      aria-label={`Edit task "${task.name}"`}
                    />
                  ) : (
                    <div
                      className={`ml-4 ${
                        task.completed ? 'text-gray-500 line-through' : ''
                      }`}
                      aria-label="Edit task name"
                      onDoubleClick={() =>
                        handleDoubleClick(task.id, task.name)
                      }
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          handleDoubleClick(task.id, task.name)
                        }
                      }}
                      tabIndex={0}
                      role="button"
                    >
                      {task.name}
                    </div>
                  )}
                </div>
                <button
                  className="opacity-0 w-10 h-10 text-3xl transition-colors duration-200 ease-out text-red-400 mr-3 group-hover:opacity-100 focus:opacity-100"
                  onClick={() => deleteTaskClick(task.id)}
                  aria-label={`Delete task "${task.name}"`}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      deleteTaskClick(task.id)
                    }
                  }}
                  tabIndex={0}
                >
                  x
                </button>
              </li>
            )
          })}
      </ul>
      <div>
        <Filter
          active={active}
          completed={completed}
          allTasks={allTasks}
          filterByAll={filterByAll}
          filterByActive={filterByActive}
          filterByCompleted={filterByCompleted}
          handleClearCompleted={handleClearCompleted}
        />
      </div>
    </div>
  )
}

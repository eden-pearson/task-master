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
import ToDoItem from './ToDoItem'

interface FilterTypes {
  all: undefined
  active: undefined
  completed: undefined
}

interface FilterFunctions {
  all: (tasks: Task[]) => Task[]
  active: (tasks: Task[]) => Task[]
  completed: (tasks: Task[]) => Task[]
}

export default function ToDoList() {
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()
  const [tasks, setTasks] = useState<Task[]>([])
  const [editTaskId, setEditTaskId] = useState<number | null>(null)
  const [taskForm, setTaskForm] = useState('')
  const [currentFilter, setCurrentFilter] = useState<
    'active' | 'all' | 'completed'
  >('all')

  const {
    data: allTasks,
    isLoading,
    error,
  } = useQuery(['tasks'], async () => {
    const token = await getAccessTokenSilently()
    return getTasksByAuthId(token)
  })

  const filterFunctions: FilterFunctions = {
    all: (tasks: Task[]) => tasks,
    active: (tasks: Task[]) => tasks.filter((task) => task.completed === 0),
    completed: (tasks: Task[]) => tasks.filter((task) => task.completed === 1),
  }

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

  if (error) {
    return error instanceof Error ? (
      <div role="alert">Something went wrong: {error.message}</div>
    ) : (
      <div role="alert">An unknown error has occurred</div>
    )
  }

  if (isLoading) {
    return (
      <div role="status" aria-live="polite">
        Tasks loading...
      </div>
    )
  }

  function handleStatusChange(
    taskId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const isChecked = event.target.checked
    taskComplete.mutate({ id: taskId, completed: isChecked })
  }

  function handleDeleteClick(taskId: number) {
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

  function changeFilter(filter: keyof FilterTypes) {
    setCurrentFilter(filter)
    setTasks(filterFunctions[filter](allTasks || []))
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
              <ToDoItem
                key={task.id}
                task={task}
                handleStatusChange={handleStatusChange}
                deleteTaskClick={handleDeleteClick}
                handleDoubleClick={handleDoubleClick}
                taskForm={taskForm}
                handleTaskChange={handleTaskChange}
                editTaskId={editTaskId}
                submitTaskUpdate={submitTaskUpdate}
              />
            )
          })}
      </ul>
      <div id="filters-section">
        <Filter
          currentFilter={currentFilter}
          allTasks={allTasks}
          changeFilter={changeFilter}
          handleClearCompleted={handleClearCompleted}
        />
      </div>
    </div>
  )
}

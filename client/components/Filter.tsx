import React from 'react'
import { Task } from '../../models/tasks'

interface FiltersProps {
  active: boolean
  completed: boolean
  allTasks: Task[] | undefined
  filterByAll: () => void
  filterByActive: () => void
  filterByCompleted: () => void
  handleClearCompleted: () => void
}

const Filters: React.FC<FiltersProps> = ({
  active,
  completed,
  allTasks,
  filterByAll,
  filterByActive,
  filterByCompleted,
  handleClearCompleted,
}) => {
  return (
    <div className="flex justify-between items-center p-4">
      <span className="todo-count">
        <strong>
          {allTasks?.filter((task) => task.completed === 0).length || 0}
        </strong>{' '}
        items left
      </span>
      {allTasks && allTasks.length > 0 ? (
        <ul className="m-0 p-0 list-none">
          <li className="inline">
            <button
              onClick={filterByAll}
              className={`p-2 mx-3 rounded-md hover:border hover:border-red-200 ${
                !active && !completed ? 'border border-red-400' : ''
              } `}
            >
              All
            </button>
          </li>
          <li className="inline">
            <button
              onClick={filterByActive}
              className={`p-2 mx-3 rounded-md hover:border hover:border-red-200 ${
                active ? 'border border-red-400' : ''
              }`}
            >
              Active
            </button>
          </li>
          <li className="inline">
            <button
              onClick={filterByCompleted}
              className={`rounded-md p-2 mx-3 hover:border hover:border-red-200 ${
                completed ? 'border border-red-400' : ''
              } `}
            >
              Completed
            </button>
          </li>
        </ul>
      ) : (
        <div></div>
      )}
      <button
        className={`float-right relative align-middle hover:underline no-underline cursor-pointer ${
          allTasks?.filter((task) => task.completed === 1).length === 0
            ? 'invisible'
            : ''
        }`}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </div>
  )
}

export default Filters

import { Task } from '../../models/tasks'

interface Props {
  currentFilter: 'active' | 'all' | 'completed'
  allTasks: Task[] | undefined
  changeFilter: (filter: 'active' | 'all' | 'completed') => void
  handleClearCompleted: () => void
}

// React.FC<FilterProps>

export default function Filter({
  currentFilter,
  allTasks,
  changeFilter,
  handleClearCompleted,
}: Props) {
  return (
    <div className="flex justify-between items-center p-4">
      <span className="todo-count">
        <strong>
          {allTasks?.filter((task) => task.completed === 0).length || 0}
        </strong>
        items left
      </span>
      {allTasks && allTasks.length > 0 ? (
        <ul className="m-0 p-0 list-none">
          <li className="inline">
            <button
              onClick={() => changeFilter('all')}
              className={`p-2 mx-3 rounded-md hover:border hover:border-red-200 ${
                currentFilter === 'all' ? 'border border-red-400' : ''
              } `}
            >
              All
            </button>
          </li>
          <li className="inline">
            <button
              onClick={() => changeFilter('active')}
              className={`p-2 mx-3 rounded-md hover:border hover:border-red-200 ${
                currentFilter === 'active' ? 'border border-red-400' : ''
              }`}
            >
              Active
            </button>
          </li>
          <li className="inline">
            <button
              onClick={() => changeFilter('completed')}
              className={`rounded-md p-2 mx-3 hover:border hover:border-red-200 ${
                currentFilter === 'completed' ? 'border border-red-400' : ''
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

import { Task } from '../../models/tasks'

interface Props {
  task: Task
  handleStatusChange: (
    taskId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  deleteTaskClick: (taskId: number) => void
  handleDoubleClick: (taskId: number, taskName: string) => void
  taskForm: string
  handleTaskChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  editTaskId: number | null
  submitTaskUpdate: (taskId: number) => void
}

export default function TodoItem({
  task,
  handleStatusChange,
  deleteTaskClick,
  handleDoubleClick,
  taskForm,
  handleTaskChange,
  editTaskId,
  submitTaskUpdate,
}: Props) {
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
            onDoubleClick={() => handleDoubleClick(task.id, task.name)}
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
}

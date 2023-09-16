import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createTask } from '../apis/tasks'
import { useAuth0 } from '@auth0/auth0-react'

// eslint-disable-next-line no-unused-vars
function AddTodo() {
  const { getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()
  const [task, setTask] = useState('')
  const taskMutation = useMutation(createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value)
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const token = await getAccessTokenSilently()
    taskMutation.mutate({ task, token })
    setTask('')
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Add new task">
      <label htmlFor="todo-input" className="sr-only">
        New Todo
      </label>
      <input
        id="todo-input"
        onChange={handleChange}
        className="w-full text-2xl font-inherit text-inherit leading-[1.4em] p-4 border border-gray-400 shadow-inner"
        type="text"
        placeholder="What needs to be done?"
        value={task}
      />
    </form>
  )
}

export default AddTodo

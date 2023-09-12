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
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus={true}
        value={task}
      />
    </form>
  )
}

export default AddTodo

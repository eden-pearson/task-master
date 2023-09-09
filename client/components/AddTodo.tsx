import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createTask } from '../apis/tasks'

// eslint-disable-next-line no-unused-vars
function AddTodo() {
  const queryClient = useQueryClient()
  const [form, setForm] = useState('')
  const taskMutation = useMutation(createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm(event.target.value)
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    taskMutation.mutate(form)
    setForm('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus={true}
        value={form}
      />
    </form>
  )
}

export default AddTodo

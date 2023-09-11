import request from 'superagent'
import { Task, TaskObject } from '../../models/tasks'
const apiUrl = '/api/v1/tasks'

export async function getAllTasks(): Promise<Task[]> {
  const response = await request.get(apiUrl)
  return response.body
}

// export async function getTask(taskId: number): Promise<Task> {
//   const response = await request.get(`${apiUrl}/${taskId}`)
//   return response.body
// }

export async function createTask(task: string): Promise<Task> {
  const response = await request.post(apiUrl).send({ name: task })
  return response.body
}

export async function updateTask(taskObject: TaskObject): Promise<Task[]> {
  const { id, name } = taskObject
  const response = await request.patch(`${apiUrl}/${id}`).send({ name })
  return response.body
}

export async function updateTaskStatus(
  taskObject: TaskObject
): Promise<Task[]> {
  const { id, completed } = taskObject
  const response = await request.patch(`${apiUrl}/${id}/status/${completed}`)
  return response.body
}

export async function deleteTask(id: number): Promise<number> {
  const response = await request.delete(`${apiUrl}/${id}`)
  return response.body
}

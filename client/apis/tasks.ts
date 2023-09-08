import request from 'superagent'
import { Task } from '../../models/tasks'
const apiUrl = '/api/v1/tasks'

export async function getAllTasks(): Promise<Task[]> {
  const response = await request.get(apiUrl)
  return response.body
}

export async function getTask(taskId: number): Promise<Task> {
  const response = await request.get(`${apiUrl}/${taskId}`)
  return response.body
}

export async function getIncompleteTasks(): Promise<Task[]> {
  const response = await request.get(`${apiUrl}/incomplete`)
  return response.body
}

export async function getCompletedTasks(): Promise<Task[]> {
  const response = await request.get(`${apiUrl}/complete`)
  return response.body
}

export async function createTask(task: string): Promise<Task> {
  const response = await request.post(apiUrl).send({ name: task })
  return response.body
}

export async function updateTask(id: number, task: Task): Promise<Task[]> {
  const response = await request.patch(`${apiUrl}/${id}`).send({ name: task })
  return response.body
}

export async function deleteTask(id: number): Promise<number> {
  const response = await request.delete(`${apiUrl}/${id}`)
  return response.body
}

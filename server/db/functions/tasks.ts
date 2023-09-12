import db from '../connection.ts'
import { Task } from '../../../models/tasks.ts'

export async function getTasksByAuthId(auth0Id: string): Promise<Task[]> {
  return db('tasks').where('auth0_id', auth0Id).select('*')
}

export function createTask(task: string, auth0Id: string): Promise<Task[]> {
  return db('tasks').insert({ name: task, auth0_id: auth0Id }).returning('*')
}

export function updateTask(id: number, task: string): Promise<Task[]> {
  return db('tasks').update({ name: task }).where({ id }).returning('*')
}

export function updateTaskStatus(id: number, status: boolean): Promise<Task[]> {
  return db('tasks').update({ completed: status }).where({ id }).returning('*')
}

export function deleteTask(id: number): Promise<number> {
  return db('tasks').del().where({ id })
}

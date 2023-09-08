import db from '../connection.ts'
import { Task } from '../../../models/tasks.ts'

export async function getAllTasks(): Promise<Task[]> {
  return db('tasks').select('*')
}

export async function getIncompleteTasks(): Promise<Task[]> {
  return db('tasks').select('*').where({ completed: false })
}

export async function getCompletedTasks(): Promise<Task[]> {
  return db('tasks').select('*').where({ completed: true })
}

export function getTask(id: number): Promise<Task> {
  return db('tasks').select().where({ id }).first()
}

export function createTask(task: string): Promise<Task[]> {
  return db('tasks').insert({ name: task }).returning('*')
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

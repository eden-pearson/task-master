import { it, describe, expect, beforeEach } from 'vitest'
import connection from '../connection.ts'
import * as db from '../functions/tasks.ts'

beforeEach(async () => {
  await connection.migrate.rollback()
  await connection.migrate.latest()
  await connection.seed.run()
})

describe('getAllTasks', () => {
  it('gets all tasks', async () => {
    const tasks = await db.getTasksByAuthId('auth0|567')
    expect(tasks).toHaveLength(11)
  })
})

describe('createTask', () => {
  it('adds a new task to db', async () => {
    const task = 'test task'
    const response = await db.createTask(task, 'auth0|567')
    expect(response[0].name).toBe(task)
  })
})

describe('updateTaskStatus', () => {
  it('adds a new task to db', async () => {
    const updatedTask = 'test updated task'
    const response = await db.updateTask(1, updatedTask)
    expect(response[0].name).toBe(updatedTask)
  })
})

describe('updateTaskStatus', () => {
  it('adds a new task to db', async () => {
    const task = await db.updateTaskStatus(1, true)
    expect(Boolean(task[0].completed)).toEqual(true)
  })
})

describe('deleteTask', () => {
  it('deletes a task by id', async () => {
    await db.deleteTask(1)
    const tasks = await db.getTasksByAuthId('auth0|567')
    expect(tasks.length).toBe(10)
  })
})

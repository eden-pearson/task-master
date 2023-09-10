import { it, describe, expect, beforeEach, vi } from 'vitest'
import connection from '../../connection'
import * as db from '../tasks'

// vi.useFakeTimers()
// vi.setSystemTime(1694123118427)

beforeEach(async () => {
  await connection.migrate.rollback()
  await connection.migrate.latest()
  await connection.seed.run()
})

describe('getAllTasks', () => {
  it('gets all tasks', async () => {
    const tasks = await db.getAllTasks()
    expect(tasks).toHaveLength(11)
  })
})

describe('getIncompleteTasks', () => {
  it('gets all incomplete tasks', async () => {
    const tasks = await db.getIncompleteTasks()
    expect(tasks).toHaveLength(11)
  })
})

describe('getCompletedTasks', () => {
  it('gets all completed tasks', async () => {
    const tasks = await db.getCompletedTasks()
    expect(tasks).toHaveLength(0)
  })
})

describe('getTask', () => {
  it('gets a task by id', async () => {
    const tasks = await db.getTask(1)
    expect(tasks.name).toBe('CP01 trello ticket')
  })
})

describe('createTask', () => {
  it('adds a new task to db', async () => {
    const task = 'test task'
    const response = await db.createTask(task)
    expect(response[0].name).toBe('test task')
  })
})

describe('updateTaskStatus', () => {
  it('adds a new task to db', async () => {
    const updatedTask = 'test updated task'
    const response = await db.updateTask(1, updatedTask)
    expect(response[0].name).toBe('test updated task')
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
    const tasks = await db.getAllTasks()
    expect(tasks.length).toBe(10)
  })
})

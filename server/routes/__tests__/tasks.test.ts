import { it, describe, expect, vi } from 'vitest'
import request from 'supertest'

import server from '../../server.ts'
import * as db from '../../db/functions/tasks.ts'

vi.mock('../../db/functions/tasks.ts')

describe('GET /api/v1/tasks', () => {
  it.skip('should return an array of tasks', async () => {
    const mockTasks = [
      {
        id: 1,
        name: 'CP01 trello ticket',
        completed: false,
        created_at: '2023-09-08 02:26:25',
        updated_at: '2023-09-08 02:26:25',
      },
      {
        id: 2,
        name: 'CP02 trello ticket',
        completed: false,
        created_at: '2023-09-08 02:26:25',
        updated_at: '2023-09-08 02:26:25',
      },
    ]
    vi.mocked(db.getTasksByAuthId).mockResolvedValue(mockTasks)

    const response = await request(server).get('/api/v1/tasks')

    expect(response.status).toBe(200)
    expect(response.body).toMatchInlineSnapshot(`
      [
        {
          "completed": false,
          "created_at": "2023-09-08 02:26:25",
          "id": 1,
          "name": "CP01 trello ticket",
          "updated_at": "2023-09-08 02:26:25",
        },
        {
          "completed": false,
          "created_at": "2023-09-08 02:26:25",
          "id": 2,
          "name": "CP02 trello ticket",
          "updated_at": "2023-09-08 02:26:25",
        },
      ]
    `)
  })

  it.skip('should return an error message when the db fails', async () => {
    vi.mocked(db.getTasksByAuthId).mockRejectedValue(
      new Error('SQLITE ERROR: sad')
    )

    vi.spyOn(console, 'log').mockImplementation(() => {})

    const response = await request(server).get('/api/v1/tasks')

    expect(console.log).toHaveBeenCalledWith(new Error('SQLITE ERROR: sad'))
    expect(response.body.error).toBe(
      'Uh oh! Something went wrong when getting the list of tasks'
    )
  })
})

describe('POST /api/v1/tasks', () => {
  it.skip('should return the newly added task', async () => {
    const mockTask = [
      {
        id: 1,
        name: 'Something more fun',
        completed: false,
        created_at: '2023-09-08 02:26:25',
        updated_at: '2023-09-08 02:26:25',
      },
    ]
    vi.mocked(db.createTask).mockResolvedValue(mockTask)
    const response = await request(server).post('/api/v1/tasks')

    expect(response.status).toBe(200)
    expect(response.body).toMatchInlineSnapshot(`
      [
        {
          "completed": false,
          "created_at": "2023-09-08 02:26:25",
          "id": 1,
          "name": "Something more fun",
          "updated_at": "2023-09-08 02:26:25",
        },
      ]
    `)
  })

  it.skip('should return an error message when the db fails', async () => {
    vi.mocked(db.createTask).mockRejectedValue(new Error('SQLITE ERROR: sad'))

    vi.spyOn(console, 'log').mockImplementation(() => {})

    const response = await request(server).post('/api/v1/tasks')

    expect(console.log).toHaveBeenCalledWith(new Error('SQLITE ERROR: sad'))
    expect(response.body.error).toBe(
      'Uh oh! Something went wrong when adding your task to the database'
    )
  })
})

describe('PATCH /api/v1/tasks/:id', () => {
  it('should return the updated task', async () => {
    const mockTask = [
      {
        id: 1,
        name: 'something',
        completed: 0,
        created_at: '2023-09-10 22:15:47',
        updated_at: '2023-09-10 22:15:47',
      },
    ]
    vi.mocked(db.updateTask).mockResolvedValue(mockTask)
    const response = await request(server).patch('/api/v1/tasks/1')

    expect(response.status).toBe(200)
    expect(response.body).toMatchInlineSnapshot(`
      [
        {
          "completed": 0,
          "created_at": "2023-09-10 22:15:47",
          "id": 1,
          "name": "something",
          "updated_at": "2023-09-10 22:15:47",
        },
      ]
    `)
  })

  it('should send 400 status when id is NaN', async () => {
    vi.mocked(db.updateTask).mockRejectedValue(new Error('Bad Request'))
    const response = await request(server).patch('/api/v1/tasks/one')

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Task ID must be a number')
  })

  it('should return an error message when the db fails', async () => {
    vi.mocked(db.updateTask).mockRejectedValue(new Error('SQLITE ERROR: sad'))

    vi.spyOn(console, 'log').mockImplementation(() => {})

    const response = await request(server).patch('/api/v1/tasks/1')

    expect(console.log).toHaveBeenCalledWith(new Error('SQLITE ERROR: sad'))
    expect(response.body.error).toBe(
      'Uh oh! Something went wrong when updating your task'
    )
  })
})

describe('PATCH /api/v1/tasks/:id/status:status', () => {
  it('should return the updated task', async () => {
    const mockTask = [
      {
        id: 1,
        name: 'something',
        completed: 1,
        created_at: '2023-09-10 22:15:47',
        updated_at: '2023-09-10 22:15:47',
      },
    ]
    vi.mocked(db.updateTaskStatus).mockResolvedValue(mockTask)
    const response = await request(server).patch('/api/v1/tasks/1/status/true')

    expect(response.status).toBe(200)
    expect(response.body).toMatchInlineSnapshot(`
      [
        {
          "completed": 1,
          "created_at": "2023-09-10 22:15:47",
          "id": 1,
          "name": "something",
          "updated_at": "2023-09-10 22:15:47",
        },
      ]
    `)
  })

  it('should send 400 status when id is NaN', async () => {
    vi.mocked(db.updateTaskStatus).mockRejectedValue(new Error('Bad Request'))
    const response = await request(server).patch(
      '/api/v1/tasks/one/status/true'
    )

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Task ID must be a number')
  })

  it('should return an error message when the db fails', async () => {
    vi.mocked(db.updateTaskStatus).mockRejectedValue(
      new Error('SQLITE ERROR: sad')
    )

    vi.spyOn(console, 'log').mockImplementation(() => {})

    const response = await request(server).patch('/api/v1/tasks/1/status/true')

    expect(console.log).toHaveBeenCalledWith(new Error('SQLITE ERROR: sad'))
    expect(response.body.error).toBe(
      'Uh oh! Something went wrong when updating your task status'
    )
  })
})

describe('DELETE /api/v1/tasks/:id/', () => {
  it('should return success status after deleting tasks', async () => {
    vi.mocked(db.deleteTask).mockResolvedValue(1)
    const response = await request(server).delete('/api/v1/tasks/1')

    expect(response.status).toBe(200)
    expect(response.body).toMatchInlineSnapshot('1')
  })

  it('should return an unsuccessful status for incorrect task ids', async () => {
    vi.mocked(db.deleteTask).mockResolvedValue(0)
    const response = await request(server).delete('/api/v1/tasks/20')

    expect(response.status).toBe(200)
    expect(response.body).toMatchInlineSnapshot('0')
  })

  it('should send 400 status when id is NaN', async () => {
    vi.mocked(db.deleteTask).mockRejectedValue(new Error('Bad Request'))
    const response = await request(server).delete('/api/v1/tasks/one')

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Task ID must be a number')
  })

  it('should return an error message when the db fails', async () => {
    vi.mocked(db.deleteTask).mockRejectedValue(new Error('SQLITE ERROR: sad'))

    vi.spyOn(console, 'log').mockImplementation(() => {})

    const response = await request(server).delete('/api/v1/tasks/1')

    expect(console.log).toHaveBeenCalledWith(new Error('SQLITE ERROR: sad'))
    expect(response.body.error).toBe(
      'Uh oh! Something went wrong when deleting your task'
    )
  })
})

import server from '../../server'
import { it, describe, expect, vi } from 'vitest'
import request from 'supertest'

import * as db from '../../db/functions/tasks.ts'

vi.mock('../../db/functions/tasks.ts')

describe('GET /api/v1/tasks', () => {
  it('should return an array of tasks', async () => {
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
    vi.mocked(db.getAllTasks).mockResolvedValue(mockTasks)

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
})

// @vitest-environment jsdom

import { describe, it, expect } from 'vitest'
import {
  screen,
  within,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import nock from 'nock'

import { renderApp } from './test-utils.tsx'

describe('<TodoList>', () => {
  it.skip(' should render a loading indicator ', async () => {
    nock('http://localhost')
      .get('/api/v1/tasks')
      .reply(200, [
        {
          id: 1,
          name: 'CP01 trello ticket',
          completed: 1,
          created_at: '2023-09-09 09:18:30',
          updated_at: '2023-09-09 09:18:30',
        },
        {
          id: 3,
          name: 'WD03 trello ticket',
          completed: 1,
          created_at: '2023-09-09 09:18:30',
          updated_at: '2023-09-09 09:18:30',
        },
      ])
    nock('http://localhost').get('/api/tasks').reply(200, [])
    renderApp('/')
    expect(screen.queryByText(/loading/i)).toBeInTheDocument()
  })

  it.skip(' should render a list of tasks ', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/tasks')
      .reply(200, [
        {
          id: 1,
          name: 'CP01 trello ticket',
          completed: 1,
          created_at: '2023-09-09 09:18:30',
          updated_at: '2023-09-09 09:18:30',
        },
        {
          id: 3,
          name: 'WD03 trello ticket',
          completed: 1,
          created_at: '2023-09-09 09:18:30',
          updated_at: '2023-09-09 09:18:30',
        },
      ])
    nock('http://localhost').get('/api/tasks').reply(200, [])
    renderApp('/')

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    const list = screen.getByRole('list', { name: /tasks/i })
    const listItems = within(list)
      .getAllByRole('listitem')
      .map((li) => li.textContent)

    expect(listItems).toEqual(['CP01 trello ticket', 'WD03 trello ticket'])
    expect(scope.isDone()).toBe(true)
  })

  it.skip('should render an error message when things go wrong', async () => {
    const scope = nock('http://localhost').get('/api/v1/tasks').reply(500)

    renderApp('/')

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    const error = screen.getByText(/something went wrong/i)
    expect(error).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })
})

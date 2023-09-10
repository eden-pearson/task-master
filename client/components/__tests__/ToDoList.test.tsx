// @vitest-environment jsdom

import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import nock from 'nock'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { renderRoute } from '../../test-utils'

// import { renderRoute } from '../../test-utils'

describe('<ToDoList>', () => {
  it('should render a loading indicator)', async () => {
    nock('http://localhost').get('/api/v1/tasks').reply(200, {
      tasks: [],
    })

    renderRoute()

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    expect(screen.queryByText(/loading/i)).toBeInTheDocument()
  })
})

//   it('should render list of tasks when they exist', async () => {
//     const tasks = [
//       {
//         id: 1,
//         post_id: 1,
//         comment: 'wow that is a nifty book!',
//         date_posted: 1694059365900,
//       },
//       {
//         id: 2,
//         post_id: 1,
//         comment: 'looks like a boring book with many pages',
//         date_posted: 1694059365900,
//       },
//     ]

//     nock('http://localhost').get('/api/v1/tasks').reply(200, {
//       tasks: [],
//     })
//     const user = userEvent.setup()

//     renderRoute('/')

//     await waitFor(() => {
//       expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
//     })

//     expect(
//       screen.queryByText(/loading/i)
//     ).toBeInTheDocument()

//     const postScope = nock('http://localhost')
//       .get('/api/v1/posts/1')
//       .reply(200, {
//         body: 'I found this really interesting book, you should check it out',
//         createdAt: 1687321511537,
//         fullName: 'Paige Turner',
//         id: 1,
//         image:
//           'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg',
//         userId: 1,
//         userImage: 'ava-03.png',
//         username: 'paige',
//       })

//     const commentsScope = nock('http://localhost')
//       .get('/api/v1/comments/1')
//       .reply(200, comments)

//     renderRoute('/post/1')

//     await waitFor(() => {
//       expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
//     })

//     const commentsButton = screen.getByRole('button', { name: 'Comments' })

//     await user.click(commentsButton)

//     await waitFor(() => {
//       expect(
//         screen.queryByText(/loading this post's comments/i)
//       ).not.toBeInTheDocument()
//     })

//     const commentsList = screen.getByRole('list')
//     const commentListElements = within(commentsList).getAllByRole('listitem')

//     expect(commentListElements.length).toBe(2)
//     expect(postScope.isDone()).toBe(true)
//     expect(commentsScope.isDone()).toBe(true)
//   })

//   it('should render text prompt when there are no comments', async () => {
//     const user = userEvent.setup()

//     const postScope = nock('http://localhost')
//       .get('/api/v1/posts/1')
//       .reply(200, {
//         body: 'I found this really interesting book, you should check it out',
//         createdAt: 1687321511537,
//         fullName: 'Paige Turner',
//         id: 1,
//         image:
//           'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg',
//         userId: 1,
//         userImage: 'ava-03.png',
//         username: 'paige',
//       })

//     const commentsScope = nock('http://localhost')
//       .get('/api/v1/comments/1')
//       .reply(200, [])

//     renderRoute('/post/1')

//     await waitFor(() => {
//       expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
//     })

//     const commentsButton = screen.getByRole('button', { name: 'Comments' })

//     await user.click(commentsButton)

//     await waitFor(() => {
//       expect(
//         screen.queryByText(/loading this post's comments/i)
//       ).not.toBeInTheDocument()
//     })

//     const prompt = screen.getByText(/Be the first one to comment/)

//     expect(prompt).toBeInTheDocument()
//     expect(postScope.isDone()).toBe(true)
//     expect(commentsScope.isDone()).toBe(true)
//   })

//   // TODO: get this test working somehow
//   it.skip('should render an error message if something goes wrong', async () => {
//     vi.spyOn(console, 'log').mockImplementation(() => {})
//     const user = userEvent.setup()

//     const postScope = nock('http://localhost')
//       .get('/api/v1/posts/1')
//       .reply(200, {
//         body: 'I found this really interesting book, you should check it out',
//         createdAt: 1687321511537,
//         fullName: 'Paige Turner',
//         id: 1,
//         image:
//           'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg',
//         userId: 1,
//         userImage: 'ava-03.png',
//         username: 'paige',
//       })

//     const commentsScope = nock('http://localhost')
//       .get('/api/v1/comments/1')
//       .reply(500)

//     renderRoute('/post/1')

//     await waitFor(() => {
//       expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
//     })

//     const commentsButton = screen.getByRole('button', { name: 'Comments' })

//     await user.click(commentsButton)

//     // it never gets past this loading message
//     await waitFor(() => {
//       expect(
//         screen.queryByText(/loading this post's comments/i)
//       ).not.toBeInTheDocument()
//     })

//     expect(screen.getByText(/there was an error/i)).toBeInTheDocument()
//     expect(postScope.isDone()).toBe(true)
//     expect(commentsScope.isDone()).toBe(true)
//   })

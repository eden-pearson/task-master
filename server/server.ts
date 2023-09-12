import express from 'express'
import * as Path from 'node:path'
import taskRoutes from './routes/tasks.ts'
import userRoutes from './routes/users.ts'

const server = express()
server.use(express.json())

server.use('/api/v1/tasks', taskRoutes)
server.use('/api/v1/users', userRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server

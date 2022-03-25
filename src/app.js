const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const { createServer } = require('http')
const { Server } = require('socket.io')

const routes = require('./app/routes/post')

require('./database')

class App {
  constructor() {
    this.server = express()

    this.socket()
    this.middlewares()
    this.routes()
  }

  socket() {
    const httpServer = createServer(this.server)

    const io = new Server(httpServer, {
      cors: {
        origin: '*'
      }
    })

    io.on("connection", (socket) => {
      console.log(socket.id)
    })

    this.server.use((req, res, next) => {
      req.io = io
      next()
    })

    this.server.set('server', httpServer)
  }

  middlewares() {
    this.server.set('port', process.env.PORT || 3006)

    this.server.use(express.json())

    this.server.use(morgan('dev'))

    // CORS
    this.server.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET, POST')
      res.header('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type, Authorization')

      next()
    })

    this.server.use(cors())

    // Rota para os arquivos estáticos(imagens) dos posts.
    this.server.use('/files', express.static(path.resolve(__dirname, '..', '..', 'uploads', 'resized')))
  }

  routes() {
    this.server.get((req,res) => {
      return res.json({a: 'b'})
    })

    this.server.use('/posts', routes)
    this.server.use('/posts/:id/like', routes)
  }
}

module.exports = new App().server

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

//const socket_io_server = require('./socket-io')

const routes = require('./app/routes/post')

require('./config/mongoose')

class App {
  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    // =================== SOCKET.IO =====================
    const server = require('http').createServer(this.server)// Permite que a aplicação ouça tanto o protocolo http quanto o websocket
    const io = require('socket.io')(server, {
      cors: {
        origin: ["http://localhost:3000","http://fausantosdev-share-web.herokuapp.com"],
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        autoConnect: true,
        pingInterval: 25000,
        pingTimeout: 180000,
        credentials: true
      },
      allowEIO3: true
    })// Faz com que a aplicação suporte o protocolo de websockets

    io.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`)
    })

    this.server.use((req, res, next) => {
      req.io = server
      next()
    })

    this.server.set('server', server)
    // ===================================================

    this.server.set('port', process.env.PORT || 3006)

    this.server.use(cors())

    this.server.use(express.json())

    this.server.use(morgan('dev'))

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

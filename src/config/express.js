const express = require('express')
const path = require('path')
const cors = require('cors')// Permite que o backend seja acessível pelo front em react mesmo estando em domínios diferentes.
const morgan = require('morgan')
const postRoute = require('../app/routes/post')

require('./mongoose')// Não esquecer de comentar essa linha!!!

const app = express()

//--------------------------------------------------'
const server = require('http').createServer(app)// Permite que a aplicação ouça tanto o protocolo http quanto o websocket
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
})// Faz quque a aplicação suporte o protocolo de websockets

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

app.use((req, res, next) => {
    req.io = io
    next()
})

app.set('server', server)
//--------------------------------------------------

app.use(morgan('dev'))

app.use(cors())// Permite que todo tipo de aplicação acesse o backend.

app.use('/files', express.static(path.resolve(__dirname, '..', '..', 'uploads', 'resized')))// Rota para os arquivos estáticos(imagens) dos posts.

// Routes
app.use('/posts', postRoute)
app.use('/posts/:id/like', postRoute)

module.exports = app

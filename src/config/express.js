require('dotenv').config()

const express = require('express')
const path = require('path')
const cors = require('cors')// Permite que o backend seja acessível pelo front em react mesmo estando em domínios diferentes.     
const testeRoute = require('../app/routes/teste')
const postRoute = require('../app/routes/post')

require('./mongoose')// Não esquecer de comentar essa linha!!!

const app = express() 

    //--------------------------------------------------'
    const server = require('http').Server(app)// Permite que a aplicação ouça tanto o protocolo http quanto o websocket 
    const io = require('socket.io')(server)// Faz quque a aplicação suporte o protocolo de websockets

    app.use((req, res, next) => {
        req.io = io
        next()
    })

    app.set('server', server)
    //--------------------------------------------------

    app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))// Rota para os arquivos estáticos(imagens) dos posts.

    app.use(cors())// Permite que todo tipo de aplicação acesse o backend.

// Routes
    app.use('/', testeRoute)
    app.use('/posts', postRoute)
    app.use('/posts/:id/like', postRoute)

module.exports = app
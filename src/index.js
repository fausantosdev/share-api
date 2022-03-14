require('dotenv').config()

const app = require('./app')

const port = app.get('port')
const server = app.get('server')

server.listen(port, () => {
    console.log(`~ server running on port ${port}...`)
})

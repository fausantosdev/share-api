const app = require('./config/express')

const PORT = process.env.PORT

const server = app.get('server')

server.listen(PORT, () => {
    console.log(`Server ronning on port ${PORT}...`)
})

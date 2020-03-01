const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {

    console.log('---------------------------------')
    console.log('Time:', Date.now())
    console.log(`Request URL: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)
    console.log('---------------------------------')

    res.send({
        "json": "ok"
    })
})

module.exports = router

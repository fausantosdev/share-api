const mongoose = require('mongoose')

mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
)

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.info("~ database connect successfuly!")
});

module.exports = db

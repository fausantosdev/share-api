const mongoose = require('mongoose')

mongoose.connect(
    "mongodb+srv://fallsantosdev:B13b14b14b13*@cluster-0-dev-4cxi0.mongodb.net/omistack07?retryWrites=true&w=majority",
    { useNewUrlParser: true }
)

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.info("Database connect successfuly!")
});

module.exports = db
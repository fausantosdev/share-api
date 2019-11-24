const multer = require('multer')
const path = require('path')
const hash = require('./functions').makeHash

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, "..", "uploads"),
        filename: (req, file, cb) => {
            cb(null, hash(30) + "-" + file.originalname)
        }
    })       
}
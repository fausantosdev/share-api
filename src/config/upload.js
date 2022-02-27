const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require('path')
const S3 = require('aws-sdk/clients/s3')

const hash = require('./functions').makeHash

const storageTypes = {
  local: new multer.diskStorage({
            destination: path.resolve(__dirname, "..", "..", "uploads"),
            filename: (req, file, cb) => {
                cb(null, hash(30) + "-" + file.originalname)
            }
          }),
  s3: multerS3({
    s3: new S3({
      region: process.env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
        secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY
      }
    }),
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    //acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: (req, file, cb) => {
        cb(null, hash(30) + '-' + file.originalname)
    }
  })
}

module.exports = {
  storage: storageTypes.s3
}

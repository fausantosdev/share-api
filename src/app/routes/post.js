const express = require('express')

const postController = require('../controllers/postController')

const router = express.Router()

const multer  = require('multer')
const uploadConfig = require('../../config/upload')
const upload = multer(uploadConfig)// <<< Salva na pasta de uploads.

router.get('/', postController.index)// Read

router.post('/', upload.single('image'), postController.store)// Create

router.post('/:id/like', postController.like)// Like+

module.exports = router
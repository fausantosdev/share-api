const Post = require('../models/Post')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

module.exports = {

    async index(req, res) {
        console.log('---------------------------------')
        console.log('Time:', Date.now())
        console.log(`Request URL: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        console.log('---------------------------------')

        const posts = await Post.find().sort('-createdAt')// Ordenar por data de criação em ordem decrescente.

        res.json(posts)
    },

    async store(req, res) {
        console.log('---------------------------------')
        console.log('Time:', Date.now())
        console.log(`Request URL: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        console.log('---------------------------------')

        const { author, place, description, hashtags } = req.body
        const { filename: image } = req.file // Pega só o nome do arquivo e altera o nome para "image".

        const [name] = image.split('.')// Divide o nome e a extenção através do ponto.
        const fileName = `${name}.jpg`// Estes dois trexos fazem as imagens serem salvas em formato jpg.

        // Sharp também é assíncrono
        await sharp(req.file.path)
            .resize(500)// Redimencionamento.
            .jpeg({ quality: 70 })// Formato jpeg e qualidade 70%.
            .toFile(// Exporta para um novo arquivo.
                path.resolve(req.file.destination, 'resized', fileName)// O destino da imagem, o novo destino, e a imagem 'que será redimencionada'   
            )

        fs.unlinkSync(req.file.path)// Apaga a imagem original depois de a ter redimencionado.

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName
        })

        req.io.emit('post', post)// Emite uma informação para todos os usuários conectados na aplicação

        res.json(post)
    },

    async like(req, res) {
        console.log('---------------------------------')
        console.log('Time:', Date.now())
        console.log(`Request URL: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        console.log('---------------------------------')

        const post = await Post.findById(req.params.id)

        post.likes += 1 // Adiciona um like*

        await post.save()

        req.io.emit('like', post)

        res.json(post)
    }
}
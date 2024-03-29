const Post = require('../models/Post')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

module.exports = {

    async index(req, res) {

        const posts = await Post.find().sort('-createdAt')// Ordenar por data de criação em ordem decrescente.

        return res.json(posts)
    },

    async store(req, res) {

        const { author, place, description, hashtags } = req.body

        const { key } = req.file // Pega só o nome do arquivo e altera o nome para "image".

        /*const [name] = image.split('.')// Divide o nome e a extenção através do ponto.
        const fileName = `${name}.jpg`// Estes dois trexos fazem as imagens serem salvas em formato jpg.

        Sharp também é assíncrono
        /*await sharp(req.file.path)
            .resize(500)// Redimencionamento.
            .jpeg({ quality: 70 })// Formato jpeg e qualidade 70%.
            .toFile(// Exporta para um novo arquivo.
                path.resolve(req.file.destination, 'resized', fileName)// O destino da imagem, o novo destino, e a imagem 'que será redimencionada'
            )

        fs.unlinkSync(req.file.path)// Apaga a imagem original depois de a ter redimencionado.
        */
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: key
        })

        req.io.emit('post', post)// Emite uma informação para todos os usuários conectados na aplicação

        return res.json(post)
    },

    async delete(req, res) {
      const { id: _id } = req.params

      const deleted = await Post.deleteOne({ _id })

      return res.json({
        'status': true,
        'deleted': req.params.id
      })
    },

    async like(req, res) {

        const post = await Post.findById(req.params.id)

        post.likes += 1 // Adiciona um like*

        await post.save()

        req.io.emit('like', post)

        return res.json(post)
    }
}

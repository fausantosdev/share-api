const mongoose = require('mongoose')

const localhost = 'http://localhost:3000'
const serverhost = 'https://fausantosdev-share-api.herokuapp.com'

const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        trim: true
    },
    place: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    hashtags: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    likes: {
        type: Number,
        default: 0
    },
    show: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})

postSchema.virtual('thumbnail_url').get(function () {
    return `${serverhost}/files/${this.image}`
})

module.exports = mongoose.model('Post', postSchema)

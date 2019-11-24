const mongoose = require('mongoose')

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
    hashtags:{
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
    }
},{
    timestamps:true// cria os campos create_at e update_at*
})

module.exports = mongoose.model('Post', postSchema)
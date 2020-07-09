const mongoose = require('mongoose')

const blogShema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

module.exports = mongoose.model('Blog', blogShema)
const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    value: { type: String }
})

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 2
    },
    published: {
        type: Number,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    genres: { type: Array }

})

module.exports = mongoose.model('Book', bookSchema)
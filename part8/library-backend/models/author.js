const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minlength: 5
    },
    born: {
        type: Number,
    }
})


module.exports = mongoose.model('Author', schema)
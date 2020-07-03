require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log(`Using: ${url}`)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log(`connected to mongoDB`)
    })
    .catch(error => {
        console.log(`error connecting to mongoseDB: ${error.message}`)
    })

const person = new mongoose.Schema({
    name: String,
    number: String,
    date: Date
})

person.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', person)

// Person.create({
//     name: 'Haniel Baez',
//     number: '08830-34343',
//     date: new Date()
// }, (err, result) => {
//     if (err) console.log(`The error is ${err}`)
//     console.log(`All went well ${result}`)
// })
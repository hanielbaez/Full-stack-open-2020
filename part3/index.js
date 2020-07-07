const express = require('express')
const cors = require('cors')
const app = express()

var morgan = require('morgan')
const Person = require('./models/person')
const { response } = require('express')
const { findOneAndUpdate, findByIdAndUpdate } = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', function (request, response) { return JSON.stringify(request.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            response.send(persons)
        })
})

app.get('/info', (request, response) => {
    Person
        .find({})
        .then((documents) => {
            const infoHTML = `<p>
    Phonebook has info for ${documents.length} people
    </p>
    <p>${Date()}</p>`
            res.send(infoHTML)
        })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person
        .findById(request.params.id)
        .then(person => {
            response.send(person)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const opts = { runValidators: true }

    Person
        .findByIdAndUpdate(request.params.id, request.body, opts)
        .then(updatedPerson => {
            response.status(204).send(updatedPerson)
        })
        .catch(error => next(error))
})

const checkBody = (response, body) => {

    if (!body.name) {
        return response.status(400).json({ error: 'name is missing' })
    } else if (!body.number) {
        return response.status(400).json({ error: 'number is missing' })
    }
}

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    checkBody(response, body)
    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

const errorHandle = (error, request, response, next) => {
    console.log(error)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

app.delete('/api/persons/:id', (request, response, next) => {
    Person
        .findByIdAndDelete(request.params.id)
        .then(status => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.use(errorHandle)

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>
    console.log(`Server listening in port ${PORT}`))
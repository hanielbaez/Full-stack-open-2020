const express = require('express')
const app = express()

var morgan = require('morgan')
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
    Person
        .find({}, (error, documents) => {
            res.send(documents)
        })
})

app.get('/info', (req, res) => {
    Person
        .find({}, (error, documents) => {
            const infoHTML = `<p>
    Phonebook has info for ${documents.length} people
    </p>
    <p>${Date()}</p>`

            res.send(infoHTML)
        })


})

app.get('/api/persons/:id', (req, res) => {
    Person
        .findById(req.params.id, (error, person) => {
            if (error) return res.status(404).end()
            res.send(person)
        })
})

app.delete('/api/persons/:id', (req, res) => {
    Person
        .findByIdAndDelete(req.params.id, (error, response) => {
            if (error) console.log(error)
            res.status(204).end()
        })
})

const errorHandling = (res, body) => {
    if (!body.name) {
        return res.status(400).json({ error: 'name is missing' })
    } else if (!body.number) {
        return res.status(400).json({ error: 'number is missing' })
    } else {
        Person
            .find({}, (error, documents) => {
                const noUnique = documents.find(person => person.name === body.name)
                if (noUnique) {
                    return res.status(400).json({ error: 'name must be unique' })
                }
            })
    }
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    errorHandling(res, body)

    const newPerson = {
        name: body.name,
        number: body.number
    }

    Person
        .create(newPerson, (error, document) => {
            res.status(201).send(document)
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>
    console.log(`Server listening in port ${PORT}`))
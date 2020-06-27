const express = require('express')
const app = express()

var morgan = require('morgan')
const { json } = require('express')

app.use(express.json())
app.use(express.static('build'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        name: "Jesus",
        number: "232-455634",
        id: 1
    },
    {
        name: "David",
        number: "002-454545",
        id: 2
    },
    {
        name: "Timoteo",
        number: "350-458243",
        id: 3
    },
    {
        name: "Lucas",
        number: "840-343648",
        id: 4
    }
]

app.get('/api/persons', (req, res) => {
    res.send(persons)
})

app.get('/info', (req, res) => {
    const infoHTML = `<p>
    Phonebook has info for ${persons.length} people
    </p>
    <p>${Date()}</p>`

    res.send(infoHTML)
})

app.param('id', (req, res, next) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (!person) {
        return res.status(404).send('404: person do not found')
    }
    req.person = person
    next()
})

app.get('/api/persons/:id', (req, res) => {
    res.send(req.person)
})

app.delete('/api/persons/:id', (req, res) => {
    personFiltered = persons.filter(person => person.id !== req.person.id)

    res.status(204).end()
})

const generateRandomID = () => Math.floor(Math.random() * 500)

const errorHandling = (res, body) => {

    if (!body.name) {
        return res.status(400).json({ error: 'name is missing' })
    } else if (!body.number) {
        return res.status(400).json({ error: 'number is missing' })
    } else {
        const noUnique = persons.find(person => person.name === body.name)
        if (noUnique) {
            return res.status(400).json({ error: 'name must be unique' })
        }
    }

}

app.post('/api/persons', (req, res) => {
    const body = req.body

    errorHandling(res, body)

    const newPerson = {
        id: generateRandomID(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(newPerson)
    res.status(201).send(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>
    console.log(`Server listening in port ${PORT}`))
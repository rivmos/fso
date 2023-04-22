const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body) 
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// const customMiddleWare = (req, res, next) => {
//     console.log('Method', req.method)
//     console.log('Path', req.path)
//     console.log('Body', req.body)
//     console.log('---')
//     next()
// }

// app.use(customMiddleWare)

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons/', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const numberOfPeople = persons.length
    const date = Date()
    res.send(`<p>Phonebook has info for ${numberOfPeople} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    }
    else {
        res.status(400).json({ error: "Bad Request" })
    }
})

app.post('/api/persons/', (req, res) => {
    const body = req.body
    if(!req.body.name || !req.body.number){
        return res.status(400).json({
            error:"name or number is missing"
        })
    }
    const personAlreadyExists = persons.find(person => person.name === req.body.name)

    if(personAlreadyExists){
        return res.status(400).json({
            error:"Name already exists"
        })
    }

    const personToBeAdded = {
        id: Math.floor(Math.random()*(100000 - 100 + 1) + 100),
        name:body.name,
        number:body.number
    }
    persons = persons.concat(personToBeAdded)
    res.json(personToBeAdded)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log('Server Is Running')
})
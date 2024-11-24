const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

// 3.8

// morgan token to log body of POST requests
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// const baseUrl =  "http://localhost:3001/api/persons"

let phonebook = [
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


const generateId = () => {
	let id = Math.floor(Math.random() * 1000000)
	// make sure id is unique
	while (phonebook.find(person => person.id === id)) {
		id = Math.floor(Math.random() * 1000000)
	}
  return id
}

//
// routes
//

app.get('/api/persons', (request, response) => {
	response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = phonebook.find(person => person.id === id)
	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})

app.get('/info', (request, response) => {
	const date = new Date()
	response.send(`<p>Phonebook has info for ${phonebook.length} people</p><p>${date}</p>`)
})



app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body) {
    return response.status(400).json({
      error: 'content missing' 
    })
  } else if (!body.number || !body.name || body.number === "" || body.name === "") {
		return response.status(400).json({
			error: 'name or number missing',
			body: body
		})
	} else if (phonebook.find(person => person.name === body.name)) {
		return response.status(400).json({
			error: 'name must be unique'
		})
	}

  const entry = {
    id: generateId(),
		name: body.name,
		number: body.number
  }

  phonebook = phonebook.concat(entry)

  response.json(entry)
})


app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
  if (!id) {
    return response.status(400).json({
      error: 'id missing'
    })
  }
  const person = phonebook.find(person => person.id === id)
  if (!person) {
    return response.status(404).json({
      error: 'person not found'
    })
  }
  phonebook = phonebook.filter(person => person.id !== id)


	response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
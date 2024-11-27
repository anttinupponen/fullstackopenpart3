const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
if (process.env.NODE_ENV !== 'development') {
	app.use(express.static('dist')) // production build
}

// 3.22
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/info', (request, response, next) => {
	Person.find({}).then(persons => {
		const length = persons.length
		const date = new Date()
		response.send(`<p>Phonebook has info for ${length} people</p><p>${date}</p>`)
	})
	.catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
	.catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
	const id = request.params.id
	if (!id) {
		return response.status(400).json({
			error: 'Id missing.'
		})
	}
	Person.findById(id).then(person => {
		if (person) {
			response.json(person)
		} else {
			response.status(404).end()
		}
	})
	.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const id = request.params.id
	const person = request.body
	Person.findByIdAndUpdate(id, person, { new: true, runValidators: true, context: 'query' }).then(updatedPerson => {
		response.json(updatedPerson)
	})
	.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body) {
    return response.status(400).json({
      error: "Content missing."
    })
  } else if (!body.number || !body.name || body.number === "" || body.name === "") {
		return response.status(400).json({
			error: "Name or number missing.",
			body: body
		})
	}
	// Fetch all persons and check if name is unique
	Person.find({}).then(persons => {
		if (persons.find(person => person.name === body.name)) {
			return response.status(400).json({
				error: `${person.name} is already in the phonebook. Name must be unique.`
			})
		}
	}).catch(error => next(error))

  const person = new Person({
		name: body.name,
		number: body.number
	})

	person.save({ runValidators: true, context: 'query' }).then(person => {
		response.json(person)
	}).catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
	const id = request.params.id
	if (!id) {
    return response.status(400).json({
      error: "Id missing."
    })
  }
	Person.findByIdAndDelete(id).then(person => {
		if (person) {
			response.status(200).json({
				"message": "Deleted",
				"person": person
			})
		} else {
			response.status(404).json({
      	error: "Person not found in phonebook."
			})
		}
	})
	.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// Error handling middleware
const errorHandler = (error, request, response) => {
	console.error(error.message)
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
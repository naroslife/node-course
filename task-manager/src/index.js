const express = require('express')
const mongoose = require('mongoose')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

app = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.post('/users', (req, res) => {
  const user = new User(req.body)
  user
    .save()
    .then((result) => {
      res.status(201)
      res.send(user)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

app.get('/users', (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users)
    })
    .catch((err) => {
      res.status(500).send()
    })
})

app.get('/users/:id', (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).send()
  }
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send()
      }
      res.send(user)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
})

app.post('/tasks', (req, res) => {
  const task = new Task(req.body)
  task
    .save()
    .then(() => {
      return res.status(201).send(task)
    })
    .catch((err) => {
      return res.status(400).send(err)
    })
})

app.get('/tasks', (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.send(tasks)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
})

app.get('/tasks/:id', (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).send()
  }
  Task.findById(req.params.id)
    .then((task) => {
      if (!task) {
        return res.status(404).send()
      }
      return res.send(task)
    })
    .catch((err) => {
      return res.status(500).send(err)
    })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
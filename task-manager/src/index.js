const express = require('express')
const mongoose = require('mongoose')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

app = express()
const port = process.env.PORT || 3000
app.use(express.json())

// Old with callbacks
// app.post('/users', (req, res) => {
//   const user = new User(req.body)
//   user
//     .save()
//     .then((result) => {
//       res.status(201)
//       res.send(user)
//     })
//     .catch((err) => {
//       res.status(400).send(err)
//     })
// })

// New with async/await
app.post('/users', async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

// app.get('/users', (req, res) => {
//   User.find({})
//     .then((users) => {
//       res.send(users)
//     })
//     .catch((err) => {
//       res.status(500).send()
//     })
// })

// New with async/await
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (error) {
    res.status(500).send(error)
  }
})

// app.get('/users/:id', (req, res) => {
//   if (!mongoose.isValidObjectId(req.params.id)) {
//     return res.status(404).send()
//   }
//   User.findById(req.params.id)
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send()
//       }
//       res.send(user)
//     })
//     .catch((err) => {
//       res.status(500).send(err)
//     })
// })

// New with async/await
app.get('/users/:id', async (req, res) => {
  const _id = req.params.id
  if (!mongoose.isValidObjectId(_id)) {
    return res.status(404).send()
  }
  try {
    const user = await User.findById(_id)
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (error) {
    res.status(500).send(err)
  }
})

app.patch('/users/:id', async (req, res) => {
  const _id = req.params.id
  if (!mongoose.isValidObjectId(_id)) {
    return res.status(404).send()
  }

  const allowedUpdates = ['name', 'email', 'password', 'age']
  const updates = Object.keys(req.body)
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' })
  }
  try {
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!user) return res.status(404).send()
    res.send(user)
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).send(error)
    } else {
      res.status(500).send(error)
    }
  }
})

// app.post('/tasks', (req, res) => {
//   const task = new Task(req.body)
//   task
//     .save()
//     .then(() => {
//       return res.status(201).send(task)
//     })
//     .catch((err) => {
//       return res.status(400).send(err)
//     })
// })

// New with async/await
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body)
  try {
    await task.save()
    return res.status(201).send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})

// app.get('/tasks', (req, res) => {
//   Task.find({})
//     .then((tasks) => {
//       res.send(tasks)
//     })
//     .catch((err) => {
//       res.status(500).send(err)
//     })
// })

// New with async/await
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (error) {
    res.status(500).send(error)
  }
})

// app.get('/tasks/:id', (req, res) => {
//   if (!mongoose.isValidObjectId(req.params.id)) {
//     return res.status(404).send()
//   }
//   Task.findById(req.params.id)
//     .then((task) => {
//       if (!task) {
//         return res.status(404).send()
//       }
//       return res.send(task)
//     })
//     .catch((err) => {
//       return res.status(500).send(err)
//     })
// })

// New with async/await
app.get('/tasks/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).send()
  }
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).send()
    }
    return res.send(task)
  } catch (error) {
    return res.status(500).send(error)
  }
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})

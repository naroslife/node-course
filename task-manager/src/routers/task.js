const express = require('express')
const mongoose = require('mongoose')
require('../db/mongoose')
const Task = require('../models/task')
const router = new express.Router()

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
router.post('/tasks', async (req, res) => {
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
router.get('/tasks', async (req, res) => {
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
router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
  const _id = req.params.id
  if (!mongoose.isValidObjectId(_id)) {
    return res.status(404).send()
  }
  const allowedUpdates = ['description', 'completed']
  const updates = Object.keys(req.body)
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )
  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid updates!' })

  try {
    const task = await Task.findById(_id)
    updates.forEach((update) => (task[update] = req.body[update]))
    await task.save()

    //This doesnt run the save middleware
    // const task = await Task.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // })
    if (!task) return res.status(404).send()
    res.send(task)
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(400).send(error)
    return res.status(500).send(error)
  }
})

router.delete('/tasks/:id', async (req, res) => {
  const _id = req.params.id
  if (!mongoose.isValidObjectId(_id)) {
    return res.status(404).send()
  }
  try {
    const task = await Task.findByIdAndDelete(_id)
    if (!task) return res.status(404).send()
    return res.send(task)
  } catch (error) {
    return res.status(500).send(error)
  }
})

module.exports = router

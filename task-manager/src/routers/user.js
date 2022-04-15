const express = require('express')
const mongoose = require('mongoose')
require('../db/mongoose')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

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
router.post('/users', async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    console.log(user)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(400).send(error.toString())
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
// router.get('/users', auth, async (req, res) => {
//   try {
//     const users = await User.find({})
//     res.send(users)
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
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
router.get('/users/:id', auth, async (req, res) => {
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

router.patch('/users/:id', auth, async (req, res) => {
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
    return res.status(400).send({ error: 'Invalid updates!' })
  }
  try {
    // This way the save middleware will run
    const user = await User.findById(_id)
    updates.forEach((update) => (user[update] = req.body[update]))
    await user.save()
    //This doesnt run the save middleware
    // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true, })
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

router.delete('/users/:id', auth, async (req, res) => {
  const _id = req.params.id
  if (!mongoose.isValidObjectId(_id)) {
    return res.status(404).send()
  }
  try {
    const user = await User.findByIdAndDelete(_id)
    if (!user) return res.status(404).send()
    res.send(user)
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router

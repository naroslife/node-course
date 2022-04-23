const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const sharp = require('sharp')
require('../db/mongoose')
const { sendWelcomeEmail, sendGoodbyeEmail } = require('../emails/account')
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
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user: user.getPublicProfile(), token }) // One way to hide private info of user
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        )
        const token = await user.generateAuthToken()
        res.send({ user, token }) // Other way to gide private info of user: user.toJSON() is automatically called via JSON.stringify()
    } catch (error) {
        res.status(400).send(error.toString())
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
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
        res.status(500).send(error)
    }
})

// router.patch('/users/:id', auth, async (req, res) => {
//   const _id = req.params.id
//   if (!mongoose.isValidObjectId(_id)) {
//     return res.status(404).send()
//   }

//   const allowedUpdates = ['name', 'email', 'password', 'age']
//   const updates = Object.keys(req.body)
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   )

//   if (!isValidOperation) {
//     return res.status(400).send({ error: 'Invalid updates!' })
//   }
//   try {
//     // This way the save middleware will run
//     const user = await User.findById(_id)
//     updates.forEach((update) => (user[update] = req.body[update]))
//     await user.save()
//     //This doesnt run the save middleware
//     // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true, })
//     if (!user) return res.status(404).send()
//     res.send(user)
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       res.status(400).send(error)
//     } else {
//       res.status(500).send(error)
//     }
//   }
// })

router.patch('/users/me', auth, async (req, res) => {
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
        const user = req.user
        updates.forEach((update) => (user[update] = req.body[update]))
        await user.save()
        // This doesnt run the save middleware
        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true, })
        res.send(user)
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)
        }
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendGoodbyeEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

const upload = multer({
    // dest: 'avatars',
    limits: { fileSize: 5000000 },
    fileFilter(req, file, cb) {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Invalid file: must be an image.'))
        }
        return cb(undefined, true)
    },
})
router.post(
    '/users/me/avatar',
    auth,
    upload.single('avatar'),
    async (req, res) => {
        const roundedCorners = Buffer.from(
            '<svg><rect x="0" y="0" width="250" height="250" rx="50" ry="50"/></svg>'
        )
        const sharpBuffer = await sharp(req.file.buffer)
            .resize({ width: 250, height: 250 })
            .composite([
                {
                    input: roundedCorners,
                    blend: 'dest-in',
                },
            ])
            .png()
            .toBuffer()

        req.user.avatar = sharpBuffer
        await req.user.save()
        res.send()
    },
    (error, req, res, next) => {
        res.status(400).send({ error: error.message })
    }
)

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png').send(user.avatar)
    } catch (error) {
        res.status(404).send()
    }
})

module.exports = router

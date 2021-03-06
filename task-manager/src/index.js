const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT
const maintenance = false

// Setup middleware to run between request and route handler
// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//     res.send('GET requests are disabled')
//   } else {
//     next()
//   }
// })

app.use((req, res, next) => {
    if (maintenance) {
        res.status(503).send('Under maintenance')
    } else {
        next()
    }
})

const multer = require('multer')
const upload = multer({ dest: 'images' })
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

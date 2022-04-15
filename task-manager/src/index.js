const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

app = express()
const port = process.env.PORT || 3000
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

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})

const jsonwebtoken = require('jsonwebtoken')

function myFunction() {}

myFunction()

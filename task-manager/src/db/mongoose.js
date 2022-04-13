const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
mongoose.connect(connectionURL + '/task-manager-api')

// const me = new User({
//   name: 'Robert',
//   email: 'ROBI54321@gmail.com    ',
//   password: 'retek',
// })
// me.save()
//   .then((result) => {
//     console.log(result)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// const myTask = new Task({ description: '     Learn NodeJS ' })
// myTask
//   .save()
//   .then((result) => {
//     console.log(result)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

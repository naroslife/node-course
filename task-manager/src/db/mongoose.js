const mongoose = require('mongoose')
const validator = require('validator')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
mongoose.connect(connectionURL + '/task-manager-api')

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a non-negative number!')
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid!')
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain the word "password"')
      }
    },
  },
})

const me = new User({
  name: 'Robert',
  email: 'ROBI54321@gmail.com    ',
  password: 'retek',
})
// me.save()
//   .then((result) => {
//     console.log(result)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

const Task = mongoose.model('Task', {
  description: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
})

const myTask = new Task({ description: '     Learn NodeJS ' })
myTask
  .save()
  .then((result) => {
    console.log(result)
  })
  .catch((err) => {
    console.log(err)
  })

const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema(
  {
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
      unique: true,
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
    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
    avatar: { type: Buffer },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 8)
  }

  next()
})

// Delete user's tasks when user is deleted.
userSchema.pre('remove', async function (next) {
  const user = this
  await Task.deleteMany({ owner: user._id })
  next()
})

// Add static function to schema
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('Unable to login!')
  }
  if (!(await bcryptjs.compare(password, user.password))) {
    throw new Error('Unable to login')
  }
  return user
}

// Add method
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jsonwebtoken.sign({ _id: user._id.toString() }, 'mysecret')
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

userSchema.methods.getPublicProfile = function () {
  const userObject = this.toObject()
  delete userObject.password
  delete userObject.tokens
  delete userObject.avatar
  return userObject
}

userSchema.methods.toJSON = function () {
  return this.getPublicProfile()
}

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner',
})

const User = mongoose.model('User', userSchema)
module.exports = User

require('../src/db/mongoose')
const User = require('../src/models/user')

const id = '62546aaa46602e7c11a45d50'

// User.findByIdAndUpdate(id, { age: 1 })
//   .then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
//   })
//   .then((result) => {
//     console.log(result)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

const updateAgeAndCount = async (id, age) => {
    // eslint-disable-next-line no-unused-vars
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount(id, 2)
    .then((count) => {
        console.log(count)
    })
    .catch((err) => {
        console.log(err)
    })

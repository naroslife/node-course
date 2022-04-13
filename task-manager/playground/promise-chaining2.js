require('../src/db/mongoose')
const Task = require('../src/models/task')

const id = '6255c36ee36c0c11ca89b3a3'
// Task.findByIdAndRemove(id)
//   .then(() => {
//     return Task.countDocuments({ completed: false })
//   })
//   .then((count) => {
//     console.log(count)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

const deletteTaskAndCount = async (id) => {
  await Task.findByIdAndRemove(id)
  const count = await Task.countDocuments({ completed: false })
  return count
}

deletteTaskAndCount(id)
  .then((count) => {
    console.log(count)
  })
  .catch((err) => {
    console.log(err)
  })

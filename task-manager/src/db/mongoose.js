const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL);

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

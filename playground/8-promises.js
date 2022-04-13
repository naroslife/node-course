// const doWorkPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('Success!')
//     reject('Error!')
//   }, 2000)
// })

// doWorkPromise
//   .then((result) => {
//     console.log('Yay! ' + result)
//   })
//   .catch((error) => {
//     console.error('Boo! ' + error)
//   })

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 2000)
  })
}

// add(1, 2)
//   .then((sum) => {
//     console.log(sum)

//     add(sum, 5)
//       .then((sum2) => {
//         console.log(sum2)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// Promise chaining
add(1, 1)
  .then((sum) => {
    console.log(sum)
    return add(sum, 4)
  })
  .then((sum2) => {
    console.log(sum2)
  })
  .catch((e) => {
    console.log(e)
  })

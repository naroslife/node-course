const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('Success!')
    reject('Error!')
  }, 2000)
})

doWorkPromise
  .then((result) => {
    console.log('Yay! ' + result)
  })
  .catch((error) => {
    console.error('Boo! ' + error)
  })

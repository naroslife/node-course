function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

console.log('start');

setTimeout(() => {
    console.log('zero timer');
}, 0);

sleep(2000)


console.log('stop');
console.log('start');

const ret = setTimeout(() => {
    console.log('timeout');
}, 2000);

console.log(ret);

console.log('stop');
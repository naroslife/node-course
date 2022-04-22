const fs = require('fs');

const person = JSON.parse(fs.readFileSync('data.json').toString());
person.name = 'Robert';
fs.writeFileSync('data.json', JSON.stringify(person));

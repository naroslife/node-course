const chalk = require('chalk');
const yargs = require('yargs');

const notes = require('./notes.js');

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note contents',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        // console.log(chalk.yellow(`Adding a new note with title: ${argv.title} and contents: ${argv.body}`));
        notes.addNote(argv.title, argv.body);
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove existing note',
    builder: {
        title: {
            describe: 'The note to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        console.log(chalk.yellow('Listing notes...'));
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a given note',
    handler() {
        console.log(chalk.yellow('Reading note...'));
    }
})
yargs.parse()
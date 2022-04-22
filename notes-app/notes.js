const fs = require('fs');
const chalk = require('chalk');

function getNotes() {
    return 'Your notes...';
}

function addNote(title, body) {
    const notesArray = loadNotes();
    const duplicate = notesArray.find((note) => note.title === title);
    debugger;
    if (!duplicate) {
        notesArray.push({
            title: title,
            body: body,
        });
        saveNotes(notesArray);
        console.log(chalk.yellow('Note added!'));
    } else {
        console.log(chalk.red('Title already exists!'));
    }
}

function removeNote(title) {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);
    if (notes.length > notesToKeep.length) {
        console.log(chalk.yellow('Note removed.'));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red('Note not found.'));
    }
}

function saveNotes(notesArray) {
    fs.writeFileSync('notes.json', JSON.stringify(notesArray));
}

function loadNotes() {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString());
    } catch (error) {
        return [];
    }
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
};

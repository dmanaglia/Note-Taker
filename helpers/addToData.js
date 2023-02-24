const fs = require('fs');
const readData = require('./readData');
const writeData = require('./writeData');

function addToData(newNote){
    return readData('./db/db.json').then((data) => {
        const db = JSON.parse(data);
        db.push(newNote);
        writeData(db);
    })
}

module.exports = addToData;
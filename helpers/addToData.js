const fs = require('fs');
const readData = require('./readData');
const updateData = require('./updateData');
const path = require('path');

function addToData(newNote){
    readData('./db/db.json').then((data) => {
        const db = JSON.parse(data);
        db.push(newNote);
        updateData(db);
    })
}

module.exports = addToData;
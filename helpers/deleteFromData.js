const fs = require('fs');
const readData = require('./readData');
const writeData = require('./writeData')

function deleteFromData(noteId) {
    return readData('./db/db.json').then((data) => {
        const db = JSON.parse(data);
        for(var i = 0; i < db.length; i++){
            if(db[i].id === noteId){
                db.splice(i, 1);
                writeData(db);
            }
        }
    })
}

module.exports = deleteFromData;
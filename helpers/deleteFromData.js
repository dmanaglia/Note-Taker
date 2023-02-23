const fs = require('fs');
const readData = require('./readData');
const updateData = require('./updateData')

function deleteFromData(noteId) {
    readData('./db/db.json').then((data) => {
        const db = JSON.parse(data);
        var found = false;
        for(var i = 0; i < db.length; i++){
            if(db[i].id === noteId){
                db.splice(i, 1);
                updateData(db);
                found = true;
            }
        }
    })
}

module.exports = deleteFromData;
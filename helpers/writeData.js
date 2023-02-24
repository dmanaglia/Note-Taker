const fs = require('fs');

function writeData(newData){
    fs.writeFile('./db/db.json', JSON.stringify(newData, null, 2), (err) => {
        if(err){
            console.log(err);
        }
    });
}

module.exports = writeData;
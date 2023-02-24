const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    let response;
    if(req.body.title && req.body.text){
        const { title, text } = req.body
        const newNote = {
            title, 
            text,
            id: uuidv4()
        }
        readAndAppend('./db/db.json', newNote);
        response = {
            status: 201,
            body: newNote
        };
    } else {
        response = {
            status: 500,
            body: "Error in posting note"
        };
    }
    res.json(response);
});

notes.delete('/:id', (req, res) => {
    let response;
    let found = readAndDelete('./db/db.json', req.params.id);
    if(found){
        response = {
            status: 204,
            body: 'Note found and removed'
        }
    } else {
        response = {
            status: 404,
            body: 'Nothing found with recieved id'
        }
    }
    res.json(response);
});

module.exports = notes;
const express = require('express');
const path = require('path');
const notesData = require('./db/db.json');
const addToData = require('./helpers/addToData');
const deleteFromData = require('./helpers/deleteFromData')
const uuid = require('./helpers/uuid');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notesData);
});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body
    const newNote = {
        title, 
        text,
        id: uuid()
    }
    addToData(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    deleteFromData(req.params.id);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);
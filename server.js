const express = require('express');
const path = require('path');
const readData = require('./helpers/readData');
const addToData = require('./helpers/addToData');
const deleteFromData = require('./helpers/deleteFromData');
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
    readData('./db/db.json').then((data) => {
        res.json(JSON.parse(data));
    })
});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body
    const newNote = {
        title, 
        text,
        id: uuid()
    }

    addToData(newNote).then(() => {
        res.json("success");
    })
});

app.delete('/api/notes/:id', (req, res) => {
    deleteFromData(req.params.id).then(() => {
        res.json("success");
    })
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);
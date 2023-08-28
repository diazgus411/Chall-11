const router = require('express').Router();

const path = require('path');
const fs = require('fs');
let db = require('../db/db.json');
const{ v4: uuidv4 } = require('uuid');

router.get('/api/notes', (req, res) => {
    res.json(db);
});

router.post('/api/notes', (req, res) => {
    const note = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    }
    db.push(note);
    console.log(db);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(db);
})

// delete note from db
router.delete('/api/notes/:id', (req, res) => {
    console.log("Hello World")
    
    let newDb = []; 
    console.log(req.params);
    const noteId = req.params.id;
    for (let i = 0; i < db.length; i++) {
        if (noteId !== db[i].id) {
            newDb.push(db[i])
        }
    }
    console.log(newDb);
    db = newDb;

    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(db);
});
  

module.exports = router;
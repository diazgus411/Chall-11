const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// API Routes
app.get('/api/notes', (req, res) => {
  const notes = getNotes();
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();
  const notes = getNotes();
  notes.push(newNote);
  saveNotes(notes);
  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  const notes = getNotes();
  const updatedNotes = notes.filter(note => note.id !== noteId);
  saveNotes(updatedNotes);
  res.json({ message: 'Note deleted successfully.' });
});

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Helper Functions
function getNotes() {
  const data = fs.readFileSync('db.json', 'utf8');
  return JSON.parse(data);
}

function saveNotes(notes) {
  fs.writeFileSync('db.json', JSON.stringify(notes));
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
const path = require('path');
const express = require('express');
const { getData, writeData } = require('./db');
const { v4: uuidv4 } = require('uuid');

// Make the server object
const app = express();
const PORT = process.env.PORT || 3333;

// Create a get route for every file inside of public folder - will automatically send back the index.html
app.use(express.static('./public'));
// Middleware to allow json to come through the server
app.use(express.json());


// Route to return the notes.html page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Get the saved notes in the database and return it to the client
app.get('/api/notes', (req, res) => {
    const noteData = getData();
    res.json(noteData);
});

app.post('/api/notes', (req, res) => {
    const noteData = getData();

    // Create an id for the new note and set its properties from the client request
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
    };
    // Add the new request object to the notes array
    noteData.push(newNote);
    // Overwrite the json file with the new array
    writeData(noteData);

    // Respond to the client so the promise resolves
    res.json({ message: 'Database Updated Successfully' });
});

app.delete('/api/notes/:noteID', (req, res) => {
    const noteID = req.params.noteID;
    const notes = getData();

    // Go over the array and find the index of the object that has a matching id  
    const noteIndex = notes.findIndex((note) => note.id === noteID);

    // If an index is found then splice it from the array and overwrite the database with new array
    if (noteIndex !== -1) {
        notes.splice(noteIndex, 1);

        writeData(notes);

        res.json({ message: 'Database Updated Successfully' });
    } else {
        res.json({ error: 'Note Not Found' });
    }
});

// Route to return index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
  

// Start listening on the server port
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
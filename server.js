const fs = require('fs');
const express = require('express');
const db = require('./db/db.json');

const app = express();

// Create a get route for every file inside of public folder - will automatically send back the index.html
app.use(express.static('./public'));

app.get('/api/notes', (req, res) => {
    // Read the json file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Return a server response of the parsed json notes file 
        try {
            const notes = JSON.parse(data);
            res.json(notes);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Start listening on the server port
app.listen(3333, () => console.log('Server started on http://localhost:3333'));
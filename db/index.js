const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, './db.json')

// Read the json file and return the parsed array
function getData() {
    const json = fs.readFileSync(dbPath, 'utf-8');

    return JSON.parse(json);
}

// Take in the new database array and stringify it, then overwrite the old db.json with the new array 
function writeData(dbArray) {
    fs.writeFile(dbPath, JSON.stringify(dbArray, null, 2), () => {
        console.log('Database Updated Successfully');
    });
}

module.exports = { getData, writeData };

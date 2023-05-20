const { log } = require('console');
const fs = require('fs');

let text = 'Hello World!'
fs.writeFile('./output.txt', text, 'utf8', (err) => {
    if (err) {
        log('Unsuccessful file save!');
        return;
    }
    console.log('Successfully saved file!');
});
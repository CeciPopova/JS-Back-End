const { log } = require('console');
const fs = require('fs');

const readStream = fs.createReadStream('./input.txt', { encoding: 'utf-8' });

readStream.on('data', (chunk) => {
    log('Read Chunk');
    log(chunk);
});

readStream.on('end', () => {
    console.log('Reading data is finished!');
});
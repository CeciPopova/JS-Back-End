
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello From Express!');
});

app.get('/cats', (req, res) => {
    res.send('This page contains cats :)');
});

app.post('/cats', (req, res) => {
    res.send('Cat has been created!');
});

app.get('/cats/:catId', (req, res) => {
    const catId = Number(req.params.catId);
    if (!catId) {
        return res.status(404).send('Cannot find a cat!')
    }
    res.send(`Request with parameter ${req.params.catId}`);
});

app.get('download', (req, res) => {
    res.download('./manual.pdf');
    // res.attachment('./manual.pdf');
    // res.end();
    // res.sendFile(path.resolve(__dirname, 'manual.pdf'));
});

app.get('/old-route', (req, res) => {
    res.redirect('/cats');
});


app.get('*', (req, res) => {
    res.status(404).send('Not Found!')
} )

app.listen(5000, () => console.log('Server is listening on port 5000...'));
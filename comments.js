// Create web server using express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/comments', (req, res) => {
    fs.readFile('comments.json', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/comments', (req, res) => {
    const comment = req.body;
    fs.readFile('comments.json', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const comments = JSON.parse(data);
        comments.push(comment);
        fs.writeFile('comments.json', JSON.stringify(comments, null, 2), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            res.json(comments);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
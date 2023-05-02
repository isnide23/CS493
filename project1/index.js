const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const jsonParser = bodyParser.json();

const data = [];

app.get('/', (req, res) => {
    res.send("Hello, world!");
});

app.get('/data', (req, res) => {
    res.status(200).json(data);
});

app.get('/data/:id', (req, res) => {
    const id = req.params.id;

    if (id >= 0 && id < data.length)
        res.json(data[id]);
    else
        res.status(400).json({
            "err": "id out of range"
        });
});

app.post('/data', jsonParser, (req, res) => {
    const id = data.length;

    if (!req.body.name) {
        res.status(400).json({"err": "name required"});
    } else {
        data.push(req.body);
        res.json({
            "status": "ok",
            "id": id
        });
    }
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
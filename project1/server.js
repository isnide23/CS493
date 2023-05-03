const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

const routes = require('./routes')

app.get('/', (req, res) => {
    res.send("Hello, world!!!!");
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
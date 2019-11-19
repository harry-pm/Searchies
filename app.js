const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => res.send("index"));

app.get("/searches", (req,res) => res.sendFile(path.join(__dirname, '/public/results.html')));

app.listen(8080, () => console.log("Hello world"));


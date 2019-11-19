const express = require('express');
const app = express();
const port = 8080;

app.use(express.static("public"));

app.get("/", (req, res) => res.send("index"));

app.get("/searches", (req,res) => res.sendFile("results.html"));

app.listen(8080, () => console.log("Hello world"));


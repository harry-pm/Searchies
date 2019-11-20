const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => res.send("index"));

app.get("/searches", (req, res) => {
    console.log(req);
    console.log(req.query.searchBar); //search terms
    console.log(req.query.submit); //which button is clicked based on value returned 
    res.sendFile(path.join(__dirname, '/public/results.html'));
})

// app.post("/searches", (req,res) => {
//     console.log(req.body);
//     res.redirect('/searches')
// });

app.listen(8080, () => console.log("Hello world"));


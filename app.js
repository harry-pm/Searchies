const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const bodyParser = require('body-parser');

const util = require('util'),
  Bing = require('node-bing-api')({ accKey: '2d7c93e4d3e240fdad1cbb0f952cc591' })

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", (req, res) => res.send("index"));

app.get("/searches", (req, res) => {
    getBingData(req.query.searchBar)
        .then(data => {
            console.log("inside .then");
            console.log(data);
            console.log(data[0].url);
            res.render('results.ejs', {link1: data[0].url});
        })
        .catch(error =>{
            console.log("insde catch error");
            console.log(error);
        });
})

const getBingData = (searchTerm) => {
    return new Promise((resolve, reject) => {
        Bing.web(searchTerm, {count: 10, offset: 0}, function(error, res, body){
            console.log(body.webPages);
            let search = body.webPages.value;
            console.log("from bingData function:");
            console.log(search[0]);
            resolve(search);
        });
    });
};



app.listen(8080, () => console.log("Hello world"));


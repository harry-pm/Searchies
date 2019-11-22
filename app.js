const express = require('express');
const app = express();
//tells everything later on to run express in the background
const port = 8080;
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const util = require('util'),
  Bing = require('node-bing-api')({ accKey: '2d7c93e4d3e240fdad1cbb0f952cc591' })
  //bng api is a node package so this is how we will use it

app.use(express.static(path.join(__dirname, 'public')));
//this is outlining where our static stuff is (i.e. in 'public' directory). path.join(__dirname) ensures that it is not looking at a random folder called public, it is based on the directory where we currently are (app.js is in searchies so it will look for public in searchies)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//urlencoded helps us look at whats in the url

app.set('view engine', 'ejs');
//for ejs we must have our dynamic page in the view directory (coz of documentation)
app.get("/", (req, res) => res.send("index"));

app.get("/searches", (req, res) => {
    getBingData(req.query.searchBar)
        .then(data => {
            if(req.query.submit === 'search'){
                res.render('results', {arr: data});
            }
            else{
                res.redirect(data[0].url);
            }
        })
        .catch(error =>{
            console.log("insde catch error");
            console.log(error);
        });
})
//above calls the 'getbingdata' const and says .then, only execute the function once we have the data from getbingdata

const getBingData = (searchTerm) => {
    return new Promise((resolve, reject) => {
        Bing.web(searchTerm, {count: 10, offset: 0}, function(error, res, body){
            console.log(body.webPages);
            let search = body.webPages.value;
            console.log("from bingData function:");
            console.log(search[0]);
            resolve(search);
            //if we didnt have promis here, then once the inner function is done it would not have told the outer frunction to use the result
        });
    });
};



app.listen(8080, () => console.log("Hello world"));


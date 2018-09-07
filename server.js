'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const fs = require('fs');


const app = express(); //initilizing the express app 
app.set('port', (process.env.PORT || 3000)); // set's the server to listen on port 3000 or the port that is configured in the environment variable.

app.use(morgan('dev')); //logs every request to the console,
app.use(bodyParser.urlencoded({ extended: false })) // it parses application/x-www-form-urlencoded.
app.use(bodyParser.json()); // parse application/json
app.set('trust proxy 1');
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(cors());

app.listen(app.get('port'), function() {
    const url = 'http://localhost:' + app.set('port'); // only for quick access on test env.
    console.log('Application startion on ' + app.set('port'));
    console.log('click to launch in browser ' + url);

})

app.get('/ambee', function(req, res) {
    let queryData = req.query.d;
    let output = {};
    let obj = {
        data:[]
    };
    fs.readFile('temp/data.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data);
            let len = obj.data.length;
            obj.data.push({id: len + 1, reading: queryData});
            let json = JSON.stringify(obj); 
            fs.writeFile('temp/data.json',  json, 'utf8', function writeFileCallback(err, data) {
                if (err) throw err;
                fs.readFile('temp/data.json', 'utf8', function(err, data){
                    output = JSON.parse(data);
                    console.log(output);
                })
            })
        }
    })
    res.render('index', { data: output});
})


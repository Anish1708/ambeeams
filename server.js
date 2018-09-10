'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const moment = require('moment');
const PollutionData = require('./model/pm');

const app = express(); //initilizing the express app 
const dbConfig = require('./configuration/dbConfig');
mongoose.connect(dbConfig.connectionString, { useNewUrlParser: true });
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


mongoose.connection.on('connected', function() {
    app.listen(app.get('port'), function() {
        const url = 'http://localhost:' + app.set('port'); // only for quick access on test env.
        console.log('Application startion on ' + app.set('port'));
        console.log('click to launch in browser ' + url);
    
    });
});

app.get('/ambee', function(req, res) {
    let queryData = req.query.d;
    let currentTime = moment().utcOffset(330).format();
    const data = new PollutionData();
    data.pm_level = queryData;
    data.added_at = currentTime;
    console.log(`DATA ${queryData} saved at ${currentTime}`);
    // data.save(function(err) {
    //     if (err) throw err;
    //     console.log(`DATA ${queryData} saved at ${currentTime}`);
    // })
})


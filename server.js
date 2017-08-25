const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const pug = require('pug');

// ENV VARIABLES
require('dotenv').config({ path: 'variables.env' });

//IMPORT ROUTES
const routeMessage = require('./routes/message');
const route = require('./routes/routes');

// APP INIT
const app = express();

// DATABASE CONNECT
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useMongoClient: true });

app.use(express.static(__dirname + '/dist'));
app.set('view engine', 'pug');

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-type')
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    next();
});

app.use('/api/message', routeMessage);
app.use('/api', route);

// HANDLE ROUTE ERRORS
app.use(function(req, res, next) {
    return res.render('index');
});

// LISTENING PORT
app.listen(process.env.PORT || 4400, function () {
    console.log("Express server listening " + process.env.PORT || 4400);
});
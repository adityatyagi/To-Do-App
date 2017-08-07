var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');

// this require will return a function which will add a endpoint to the express app
var setupController = require('./controllers/setupController');

// this returns a function that will return the find, update, add and delete todo of a particular user
var apiController = require('./controllers/apiController');


var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDBConnectionString());

// setting up the endpoint -> /api/setupTools
setupController(app);
apiController(app);

app.listen(port);

// mongolab user database user credentials are: Username: aditya, password:test
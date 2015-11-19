"use strict";

// NEED TO USE Node 4.0.0 to include mongodb's dependency (kerberos@~0.0) and monk's dependency (mongodb@~1.4);
const PORT = process.env.PORT || 3000;
var methodOverride = require('method-override');
var parser = require('body-parser');
var express = require('express');
var app = express();

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/hire');    // set mongo to "use hire" database;

var routes = require('./routes/index');   // change to admin to initialize DB;
app.set ('view engine', 'jade');
app.set('views', './views');

app.use(function(req, res, next) {        // MUST BE before ALL routes;
  req.db = db;
  next();
});
app.use(methodOverride('_method'));        // enable PUT & DELETE methods;
app.use(parser.urlencoded({ extended: true }));       // parse form data;
app.use(parser.json());                    // for parsing application/ json;
app.use(express.static('./public'));
app.use('/', routes);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;   // path not found: must be AFTER ALL use() routes;
    next(err);
});
app.use(function(err, req, res, next) {
  if (err) {
    res.status(err.status || 500);    // error handling: must be AFTER ALL use() middlewares;
    res.render('error', {
      message : app.get('env') === 'development' ? err.message : 'Internal Server Error'
    });
  }
});

app.listen(PORT, function() {
  console.log('App is listening on port:', PORT);
});

// START MONGOD AT TERMINAL: mongod --dbpath ./data/
// START MONGO dbName AT TERMINAL: mongo hire
// START NODEMON AT TERMINAL: nodemon server.js
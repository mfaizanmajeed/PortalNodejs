/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , hike = require('./routes/hike')
  , http = require('http')
  , path = require('path')
  , pg = require('pg')
  , async = require('async');
  //var httpServer = http.createServer(app);
  //var http = require("https");
  var request_api = require('./request_api'); // used when requesting data from real services.;
  
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  console.log('Using development settings.');
  var dbConfig = {
    user: 'reonservice',
    password: 'reonservice3',
    database: 'ebdb',
    host: 'aa12el36evtsgj0.ckheu4oga9vc.us-east-2.rds.amazonaws.com',
    port: 5432
};
var client = new pg.Client(dbConfig);

//app.set('connection',  pg.Client(dbConfig));
//app.use(express.errorHandler());

client.connect();

client.end();
init();
/*

console.log('Using development settings.');
app.set('connection', mysql.createConnection({
  host: '',
  user: '',
  port: '',
  password: ''}));
app.use(express.errorHandler());*/
});

app.configure('production', function() {
  console.log('Using production settings.');
  app.set('connection', pg.connect({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT}));
});

function init() {
  app.get('/', routes.index);
  //app.get('/users', user.list);
  //app.get('/hikes', hike.index);

  //app.get('/test',request_api.gettoken());

  //app.post('/add_hike', hike.add_hike);

  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });
}

/*
app.get('/',function (request, response) {
  console.log('sd');
});*/

app.get('/login', function (request, response) {
  //console.log(request.query);
  request_api.gettoken(request,response,request.query);
  //console.log("hello");
  //
});
/*
var client = app.get('connection');
async.series([
  function connect(callback) {
    client.connect(callback);
  },
  function clear(callback) {
    client.query('DROP DATABASE IF EXISTS mynode_db', callback);
  },
  function create_db(callback) {
    client.query('CREATE DATABASE mynode_db', callback);
  },
  function use_db(callback) {
    client.query('USE mynode_db', callback);
  },
  function create_table(callback) {
     client.query('CREATE TABLE HIKES (' +
                         'ID VARCHAR(40), ' +
                         'HIKE_DATE DATE, ' +
                         'NAME VARCHAR(40), ' +
                         'DISTANCE VARCHAR(40), ' +
                         'LOCATION VARCHAR(40), ' +
                         'WEATHER VARCHAR(40), ' +
                         'PRIMARY KEY(ID))', callback);
  },
  function insert_default(callback) {
    var hike = {HIKE_DATE: new Date(), NAME: 'Hazard Stevens',
          LOCATION: 'Mt Rainier', DISTANCE: '4,027m vertical', WEATHER:'Bad'};
    client.query('INSERT INTO HIKES set ?', hike, callback);
  }
], function (err, results) {
  if (err) {
    console.log('Exception initializing database.');
    throw err;
  } else {
    console.log('Database initialization complete.');
    //init();
  }
});*/

/*
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});*/

//http.createServer(app).listen(app.get('port'), function(){
//  console.log("Express server listening on port " + app.get('port'));
//});
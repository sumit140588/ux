var http = require("http");
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');
var path = require('path');
var mongo = require('./mongo.js');
var account = require('./account.js');
var bodyParser = require('body-parser')
var session = require('express-session');
app.use(session({
  secret: 'portalSession'
}));
var sess;
//app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));;
// This responds with "Hello World" on the homepage
require("./baserouter")(app,path);
require("./accountrouter")(app,path);
app.use(function (req, res) {
  res.sendStatus(404);
});

function readFile() {

}
var server = app.listen(process.env.PORT || 8000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})

// Console will print the message
console.log('Server running at http://127.0.0.1:8000/');
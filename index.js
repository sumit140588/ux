var http = require("http");
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('views','./views');
 app.set('view engine', 'pug');
var path = require('path');


// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.render('index', { title: 'Hey', message: 'Hello there!' })
 // res.sendFile(path.join(__dirname + '/pages/home.html'));
})
app.get('/home.html', function (req, res) {
   console.log("Got a GET request for the homepage");
  //res.sendFile(path.join(__dirname + '/pages/home.html'));
  res.render('home', { title: 'Hey', message: 'Hello there!' })
})



// This responds a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})

app.get('/login.html', function (req, res) {
   console.log("Got a GET request for /login " +path.join(__dirname + '/pages/login.html'));
	res.sendFile(path.join(__dirname + '/pages/login.html'));
   
})
app.get('/register.html', function (req, res) {
   console.log("Got a GET request for /login " +path.join(__dirname + '/pages/register.html'));
	res.sendFile(path.join(__dirname + '/pages/register.html'));
   
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

app.use(function(req, res){
       res.sendStatus(404);
   });
function readFile(){
	
}
var server = app.listen(8000, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})

// Console will print the message
console.log('Server running at http://127.0.0.1:8000/');
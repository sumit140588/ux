var http = require("http");
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('views','./views');
 app.set('view engine', 'pug');
var path = require('path');
var mongo = require('./mongo.js');
var account=require('./account.js');
var bodyParser = require('body-parser')
var session = require('express-session');
app.use(session({secret: 'portalSession'}));
var sess;
//app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
;
// This responds with "Hello World" on the homepage

app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.render('home', { title: 'Hey', message: 'Hello there!' })
   console.log(mongo.insertSampleDoc()); 
   console.log( mongo.sum(1,2)); 
  //res.sendFile(path.join(__dirname + '/pages/home.html'));
})
app.get('/setup', function (req, res) {

   console.log("Got a GET request for the homepage");
   res.render('index', { title: 'Hey', message: 'Hello there!' })
   console.log(mongo.insertSampleDoc()); 
   console.log( mongo.sum(1,2)); 
  //res.sendFile(path.join(__dirname + '/pages/home.html'));
})
app.get('/home.html', function (req, res) {
   console.log("Got a GET request for the homepage");
 // res.sendFile(path.join(__dirname + '/pages/home.html'));
  res.render('home', { title: 'MediaStore', message: 'Hello there!' })
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
  sess=req.session;
  if(sess.email){
    res.redirect('home.html');
  }
   console.log("Got a GET request for /login " +path.join(__dirname + '/pages/login.html'));
  
	//res.sendFile(path.join(__dirname + '/pages/login.html'));
   res.render('login', { title: 'Login', message: 'Hello there!', page:'Login' })

   
})
app.post('/login', function (req, res) {
   console.log("Got a Post request for /login " +path.join(__dirname + '/pages/login.html')+"kll     "+req.body.email);
    console.dir(req.body);
  //res.sendFile(path.join(__dirname + '/pages/home.html'));
 
account.login(req.body.email,req.body.password,function(err,value){
        if(err===null){
          console.log("Error Object is null");
          sess = req.session;
//In this we are assigning email to sess.email variable.
//email comes from HTML page.
  sess.email=req.body.email;
          //res.sendFile(path.join(__dirname + '/pages/home.html'));
          res.redirect('home.html');
        }else{
          console.log("Value Object is not null");
         // res.render('login', { title: 'Login', message: 'Hello there!', page:'Login' });
         res.redirect('login.html');
        }
});

   
})
app.get('/login', function (req, res) {
   console.log("Got a Post request for /login " +path.join(__dirname + '/pages/login.html'));
  //res.sendFile(path.join(__dirname + '/pages/login.html'));
 

   
})
app.get('/register.html', function (req, res) {
   console.log("Got a GET request for /login " +path.join(__dirname + '/pages/register.html'));
	//res.sendFile(path.join(__dirname + '/pages/register.html'));
  res.render('register', { title: 'Register', message: 'Hello there!' })
   
})
app.get('/single-product.html', function (req, res) {
   console.log("Got a GET request for /login " +path.join(__dirname + '/pages/register.html'));
  res.sendFile(path.join(__dirname + '/pages/single-product.html'));
   
})
app.get('/product.html', function (req, res) {
   console.log("Got a GET request for /login " +path.join(__dirname + '/pages/register.html'));
 // res.sendFile(path.join(__dirname + '/pages/product.html'));
  res.render('product', { title: 'Register', message: 'Hello there!' })
   
})
app.get('/cart.html', function (req, res) {
   console.log("Got a GET request for /login " +path.join(__dirname + '/pages/register.html'));
  res.sendFile(path.join(__dirname + '/pages/cart.html'));
   
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
var server = app.listen(process.env.PORT||8000, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})

// Console will print the message
console.log('Server running at http://127.0.0.1:8000/');
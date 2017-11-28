var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongojs = require('mongojs');
var db = mongojs('127.0.0.1:27017/chatapp', ['chatapp']);

//init app
var io = require('socket.io')(http);

//Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Express session
app.use(session({
  secret: 'owekffhgfdghsfafgfsafdsmglkefmglkamg',
  saveUninitialized: true,
  resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//var chat = require('./routes/chat.js')(chat, io);
//app.use('/chat', chat);

io.on('connection', function(socket){
  console.log('We have a connection');
  socket.on('test', function(data){
    console.log(data);
  });
});

app.get('/', function(req, res) {
	res.render('public/index.html');
});

app.post('/api/username-available', function(req, res) {
  console.log(req.body.username);

  db.chatapp.find({ username: req.body.username}, function(err, data) {
  	console.log(data[0]);
  	if (err) {
      console.log("error"+err); // If there is an error, log it
    }
    //Try to parse username from DB, if error (no username) catch ...
    try {
      var username = data[0].username;

      console.log('Username Exists');
      return res.send({ exists: 1 }); // And send it back
    } catch (e) {
      console.log('Username Available');
      return res.send({ exists: 0 }); // Send Username Available
    } finally {

    }
	});

});

app.post('/register', function(req, res) {
  var name = req.body.name; // Gets name from Parameter
  var email = req.body.email; // Gets email from Parameter
  var email2 = req.body.email2; // Gets second email (confirmation) from Parameter
  var username = req.body.username; // Gets username from Parameter
  var password = req.body.password; // Gets password from Parameter
  var password2 = req.body.password2; // Gets second password (confirmation) from Parameter

  //Validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email2', 'Confirmation is required').notEmpty();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Confirmation password is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  req.checkBody('email2', 'Emails do not match').equals(req.body.email);

  var validateErrors = req.validationErrors();  // Add erros to validateErros varible
  // If they're errors
  if (validateErrors) {
    res.render('register', {
      errors: validateErrors
    });
    console.log('Not Validated!');
    db.chatApp.find();
  } else {
    console.log('Validated!');
    /*
    var newUser = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    }
    db.products.insert(newUser, function(err, result) {
      if(err) { throw err; }
      res.write("<p>Product inserted:</p>");
      res.end("<p>" + result[0].make + " " + result[0].model + "</p>");
    });
    */
  }
});



app.listen(3000);
console.log('Server running in port 3000');

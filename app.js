var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongojs = require('mongojs');
var db = mongojs('127.0.0.1:27017/chatapp', ['chatapp']);

var routes = require('./routes/index');
var users = require('./routes/users');

//init app

var app = express();

// View engine

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

//Middleware
app.use(express.static(path.join(__dirname, 'public')));

//Express session
app.use(session({
  secret: 'owekffhgfdghsfafgfsafdsmglkefmglkamg',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express Validator (Taken from github)
app.use(expressValidator({
  errorFormater: function(param, msg, value) {
    var namespace = param.split('.');
    var root = namespace.shift();
    var formParam = root;
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    }
  }
}));

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', routes);
app.use('/users', users);

app.listen(3000);
console.log('Server running in port 3000');

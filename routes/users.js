var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('127.0.0.1:27017/chatapp', ['chatapp']);

router.get('/register', function(req, res) {
  res.render('register');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/register', function(req, res) {
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

module.exports = router;

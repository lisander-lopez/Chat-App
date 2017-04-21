var express = require('express');
var router = express.Router();

//Get chatApp
router.get('/chat', function(req, res) {
  res.send({message: "Hello"});
});

module.exports = router;

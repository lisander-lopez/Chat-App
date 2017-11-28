module.exports = function(chat, io){
  chat.get('/', function(req, res) {
    res.send({message: "Hello"});
    
  });


};

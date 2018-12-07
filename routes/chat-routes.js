module.exports = function(app) {
  var chat = require('./../controllers/chat-controllers.js');
  
  app.post('/chat/create', chat.create);
    
  //to check if chat is created
  app.get('/chat/list', chat.chatlist);
}
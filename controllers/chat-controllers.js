var Chat = require('./../models/Chat.js');

module.exports.create =  function(request, response){
  var new_chat = new Chat(request.body);
  new_chat.save(function(err,data){
    if(err){
      console.log(err)
      return response.status(400).json({error: "Please add a name"});
      console.log(data);
    }
    console.log(data);
    return response.status(200).json({message: "Chat successfully created"});
  })
  
  console.log(request.body);
}

module.exports.chatlist = function(request, response) {
  Chat.find(function(err, data){
    if(err){
      response.status(400)
        .json({
          error: "Database query error"
        });
    }
  
    response.status(200).json({
      chat: data
    });
  });
}
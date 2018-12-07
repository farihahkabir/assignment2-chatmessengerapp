var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var chatSchema = new Schema({
    // members: [{
    //     memberName:{
    //         type: String,
    //         required: "Member Name required"
    //     },
    //     id:{
    //         type: mongoose.Schema.ObjectId, 
    //         ref: 'User'
    //     }
    // }],
    username: {
      type: String,
      required: "Username required"
    },
    sessionName:{
        type: String,
        required: "Session name required"
    }

    // messages: [{
    //     sender: {
    //         type: mongoose.Schema.ObjectId, 
    //         ref: 'User'
    //     },
        
    //     text: {
    //         type: String,
    //         required: "Messege Text required"
    //     }
    // }]
});

var Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
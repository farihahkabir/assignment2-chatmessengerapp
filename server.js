var http = require('http');
var express = require('express');
var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

var db; //contains database value after successful connection
var db_url = "mongodb://" + process.env.IP + ":27017";

var mongoose = require("mongoose");

//connecting to mongoose
mongoose.connect(db_url+"/user");
mongoose.connection.on('error', function(){
  console.log('Could not connect to mongodb');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

users = [];
connections = [];

app.get('/', function(req, res){
  res.render('chat.ejs');
});

require('./routes/chat-routes.js')(app);

io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('Connect: %s sockets connected', connections.length);
    
    //Disconnected
    socket.on('disconnect', function(){
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    });
    
    //Send Message
    socket.on('send message', function(data){
        //console.log(data);
        io.sockets.emit('new message', {msg: data, user:socket.username});
    });
    
    //New User
    socket.on('new user', function(data, callback) {
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    });
    
    function updateUsernames(){
        io.sockets.emit('get users', users);
    }

});

server.listen(process.env.PORT || 3000, process.env.IP, function(){ //c9 has predefined port (process.env.PORT) but if you use a local host, port 3000
  console.log('Server running');
});


    
    
    

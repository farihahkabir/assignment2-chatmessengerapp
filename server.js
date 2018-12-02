var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

users = [];
connections = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/login.html');
});

app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

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

http.listen(process.env.PORT || 3000, process.env.IP, function(){ //c9 has predefined port (process.env.PORT) but if you use a local host, port 3000
  console.log('Server running');
});


    
    
    

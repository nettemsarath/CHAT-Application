var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  
});

var clients = [];
io.on('connection', function(socket){
  socket.on('set-name', function(name) {
    clients.push({
      id: socket.id,
      name: name
    });
  });
  socket.on('chat message', function(obj){
    var prefClient = clients.find(function(client) {
      console.log(client.name);
      console.log(obj.rec);
      return client.name === obj.rec;
    });
    var idr = prefClient.id;
    io.to(idr).emit("chat message", obj);//obj.msg
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
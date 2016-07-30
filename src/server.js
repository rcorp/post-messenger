var io = require('socket.io')(8080);
var pm = {};
global.connectCentre = {};
io.on('connection', function(socket){
  socket.on('connected',function(data){
    console.log('data',data);
    if(data.platform){
      io.sockets.to('clients').emit('targetConnected', socket.id);
    } else{
      socket.join('clients');
    }
});

socket.on('selectedTargetId', function(selectedTargetId){
  connectCentre = {[selectedTargetId]:socket.id};
});

socket.on('send message to a target',function(data){
  io.sockets.to(data.targetId).emit(data.eventName, data.eventData);
});

socket.on('send message to a client', function(data){
  socket.id;
  io.sockets.to(connectCentre[socket.id]).emit(data.eventName, data.eventData);
});

});

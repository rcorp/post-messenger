var io = require('socket.io')(8080);
var pm = {};
global.connectCentre = {};
io.on('connection', function(socket){
  socket.on('connected', function(data){
    // check the platform of target
    if(data.platform){
      io.sockets.to('clients').emit('targetConnected', socket.id);
      socket._pm = {};
      socket._pm.type = 'target';
    } else{
      socket.join('clients');
      socket._pm = {};
      socket._pm.type = 'client'
    }
  });

socket.on('selectedTargetId', function(selectedTargetId){
  connectCentre = {[selectedTargetId]:socket.id};
});

socket.on('sendMessageToTarget', function(data){
  io.sockets.to(data.targetId).emit(data.eventName, data.eventData);
});

socket.on('sendMessageToClient', function(data){
  io.sockets.to(connectCentre[socket.id]).emit(data.eventName, data.eventData);
});

socket.on('disconnect', function () {
  if(socket._pm.type == 'target') {
    var clientid = connectCentre[socket.id];
    io.sockets.to(clientid).emit('targetDisconnected',socket.id);
  }
});

});

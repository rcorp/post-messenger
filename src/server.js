var connectCentre = {};
module.exports = function (socket, next){
  socket.on('connected', function(data){
    socket._pm = {};

    // check the if the connect socket is a target
    if(data.platform){
      socket._pm.type = 'target';
      socket.to('clients').emit('targetConnected', socket.id);
    }

    // Or a client!
    else {
      socket._pm.type = 'client'
      socket.join('clients');
    }
  });

  socket.on('selectedTargetId', function(selectedTargetId){
    connectCentre[selectedTargetId] = socket.id;
  });

  socket.on('sendMessageToTarget', function(data){
    socket.to(data.targetId).emit(data.eventName, data.eventData);
  });

  socket.on('sendMessageToClient', function(data){
    socket.to(connectCentre[socket.id]).emit(data.eventName, data.eventData);
  });

  socket.on('disconnect', function () {
    if(socket._pm.type == 'target') {
    //  var clientid = connectCentre[socket.id];
      socket.to(clients).emit('targetDisconnected',socket.id);
    }
  });

  next();
};

var socket;
var pm = {};
pm.connect = function(serverURl){
  socket = io(serverURl);
  socket.on('connect', function(){
    socket.emit('connected',{});
  });
};

pm.on = function(eventName, cb){
  socket.on(eventName, function(eventData){
    if(eventName == "targetConnected"){
      cb(eventData);
    } else{
      console.log ('Inside socket.on');
      cb(eventData);
    }
  });
};

pm.connectTarget = function(selectedTargetId){
  socket.emit('selectedTargetId', selectedTargetId);
};

pm.emit = function(eventName, selectedTargetId, eventData){
  socket.emit('send message to a target', {
    eventName: eventName,
    targetId: selectedTargetId,
    eventData: eventData
  });
};

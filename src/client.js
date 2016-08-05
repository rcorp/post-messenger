var io = require('socket.io-client');
var pm = {};
pm.connect = function(serverURl){
  pm._socket = io(serverURl);
  pm._socket.on('connect', function(){
    pm._socket.emit('connected',{});
  });
};

pm.on = function(eventName, cb){
  pm._socket.on(eventName, function(eventData){
    if(eventName == "targetConnected"){
      cb(eventData);
    } else{
      cb(eventData);
    }
  });
};

pm.connectTarget = function(selectedTargetId){
  pm._socket.emit('selectedTargetId', selectedTargetId);
};

pm.emit = function(eventName, selectedTargetId, eventData){
  pm._socket.emit('sendMessageToTarget', {
    eventName: eventName,
    targetId: selectedTargetId,
    eventData: eventData
  });
};

module.exports = pm;

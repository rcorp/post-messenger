var io = require('socket.io-client');
var pm = {};
pm.connect = function(serverURl){
  pm._socket = io(serverURl);
  pm._socket.on('connect', function() {
    // emit the platform details to server
    pm._socket.emit('connected', {platform:'platform'});
  });
};

pm.on = function(eventName, cb){
  pm._socket.on(eventName, function(eventData){
    cb(eventData);
  });
};

pm.emit = function(eventName, eventData){
  pm._socket.emit('sendMessageToClient',{
    eventName: eventName,
    eventData: eventData
  });
};
module.exports = pm;

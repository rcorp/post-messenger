var socket;
var pm = {};
pm.connect = function(serverURl){
  socket = io(serverURl);
  socket.on('connect', function() {
    socket.emit('connected', {platform:'platform'});
  });
};

pm.on = function(eventName, cb){
  console.log ('Inside on');
  socket.on(eventName, function(eventData){
    console.log ('Inside socket.on');
    cb(eventData);
  });
};

pm.emit = function(eventName, eventData){
  socket.emit('send message to a client',{
    eventName: eventName,
    eventData: eventData
  });
};

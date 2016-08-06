var targetIds =[];
var pm = require('pm/pm-client');
pm.connect('http://localhost:8081');
pm.on('targetConnected', function(targetId){
  console.log('target name---', targetId);
  targetIds.push(targetId);
  console.log('targetIds', targetIds);
});
setTimeout(function(){
  pm.connectTarget(targetIds[1]);
  pm.emit('sendMessageToTheSelectedTarget', targetIds[1], 'hello target1');
  pm.emit('myevent2', targetIds[1], {d: 2})
  pm.emit('myevent1', targetIds[1], {d: 1})
  pm.on('sendMessageToTheSelectedClient', function(eventdata){
    console.log('client message', eventdata);
  });
},20000);
setTimeout(function(){
  pm.on('sendMessageToTheSelectedClient', function(eventdata){
    console.log('client message', eventdata);
  });
},8000);

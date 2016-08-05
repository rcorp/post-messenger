var io = require('socket.io')(8081);
io.use(require('../src/server.js'));
console.log ('Test Server started');

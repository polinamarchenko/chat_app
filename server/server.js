const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var publicPath = path.join(__dirname, '../public')

var app = express();
//we're using server to create our server not the app!!!
var server = http.createServer(app);

//we get websocket server:
var io = socketIO(server);

const port = process.env.PORT || 3000
//configure express static middleware to serve the public folder
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: "Polina",
    text: "Hello World",
    createdAt: 123
  });

  socket.on('createMessage', function(email) {
    console.log('created message', email);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

});

server.listen(port, () => {
  console.log(`Application started. Listening on port: ${port}`);
})


module.exports = {app};

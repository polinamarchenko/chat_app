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
    from: 'admin',
    text: 'welcome to chat room',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'admin',
    text: 'New user joined the chat room',
    createdAt: new Date().getTime()
  })

  socket.on('createMessage', function(message) {
    console.log('created message', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
    // //send message to everybody except of the socket:
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

});

server.listen(port, () => {
  console.log(`Application started. Listening on port: ${port}`);
})


module.exports = {app};

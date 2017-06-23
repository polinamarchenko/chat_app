const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');

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

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the chat room'));

  socket.on('createMessage', (message, callback) => {
    console.log('created message', message);
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

});

server.listen(port, () => {
  console.log(`Application started. Listening on port: ${port}`);
})


module.exports = {app};

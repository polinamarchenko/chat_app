//cheatsheet:
//io.emit - emits event to everybody
//socket.broadcast - emits event to everybody except of the person who emitted it
//socket.emit - emits event specifically to the person


const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var publicPath = path.join(__dirname, '../public')

var app = express();
//we're using server to create our server not the app!!!
var server = http.createServer(app);

//we get websocket server:
var io = socketIO(server);

//add users instance
var users = new Users();

const port = process.env.PORT || 3000
//configure express static middleware to serve the public folder
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.channel)) {
      return callback('Name and channel name are required')
    }

    socket.join(params.channel);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.channel);

    io.to(params.channel).emit('updateUserList', users.getUserList(params.channel));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.channel).emit('newMessage', generateMessage('Admin', `${params.name} has joined the chat room`));

  });

  socket.on('createMessage', (message, callback) => {
    console.log('created message', message);
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if(user) {
      io.to(user.channel).emit('updateUserList', users.getUserList(user.channel));
      io.to(user.channel).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });

});

server.listen(port, () => {
  console.log(`Application started. Listening on port: ${port}`);
})


module.exports = {app};

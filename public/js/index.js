var socket = io();
socket.on('connect', () => {
  console.log('connected to server');
})

socket.emit('createMessage', {
  from: 'Polina',
  text: 'Hello hello'
}, function(data) {
  console.log(data, 'Got it');
});

socket.on('newMessage', function(message) {
  console.log('new message', message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});

$("#message-form").on("submit", function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function() {

  })
})

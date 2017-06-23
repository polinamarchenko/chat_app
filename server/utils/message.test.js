var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = "Polina";
    var text = "Hello everybody";
    var message = generateMessage(from, text);
    expect(message).toInclude({from, text});
    expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = "Polina";
    var latitude = 1;
    var longitude = 1;
    var url = 'https://www.google.com/maps?q=1,1';
    var locationMessage = generateLocationMessage(from, latitude, longitude);
    expect(locationMessage.createdAt).toBeA('number');
    expect(locationMessage).toInclude({from, url});
  })
})

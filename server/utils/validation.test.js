var expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should return if value is a string', () => {
    var str = "   Hello"
    var result = isRealString(str);
    expect(result).toBe(true);
  });
  it('should reject if string with only spaces', () => {
    var str = "      "
    var result = isRealString(str);
    expect(result).toBe(false);
  });
  it('should reject if value is not a string', () => {
    var str = 12345
    var result = isRealString(str);
    expect(result).toBe(false);
  });
});

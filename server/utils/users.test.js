const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: "Mike",
      channel: "A"
    }, {
      id: 2,
      name: "Rose",
      channel: "B"
    }, {
      id: 3,
      name: "Lisa",
      channel: "A"
    }]
  })

  it('should add a new user', () => {
    let users = new Users();
    const user = {id: '123456', name: 'Polina', channel: 'Nerds'};
    const resUser = users.addUser(user.id, user.name, user.channel);
    //this.users from constructor => users.users, because our instance variable is called users too
    expect(users.users).toEqual([user]);
  });

  it('should return a selected user', () => {
    const user = users.getUser(2);
    expect(user).toEqual({
      id: 2,
      name: "Rose",
      channel: "B"
    });
  });

  it('should not return a selected user if id is not found', () => {
    const user = users.getUser(10);
    expect(user).toNotExist();
  });

  it('should remove a selected user', () => {
    const user = users.removeUser(2);
    expect(user.id).toBe(2);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a selected user if id not found', () => {
    const user = users.removeUser(10);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should return names for all users in the channel', () => {
    const channel = "A";
    const userList = users.getUserList(channel);
    expect(userList).toEqual(["Mike", "Lisa"]);
  })

})

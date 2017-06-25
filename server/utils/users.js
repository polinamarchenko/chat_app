class Users {
  constructor () {
    this.users = []
  }

  addUser(id, name, channel) {
    const user = {id, name, channel};
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    const user = (this.users.filter((user) => user.id === id))[0];

    if (user) {
      this.users = this.users.filter((user) => user.id !== id)
    }
    return user;
  }

  getUser(id) {
    return (this.users.filter((user) => user.id === id))[0];
  }

  getUserList(channel) {
    //return the array of names
    const users = this.users.filter((user) => user.channel === channel);
    return users.map((user) => user.name);
  }
}

module.exports = {Users};

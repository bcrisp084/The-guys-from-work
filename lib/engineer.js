const Employee = require("./employee");

class Engineer extends Employee {
  constructor(name, id, email, GitHub) {
    super(name, id, email);
    this.GitHub = GitHub;
  }
  getRole() {
    return "Engineer";
  }
  getGitHub() {
    return this.GitHub;
  }
}

module.exports = Engineer;

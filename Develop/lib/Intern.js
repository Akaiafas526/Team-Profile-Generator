const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.school = school;
  }

  getRole() {
    return 'Intern'
  }

  getSchool() {
    this.school
  }

}

module.exports = Intern;

const fs = require("fs");
const inquirer = require("inquirer");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");
const render = require("./lib/renderhtml");
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "dist");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const teamMates = [];
const idTaken = [];

const createManager = () => {
  console.log("Who are the guys from work");
  console.log("--------------------------");
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the managers name",
        name: "name",
        validate: (response) => {
          if (response !== "") {
            return true;
          }
          return "Please select atleast one character.";
        },
      },
      {
        type: "input",
        message: "Enter the managers id number",
        name: "id",
        validate: (response) => {
          const pass = response.match(/^[1-9]\d*$/);
          if (pass) {
            return true;
          }
          return "Select a number greater than zero";
        },
      },
      {
        type: "input",
        message: "Enter the managers emails address",
        name: "email",
        validate: (response) => {
          const pass = response.match(/\S+@\S+\.\S+/);
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        },
      },
      {
        type: "input",
        message: "Enter the managers office number.",
        name: "officeNumber",
        validate: (response) => {
          const pass = response.match(/^[1-9]\d*$/);
          if (pass) {
            return true;
          }
          return "Select a number greater than zero";
        },
      },
    ])
    .then((response) => {
      const manager = new Manager(
        response.name,
        response.id,
        response.email,
        response.officeNumber
      );
      teamMates.push(manager);
      idTaken.push(response.id);
      createEmployee();
    })
    .catch((err) => {
      throw err;
    });
};

const createEmployee = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Select an employee to add to the team",
        name: "employees",
        choices: ["Engineer", "Intern", "Exit"],
      },
    ])
    .then((response) => {
      if (response.employees === "Engineer") {
        addEngineer();
      } else if (response.employees === "Intern") {
        addIntern();
      } else {
        const renderHtml = render(teamMates);
        fs.writeFile(outputPath, renderHtml, function (err) {
          if (err) throw err;
          console.log("Creating your team.");
        });
      }
    });
};

const addEngineer = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the engineers name",
        name: "name",
        validate: (response) => {
          if (response !== "") {
            return true;
          }
          return "Please select atleast one character.";
        },
      },
      {
        type: "input",
        message: "Please enter the id number",
        name: "engineerId",
        validate: (response) => {
          const pass = response.match(/^[1-9]\d*$/);
          if (pass) {
            if (idTaken.includes(response)) {
              return "Enter a different number this one is in use";
            } else {
              return true;
            }
          }
          return "Select a number greater than zero";
        },
      },
      {
        type: "input",
        message: "Enter the email address",
        name: "email",
        validate: (response) => {
          const pass = response.match(/\S+@\S+\.\S+/);
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        },
      },
      {
        type: "input",
        message: "Enter the GitHub user name",
        name: "GitHub",
        validate: (response) => {
          if (response !== "") {
            return true;
          }
          return "Please select atleast one character.";
        },
      },
    ])
    .then((response) => {
      const engineer = new Engineer(
        response.name,
        response.engineerId,
        response.email,
        response.GitHub
      );
      teamMates.push(engineer);
      idTaken.push(response.engineerId);
      createEmployee();
    })
    .catch((err) => {
      throw err;
    });
};

const addIntern = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the interns name",
        name: "name",
        validate: (response) => {
          if (response !== "") {
            return true;
          }
          return "Please select atleast one character.";
        },
      },
      {
        type: "input",
        message: "Please enter the id number for the intern",
        name: "internId",
        validate: (response) => {
          const pass = response.match(/^[1-9]\d*$/);
          if (pass) {
            if (idTaken.includes(response)) {
              return "Enter a different number this one is in use";
            } else {
              return true;
            }
          }
          return "Select a number greater than zero";
        },
      },
      {
        type: "input",
        message: "Enter the interns email address",
        name: "email",
        validate: (response) => {
          if (response !== "") {
            return true;
          }
          return "Please select atleast one character.";
        },
      },
      {
        type: "input",
        message: "Enter the interns school",
        name: "school",
        validate: (response) => {
          if (response !== "") {
            return true;
          }
          return "Please select atleast one character.";
        },
      },
    ])
    .then((response) => {
      const intern = new Intern(
        response.name,
        response.internId,
        response.email,
        response.school
      );
      teamMates.push(intern);
      idTaken.push(response.internId);
      createEmployee();
    })
    .catch((err) => {
      throw err;
    });
};

createManager();

// File paths, directories and npm packages required

const fs = require("fs");
const inquirer = require("inquirer");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");
const render = require("./lib/renderhtml");
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
// array and team id for teammates added
const teamMates = [];
const idTaken = [];

// Arrow function to start the process that reners the manager
/* All prompts have validation to ensure the user doesn't enter 
incorrect info. */
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

    // Responses are add to the manager that was created
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

/* Function to create a team member be it an engineer or an intern with the 
option to end after adding the neccesary teammates. once ended the html page 
is rendered */
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

    // depending on the user response that function is called to generate that employee
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

//function to create the engineer. all prompts have validation.
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

    // repsonses are pushed to the new engineer
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

// function to create the intern. all prompts have validation to prevent user error.
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

    //repsonses are pushed to the new intern.
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
// starts the process of creating the team.
createManager();

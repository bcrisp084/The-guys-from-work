// file system and path required to connect the program.

const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../src");

//function to filter and map the different employees that have been created
const render = (employees) => {
  const html = [];

  /* filters the employee based on the manager role and than creates a new array that adds
  the new position that was created */
  html.push(
    ...employees
      .filter((employee) => employee.getRole() === "Manager")
      .map((manager) => renderManager(manager))
      .join("")
  );
  // filters the employee based on the engineer role that adds that to the new array.
  html.push(
    ...employees
      .filter((employee) => employee.getRole() === "Engineer")
      .map((engineer) => renderEngineer(engineer))
      .join("")
  );

  // filters the employee based on the intern role and adds that to the new array
  html.push(
    ...employees
      .filter((employee) => employee.getRole() === "Intern")
      .map((intern) => renderIntern(intern))
      .join("")
  );

  return renderMain(html.join(""));
};

// function to add the newly created manager to the template placeholders in the html file
const renderManager = (manager) => {
  let template = fs.readFileSync(
    path.resolve(templatesDir, "manager.html"),
    "utf8"
  );
  template = replacePlaceholders(template, "name", manager.getName());
  template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(
    template,
    "officeNumber",
    manager.getOfficeNumber()
  );
  return template;
};

// function to add the newly created engineer to the template placeholders in the html file

const renderEngineer = (engineer) => {
  let template = fs.readFileSync(
    path.resolve(templatesDir, "engineer.html"),
    "utf8"
  );
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGitHub());
  return template;
};

// function to add the newly created intern to the template placeholders in the html file

const renderIntern = (intern) => {
  let template = fs.readFileSync(
    path.resolve(templatesDir, "intern.html"),
    "utf8"
  );
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
};

/* function to render the html page based on the responses from the user and the 
newly created array of team members and joins them to the html file along with 
the templates */

const renderMain = (html) => {
  const template = fs.readFileSync(
    path.resolve(templatesDir, "employee.html"),
    "utf8"
  );
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;

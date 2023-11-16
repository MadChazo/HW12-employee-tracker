// Required packages
const inquirer = require("inquirer");
const express = require("express");
require("dotenv").config();
// Require in actions file
const actions = require("./lib/actions.js");

const employee = new actions();
const PORT = process.env.PORT;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Question array
const question = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "action",
    default: "Quit",
    choices: [
      "Add Department",
      "Add Employee",
      "Add Role",
      "Update Employee Role",
      "View All Departments",
      "View All Employees",
      "View All Roles",
      "Quit",
    ],
  },
];

// Directs to proper function to handle action requested
function handleAnswers(answers) {
  switch (answers.action) {
    case "Add Department":
      employee.addDept(init);
      break;
    case "Add Employee":
      employee.addEmp(init);
      break;
    case "Add Role":
      employee.addRole(init);
      break;
    case "Update Employee Role":
      employee.updateRole(init);
      break;
    case "View All Departments":
      employee.viewDept(init);
      break;
    case "View All Employees":
      employee.viewEmp(init);
      break;
    case "View All Roles":
      employee.viewRole(init);
      break;
    default:
      return;
  }
}

//BUG: Repeats initial question once the first time arrow key pressed - I think this is just an Inquirer bug
// Initialize function
const init = function () {
  inquirer.prompt(question).then((answers) => {
    if (answers.action === "Quit") {
      return;
    } else {
      handleAnswers(answers);
    }
  });
};

// Call to initialize
init();

// Any other request will respond not found
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

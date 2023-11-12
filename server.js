// Required packages
const mysql = require("mysql2");
const inquirer = require("inquirer");
const express = require("express");
require("dotenv").config();
const actions = require("./lib/actions.js");

const employee = new actions();
const PORT = process.env.PORT;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// // Connect to database
// const db = mysql.createConnection(
//   {
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//   },
//   console.log(`Connected to the ${process.env.DATABASE} database.`)
// );

//Question array
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
      employee.addDept();
      break;
    case "Add Employee":
      employee.addEmp();
      break;
    case "Add Role":
      employee.addRole();
      break;
    case "Update Employee Role":
      employee.updateRole();
      break;
    case "View All Departments":
      employee.viewDept();
      break;
    case "View All Employees":
      employee.viewEmp();
      break;
    case "View All Roles":
      employee.viewRole();
      break;
    default:
      return;
  }
}

// Initialize function
function init() {
  inquirer.prompt(question).then((answers) => {
    if (answers.action === "Quit") {
      return;
    } else {
      handleAnswers(answers);
    }
  });
}

// Call to initialize
init();

// Any other request will respond not found
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

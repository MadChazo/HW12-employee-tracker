// Required packages
const mysql = require("mysql2");
const inquirer = require("inquirer");
const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
  console.log(`Connected to the ${database} database.`)
);

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
const addDptQ = [
  {
    type: "input",
    message: "Enter the name of the new department.",
    name: "dptName",
    default: "New Department",
    validate: function (input) {
      if (!input) {
        return "Must input department name.";
      } else {
        return true;
      }
    },
  },
];
const addEmpQs = [
  {
    type: "input",
    message: "Enter the employee's first name.",
    name: "empFName",
    default: "John",
    validate: function (input) {
      if (!input) {
        return "Must input employee name.";
      } else {
        return true;
      }
    },
  },
  {
    type: "input",
    message: "Enter the employee's last name.",
    name: "empLName",
    default: "Doe",
  },
  {
    type: "list",
    message: "Choose the employee's role.",
    name: "empRole",
    choices: []
  },
  {
    type: "list",
    message: "Choose the employee's manager.",
    name: "empMan",
    default: "None",
    choices: []
  }
]

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

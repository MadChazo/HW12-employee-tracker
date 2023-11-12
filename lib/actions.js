const mysql = require("mysql2");
const inquirer = require("inquirer");
// require("console.table");
require("dotenv").config();

const db = mysql.createConnection(
  {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
  console.log(`Connected to the ${process.env.DATABASE} database.`)
);

class Employee {
  constructor() {}

  addDept() {
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
    inquirer
      .prompt(addDptQ)
      .then((answers) => {
        const query = `INSERT INTO department (name) VALUES (?)`;
        const values = [answers.dptName];
        db.execute(query, values, (err, result) => {
          if (err) {
            console.error(err);
            return err;
          } else {
            console.log("Department added successfully.");
            return "Department added successfully.";
          }
        });
      })
      .catch((error) => console.error("Error adding department: ", error));
  }

  addEmp() {
    const roles = ["Other"];
    const employees = ["None"];
    var manID;
    var roleID;
    var fName;
    var lName;
    var roleName;
    db.query("SELECT title FROM role", (err, result) => {
      result.forEach((role) => {
        roles.push(role.title);
      });
    });
    db.query("SELECT first_name, last_name FROM employee", (err, result) => {
      result.forEach((emp) => {
        let name = `${emp.first_name} ${emp.last_name}`;
        employees.push(name);
      });
    });
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
        default: "Other",
        choices: roles,
      },
      {
        type: "list",
        message: "Choose the employee's manager.",
        name: "empMan",
        default: "None",
        choices: employees,
      },
    ];
    inquirer
      .prompt(addEmpQs)
      .then((answers) => {
        fName = answers.empFName;
        lName = answers.empLName;
        roleName = answers.empRole;
        if (answers.empMan === "None") {
          manID = null;
        } else {
          var names = answers.empMan.split(" ");
          db.promise()
            .query(
              `SELECT id FROM employee WHERE first_name = '${names[0]}' AND last_name = '${names[1]}'`
            )
            .then((result) => {
              manID = result[0][0].id;
              if (roleName === "Other") {
                roleID = null;
              } else {
                db.promise()
                  .query(`SELECT id FROM role WHERE title = '${roleName}'`)
                  .then((result) => {
                    roleID = result[0][0].id;
                    const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                    const values = [fName, lName, roleID, manID];
                    db.execute(query, values, (err, result) => {
                      if (err) {
                        console.error(err);
                      } else {
                        console.log("Employee added successfully.");
                      }
                    });
                  })
                  .catch((error) =>
                    console.error("Error adding employee: ", error)
                  );
              }
            })
            .catch((error) => console.error("Error adding employee: ", error));
        }
      })
      .catch((error) => console.error("Error adding employee: ", error));
  }

  addRole() {
    const departments = ["Other"];
    var deptID;
    var title;
    var salary;
    db.query("SELECT name FROM department", (err, result) => {
      result.forEach((dept) => {
        departments.push(dept.name);
      });
    });
    const addRoleQs = [
      {
        type: "input",
        message: "Enter the title of the new role",
        name: "roleTitle",
        default: "Employee",
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
        message:
          "Enter the yearly salary in dollars for the new role (without commas or currency symbols).",
        name: "roleSalary",
        default: 0,
        validate: function (input) {
          if (parseInt(input) === NaN) {
            return "Must input a number.";
          } else {
            return true;
          }
        },
      },
      {
        type: "list",
        message: "Choose a department for the new role.",
        name: "roleDept",
        default: "Other",
        choices: departments,
      },
    ];
    inquirer
      .prompt(addRoleQs)
      .then((answers) => {
        title = answers.roleTitle;
        salary = answers.roleSalary;
        if (answers.roleDept === "Other") {
          deptID = null;
        } else {
          db.promise()
            .query(
              `SELECT id FROM department WHERE name = '${answers.roleDept}'`
            )
            .then((result) => {
              deptID = result[0][0].id;
              const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
              const values = [title, salary, deptID];
              db.execute(query, values, (err, result) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log("Role added successfully.");
                }
              });
            })
            .catch((error) => console.error("Error adding role: ", error));
        }
      })
      .catch((error) => console.error("Error adding role: ", error));
  }

  updateRole() {
    const roles = ["Other"];
    const employees = [];
    var empID;
    var roleID;
    var newRole;
    const updateRoleQs = [];
    db.promise()
      .query("SELECT first_name, last_name FROM employee")
      .then((result) => {
        let nameList = result[0];
        nameList.forEach((emp) => {
          let name = `${emp.first_name} ${emp.last_name}`;
          employees.push(name);
        });
        db.promise()
          .query("SELECT title FROM role")
          .then((result) => {
            let roleList = result[0];
            roleList.forEach((role) => {
              roles.push(role.title);
            });
            updateRoleQs.push(
              {
                type: "list",
                message: "Select employee to update.",
                name: "updateEmp",
                choices: employees,
              },
              {
                type: "list",
                message: "Select employee role.",
                name: "updateRole",
                default: "Other",
                choices: roles,
              }
            );
            inquirer
              .prompt(updateRoleQs)
              .then((answers) => {
                if (answers.updateRole === "Other") {
                  roleID = null;
                  var names = answers.updateEmp.split(" ");
                  db.promise()
                    .query(
                      `SELECT id FROM employee WHERE first_name = '${names[0]}' AND last_name = '${names[1]}'`
                    )
                    .then((result) => {
                      empID = result[0][0].id;
                      const query = `UPDATE employee SET role_id = ? WHERE id = ?`;
                      const values = [roleID, empID];
                      db.execute(query, values, (err, result) => {
                        if (err) {
                          console.error(err);
                          return new Promise((resolve) => {
                            resolve(err);
                          });
                        } else {
                          console.log("Role updated successfully.");
                          return new Promise((resolve) => {
                            resolve("Role updated successfully.");
                          });
                        }
                      });
                    })
                    .catch((error) =>
                      console.error("Error updating role: ", error)
                    );
                } else {
                  newRole = answers.updateRole;
                  var names = answers.updateEmp.split(" ");
                  db.promise()
                    .query(
                      `SELECT id FROM employee WHERE first_name = '${names[0]}' AND last_name = '${names[1]}'`
                    )
                    .then((result) => {
                      empID = result[0][0].id;
                      db.promise()
                        .query(`SELECT id FROM role WHERE title = '${newRole}'`)
                        .then((result) => {
                          roleID = result[0][0].id;
                          const query = `UPDATE employee SET role_id = ? WHERE id = ?`;
                          const values = [roleID, empID];
                          db.execute(query, values, (err, result) => {
                            if (err) {
                              console.error(err);
                            } else {
                              console.log("Role updated successfully.");
                            }
                          });
                        })
                        .catch((error) =>
                          console.error("Error updating role: ", error)
                        );
                    })
                    .catch((error) =>
                      console.error("Error updating role: ", error)
                    );
                }
              })
              .catch((error) => console.error("Error updating role: ", error));
          })
          .catch((error) => console.error("Error getting role list: ", error));
      })
      .catch((error) => console.error("Error getting employee list: ", error));
  }

  viewDept() {
    db.promise()
      .query("SELECT * FROM department")
      .then((result) => {
        let deptList = result[0];
        console.table(deptList);
      });
  }

  viewEmp() {
    db.promise()
      .query("SELECT * FROM employee")
      .then((result) => {
        let empList = result[0];
        console.table(empList);
      });
  }

  viewRole() {
    db.promise()
      .query("SELECT * FROM role")
      .then((result) => {
        let roleList = result[0];
        console.table(roleList);
      });
  }
}

module.exports = Employee;

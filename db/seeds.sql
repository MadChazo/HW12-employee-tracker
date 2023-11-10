INSERT INTO department (name)
VALUES ("Quality Assurance"),
("Sales"),
("Human Resources"),
("Accounting"),
("Management"),
("Warehouse"),
("Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 30000, 2),
("Quality Assurance Rep", 40000, 1),
("Warehouse Foreman", 40000, 6),
("Warehouse Staff", 25000, 6),
("Assistant to the Reg Manager", 30000, 2),
("Regional Manager", 45000, 5),
("Human Resources Rep", 40000, 3),
("Accountant", 35000, 4),
("Customer Service Rep", 35000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 6, NULL),
("Jim", "Halpert", 1, 1),
("Stanley", "Hudson", 1, 1),
("Phyllis", "Lapin", 1, 1),
("Dwight", "Schrute", 5, 1),
("Creed", "Bratton", 2, 1),
("Toby", "Flenderson", 7, 1),
("Kevin", "Malone", 8, 1),
("Angela", "Martin", 8, 1),
("Oscar", "Martinez", 8, 1),
("Kelly", "Kapoor", 9, 1),
("Darryl", "Philbin", 3, NULL),
("Jerry", "DiCanio", 4, 12),
("Madge", "Madsen", 4, 12),
("Lonny", "Collins", 4, 12);



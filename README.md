# Employee Tracker

## Table of Contents

• [Description](#description)  
• [Installation](#installation)  
• [Usage](#usage)  
• [License](#license)  
• [Credits](#credits)

## Description

This application was created as a homework assignment for the University of Richmond coding boot camp. The task was to create an employee tracking application that runs in the CLI using MySQL and Express. While working on this project, I learned about creating and manipulating an SQL database.

## Installation

Clone this repository from GitHub. Before use, make sure you have Node.js and MySQL installed, and run the npm install command in your terminal while in the directory containing the server.js and package.json files to install the required npm packages for this application.

## Usage

Before starting the server, make sure that you make a .env file based on the .env.example in the repo. You will also want to create and seed the MySQL database using the schema and seeds files in the db folder.

Start the server with npm start. You will then be asked to pick from a series of actions, and can view and manipulate certain elements of the employee database, such as viewing all departments, or adding a new employee. Each view action will create a table in the console. Each add action will have sub-prompts asking you to give information to complete the database entry associated with your action. Try not to leave any of them as an empty string, just a space, or something else that might mess with the database code or legibility in the future. After each action, the menu will reappear, unless you choose to quit, which will end the loop, and you can close the server using Cmd/Ctrl+C.

[Here is a link]() to a video demonstration of the application on Google Drive.

## License

The license that applies to this project is the MIT license. For more information about this license, please see the LICENSE file in the repo, or visit https://choosealicense.com/licenses/mit/.

## Credits

This application was coded by me. The Node packages used are [Express.js](https://expressjs.com/), [Inquirer version 8.2.4](https://www.npmjs.com/package/inquirer), [dotenv](https://www.npmjs.com/package/dotenv), and [console.table](https://www.npmjs.com/package/console.table).

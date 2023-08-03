// Importing necessary modules
var inquirer = require("inquirer");
var conTable = require("console.table");
const cfonts = require('cfonts');

const mysql = require("mysql2");

// Creating a MySQL database connection configuration
const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "Beryl1950$",
      database: "employees_db"
    },
    // Callback function to display a message when the connection is established
    console.log(`Connected to employees_db database.`)
);

// Configuration object for the cfonts module to customize the text style
const fontConfig = {
    font: '3d',             // Font style (3d)
    align: 'left',          // Text alignment (left)
    background: 'black',    // Background color (black)
    colors: ['red', 'white'], // Array of colors for each character in the text (alternating red and white)
    letterSpacing: 1,       // Spacing between characters (1 pixel)
    lineHeight: 2,          // Spacing between lines (2 pixels)
    fontSize: 'small',      // Font size (small)
};

// Function to display the custom header using the cfonts module
function displayHeader() {
    cfonts.say("Co-\nWork\ners", fontConfig); // Displaying the custom text "Co-Workers" with the defined fontConfig
    console.log('--------------------');      // Displaying a line separator below the custom text
}
// Function to start the application
function startApp(){
    // Display the header using the previously defined displayHeader function
    displayHeader();

    // Ask the user what they would like to do using inquirer
    inquirer
      .prompt([
        {
          type: "list",               // Prompt type: list (to display a list of choices)
          name: "openingMessage",    // Name of the user's response
          message: "What would you like to do?", // Message to display to the user
          choices: [                 // Available choices for the user to select
            "viewAllEmployees",      // Choice 1
            "viewAllDepartments",    // Choice 2
            "viewAllRoles",          // Choice 3
            "addADepartment",        // Choice 4
            "addARole",              // Choice 5
            "addAEmployee",          // Choice 6
            "updateEmployee",        // Choice 7
            "quit",                  // Choice 8
          ],
        },
      ])
      .then((inquirerResponse) => {
        // After the user selects an option, process their response
        console.log("user selected:    " + inquirerResponse.openingMessage);
        let choices = inquirerResponse.openingMessage;

        // Use a switch statement to execute the corresponding function based on the user's choice
        switch (choices) {
          case "viewAllEmployees":
            viewAllEmployees();     // Call function to view all employees
            break;
          case "viewAllDepartments":
            viewAllDepartments();   // Call function to view all departments
            break;
          case "viewAllRoles":
            viewAllRoles();         // Call function to view all roles
            break;
          case "addADepartment":
            addADepartment();       // Call function to add a department
            break;
          case "addARole":
            addARole();             // Call function to add a role
            break;
          case "addAEmployee":
            addAEmployee();         // Call function to add an employee
            break;
          case "updateEmployee":
            updateEmployee();       // Call function to update an employee
            break;
          case "quit":
            quit();                 // Call function to quit the application
            break;
          default:
            console.log("somethings wrong"); // Default case if the user's choice doesn't match any options
            break;
        }
      });
}

// Function to view all employees from the database
function viewAllEmployees(){
  // Use the db.query() method to execute a SQL query to select all rows from the 'employee_list' table
  db.query("SELECT * FROM employee_list", function (err, results) {
     // Check if there was an error while executing the query
     if (err) {
         console.log(err); // If there's an error, log it to the console
     } else {
         console.table(results); // If successful, display the results in a tabular format using console.table
     }
     // After displaying the results (whether successful or not), call the startApp() function to continue the application flow
     startApp();
  });
}

startApp()

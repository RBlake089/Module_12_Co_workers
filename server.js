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

// Function to view all departments from the database
function viewAllDepartments(){
  // Use the db.query() method to execute a SQL query to select all rows from the 'department_list' table
  db.query("SELECT * FROM department_list", function(err, results) {
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

// Function to view all roles from the database
function viewAllRoles(){
  // Use the db.query() method to execute a SQL query to select all rows from the 'role_list' table
  db.query("SELECT * FROM role_list", function(err, results) {
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

// Function to add a department to the database
function addADepartment() {
  // Use inquirer to prompt the user to enter a department name
  inquirer.prompt([
      {
          type: "input",
          name: "addADepartment",
          message: "Enter a department name."
      }
  ]).then((inquirerResponse) => {
      // After the user enters the department name, log it to the console
      console.log("Department added:  " + inquirerResponse.addADepartment);

      // Extract the department name from the inquirer response
      let departmentName = inquirerResponse.addADepartment;

      // Use db.query() to insert the department name into the 'department_list' table
      db.query(`INSERT INTO
              department_list 
              (dept_name) VALUES 
              ('${departmentName}')`, function(err, results){
          // Check if there was an error while executing the query
          if (err) {
              console.log(err); // If there's an error, log it to the console
          } else {
              // If successful, view all departments using the viewAllDepartments() function
              viewAllDepartments();
          }
          // After inserting the department (whether successful or not), call the startApp() function to continue the application flow
          startApp();
      });
  });
}

// Function to add a role to the database
function addARole() {
  // Use db.query() to select all rows from the 'department_list' table
  db.query("SELECT * FROM department_list", function(err, results) {
      // Check if there was an error while executing the query
      if (err) {
          console.log(err); // If there's an error, log it to the console
          return workTime(); // Exit the function and return to the main menu using the workTime() function
      }

      // If successful, create an array of department choices to use in the inquirer prompt
      const departmentChoices = results.map(department => ({
          value: department.id,
          name: department.dept_name
      }));

      // Use inquirer to prompt the user to enter role details
      inquirer.prompt([
          {
              type: "input",
              name: "addARole",
              message: "Enter a role."
          },
          {
              type: "input",
              name: "salary",
              message: "How much is the salary for this role?"
          },
          {
              type: "list",
              name: "deptId",
              message: "Which department does this role belong to?",
              choices: departmentChoices // Use the department choices generated from the query results
          }
      ]).then((inquirerResponse) => {
          // After the user enters role details, log the input to the console
          console.log("Role added:  " + inquirerResponse.addARole);

          // Extract the department ID, role name, and role salary from the inquirer response
          let departmentId = inquirerResponse.deptId;
          let roleName = inquirerResponse.addARole;
          let roleSalary = inquirerResponse.salary;

          // Use db.query() to insert the role details into the 'role_list' table
          db.query(`INSERT INTO 
                    role_list
                    (title, salary, department_list_id) 
                    VALUES 
                    ('${roleName}', 
                    '${roleSalary}',
                    '${departmentId}')`, function(err, results) {
              // Check if there was an error while executing the query
              if (err) {
                  console.log(err); // If there's an error, log it to the console
              } else {
                  // If successful, view all roles using the viewAllRoles() function
                  viewAllRoles();
              }
              // After inserting the role (whether successful or not), call the startApp() function to continue the application flow
              startApp();
          });
      });
  });
}
// Function to add an employee to the database
function addAEmployee() {
  // Use db.query() to select all rows from the 'role_list' table
  db.query("SELECT * FROM role_list", function (err, results) {
      // Check if there was an error while executing the query
      if (err) {
          console.log(err); // If there's an error, log it to the console
          return workTime(); // Exit the function and return to the main menu using the workTime() function
      }

      // If successful, create an array of role choices to use in the inquirer prompt
      const roleChoices = results.map(role => ({
          value: role.id,
          name: role.title
      }));

      // Use inquirer to prompt the user to enter employee details
      inquirer.prompt([
          {
              type: "input",
              name: "firstName",
              message: "Enter an employee name."
          },
          {
              type: "input",
              name: "lastName",
              message: "Enter an employee last name."
          },
          {
              type: "list",
              name: "roleId",
              message: "Which role are we adding this employee to?",
              choices: roleChoices // Use the role choices generated from the query results
          }
      ]).then((inquirerResponse) => {
          // After the user enters employee details, log the input to the console
          console.log("Employee added: " + inquirerResponse.firstName + " " + inquirerResponse.lastName);

          // Extract the role ID, employee first name, and employee last name from the inquirer response
          let roleId = inquirerResponse.roleId;
          let empName = inquirerResponse.firstName;
          let empLast = inquirerResponse.lastName;

          // Use db.query() to insert the employee details into the 'employee_list' table
          db.query(`INSERT INTO employee_list 
                    (first_name, last_name, 
                    role_list_id) VALUES 
                    ('${empName}', 
                    '${empLast}', 
                    '${roleId}')`, function (err, results) {
              // Check if there was an error while executing the query
              if (err) {
                  console.log(err); // If there's an error, log it to the console
              } else {
                  // If successful, view all employees using the viewAllEmployees() function
                  viewAllEmployees();
              }
              // After inserting the employee (whether successful or not), call the startApp() function to continue the application flow
              startApp();
          });
      });
  });
}

// Function to update an employee's role in the database
function updateEmployee() {
  // Display a prompt to get the employee's ID and the new role ID
  inquirer.prompt([
      {
          type: "input",
          name: "employeeId",
          message: "Enter the ID of the employee you want to update:"
      },
      {
          type: "list",
          name: "roleId",
          message: "Select the new role for the employee:",
          choices: roleChoices // Assuming that roleChoices is defined and contains the role options from the database
      }
  ]).then((inquirerResponse) => {
      const { employeeId, roleId } = inquirerResponse;
      // Update the employee in the database
      db.query(
          `UPDATE employee_list
          SET role_list_id = ?
          WHERE id = ?`,
          [roleId, employeeId],
          function (err, results) {
              if (err) {
                  console.log(err);
              } else {
                  console.log(`Employee with ID ${employeeId} has been updated with the new role ID ${roleId}.`);
              }
              startApp();
          }
      );
  });
}

// Function to quit the application
function quit() {
  console.log("Quitting the application!");
  process.exit();
}





startApp()

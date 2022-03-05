// Include packages needed for this application
const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'R$c0y?(9f!%0)fnKSJr1',
        // Name of database
        database: 'business'
    },
    // Tells user it is connected to business database
    console.log('Connected to the business database.')
);

// Displays welcome message
console.log(`
Welcome to employee tracker
`)

// Creates departments array
var departmentArr = [];

// creates department names as an array
db.query(`SELECT department.name FROM department`, (err, rows) => {
    for(let i=0;i<rows.length;i++){
        departmentArr.push(rows[i].name);
    }
    // returns array
    return departmentArr;
});

// Runs questions method
function questions(){

    inquirer
        // Asks user that they would like to do
        .prompt({
            type: 'list',
            name: 'start',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'Add Department','View All Roles','Add a Role','View All Employees','Quit']
        })
        .then(({ start }) => {
            switch (start){
                // View All Departments case
                case 'View All Departments':
                    db.query(`SELECT * FROM department`, (err, rows) => {
                        //console logs rows
                        console.table(rows);
                        // calls questions
                        questions();
                    });
                    break;
                // Add Department case
                case 'Add Department':
                    inquirer
                    // Asks user for name of department
                        .prompt({
                            type: 'input',
                            name: 'newDepartment',
                            message: 'What is the name of the department?',
                            validate: newDepartmentInput => {
                                if (newDepartmentInput) {
                                    return true;
                                } else {
                                    console.log('You need to enter a department name!');
                                    return false;
                                }   
                            }
                        })
                        // Inserts new department name into value params
                        .then(({ newDepartment }) => {
                            // Create a department
                            const sql = `INSERT INTO department (name) 
                                        VALUES (?)`;
                            const params = newDepartment;
                            db.query(sql, params, (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                                // Tells user that new department name is in the database 
                                console.log(`Added ${params} to the database.`)
                                // Calls questions method
                                departmentArr.push(params);
                                questions();
                            });
                        })
                    break;
                case 'View All Roles':
                    // View All Roles case
                    db.query(`SELECT role.id, role.title, department.name AS department, role.salary FROM role
                            LEFT JOIN department ON role.department_id = department.id;`, (err, rows) => {
                        //console logs rows
                        console.table(rows);
                        // calls questions
                        questions();
                    });
                    break;
                case 'Add a Role':
                    // Add role case
                    inquirer
                    // Asks user for name of department
                        .prompt([
                            {
                                type: 'input',
                                name: 'newRole',
                                message: 'What is the name of the role?',
                                validate: newRoleInput => {
                                    if (newRoleInput) {
                                        return true;
                                    } else {
                                        console.log('You need to enter a role!');
                                        return false;
                                    }   
                                }
                            },
                            {
                                type: 'number',
                                name: 'salary',
                                message: 'What is the salary of the role?',
                            },
                            {   
                                type: 'list',
                                name: 'department',
                                message: 'Which department does the role belong to?',
                                choices: departmentArr
                            }
                        ])
                        // Inserts new role name into value params
                        .then(({ newRole, salary, department }) => {
                            // gets index of the department from the department array
                            departId = departmentArr.indexOf(department) + 1;
                            // Create a  role
                            const sql = `INSERT INTO role (title, salary, department_id) 
                                        VALUES (?,?,?)`;
                            const params = [newRole, salary, departId];
                            db.query(sql, params, (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                                // Tells user that new role name is in the database 
                                console.log(`Added ${params[0]} to the database.`)
                                // Calls questions method
                                questions();
                            });
                        })
                    break;
                 // View All Roles case
                case 'View All Employees':
                    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT (manager.first_name, ' ', manager.last_name) as manager
                            FROM employee 
                            LEFT JOIN role ON employee.role_id = role.id
                            LEFT JOIN department ON role.department_id = department.id
                            LEFT JOIN employee manager on manager.id = employee.manager_id;
                            `
                            , (err, rows) => {
                        //console logs rows
                        console.table(rows);
                        // calls questions
                        questions();
                    });
                    break;
                // Quit case    
                case 'Quit':
                    // Ends database connection
                    db.end();
                    break;
            }

        })
        // catches error
        .catch(err => {
            console.log(err);
        });
}
// Calls function method
questions();
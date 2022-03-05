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

// Runs questions method
function questions(){
    inquirer
        // Asks user that they would like to do
        .prompt({
            type: 'list',
            name: 'start',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'Add Department','View All Roles','Quit']
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
                            validate: linkInput => {
                                if (linkInput) {
                                    return true;
                                } else {
                                    console.log('You need to enter a department name!');
                                    return false;
                                }   
                            }
                        })
                        // Inserts new candidate name into value params
                        .then(({ newDepartment }) => {
                            // Create a candidate
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
                                questions();
                            });
                        })
                    break;
                case 'View All Roles':
                    db.query(`SELECT role.id, role.title, department.name AS department, role.salary FROM role
                            LEFT JOIN department ON role.department_id = department.id;`, (err, rows) => {
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
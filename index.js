// Include packages needed for this application
const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');


// function writeToFile(blank) {
//     return new Promise((resolve, reject) => {
//             // if everything went well, resolve the Promise and send the successful data to the `.then()` method
//             resolve('Success');
//     });
// }


// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'R$c0y?(9f!%0)fnKSJr1',
        database: 'business'
    },
    console.log('Connected to the business database.')
);

function questions(){
inquirer
    .prompt({
        type: 'list',
        name: 'start',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'Add Department','Quit']
    })
    .then(({ start }) => {
        //takes name and saves it to new employee class
        if (start === 'View All Departments'){
            db.query(`SELECT * FROM department`, (err, rows) => {
                console.table(rows);
                questions();
            });
        } else if (start === 'Add Department'){
            inquirer
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
                .then(({ newDepartment }) => {
                    // Create a candidate
                    const sql = `INSERT INTO department (name) 
                                VALUES (?)`;
                    const params = newDepartment;
                    db.query(sql, params, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(`Added ${params} to the database.`)
                        questions();
                    });
                })
        } else {
            db.end();
        }
    })
    // .then(writeToFile =>{
    //     console.log(writeToFile);
    // })
    .catch(err => {
        console.log(err);
    });
}

questions();
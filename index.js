// Include packages needed for this application
const inquirer = require('inquirer');

inquirer
    .prompt({
        type: 'list',
        name: 'start',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'Add Department']
    })
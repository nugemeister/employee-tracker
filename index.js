const inquirer = require('inquirer');
const db = require('./db');
// require('console.table');

// let db;

// Inquirer Prompts
const init = () => {
    console.log("Welcome to the Employee Tracker Application!");
    return inquirer
        .createPromptModule([
            {
                type: 'list',
                name: 'choice',
                message: 'Please select one of the following...',
                choices: [
                    'View All Employees',
                    'Add Employee',
                    'Update Employee Role',
                    'View All Roles',
                    'Add Role',
                    'View All Departments',
                    'Add Department',
                    'Quit'
                ]
            }
        ])
        // break choices down into functions
        .then(res => {
            let choice = res.choice;
            switch (choice) {
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View All Departments':
                    viewAllDepartments();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                default:
                    quit();
            }
        });
};

// function for View All Employees
const viewAllEmployees = () => {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees_db = rows;
            console.table(employees_db);
        })
        .then(() => init());
};

// function for Add Employee
const addEmployee = () => {
    inquirer.createPromptModule([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?"
        }
    ])
    .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;

        db.findAllRoles()
            .then(([rows]) => {
                let roles = rows;
                const roleNames = roles.map(({id, job_title}) => ({
                    name: job_title,
                    value: id
                }));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: "what is the employee's role?",
                        choices: roleNames
                    }
                ])
                .then(res => {
                    let role = res.role;

                    db.
                })
            })
    })
}

// function for Update Employee Role

// function for View All Roles

// function for Add Role

// function for View All Departments

// function for Add Department

// close application
const quit = () => {
    console.log('You are quitting the application.');
    process.exit();
};

// call function to initialize the application
init();
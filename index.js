const inquirer = require('inquirer');
const db = require('./db');
// require('console.table');

// let db;

// Inquirer Prompts
const init = () => {
    console.log("Welcome to the Employee Tracker Application!");
    return inquirer
        .prompt([
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
            let employees = rows;
            console.table(employees);
        })
        .then(() => init());
};

// function for Add Employee
const addEmployee = () => {
    inquirer.prompt([
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

                    db.findAllEmployees()
                        .then(([rows]) => {
                            let employees = rows;
                            const managerNames = employees.map(({id, first_name, last_name}) => ({
                                name: `${first_name} ${last_name}`,
                                value: id
                            }));

                            // if no manager exists
                            managerNames.unshift({name: 'None', value: null});

                            // building manager association
                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'manager',
                                    message: "If applicable, who is the employee's manager?",
                                    choice: managerNames
                                }
                            ])
                            .then(res => {
                                let employee = {
                                    manager_id: res.manager,
                                    role_id: role,
                                    first_name: firstName,
                                    last_name: lastName
                                }

                                db.addEmployee(employee)
                                .then(() => console.log(`Employee ${firstName} ${lastName} has been added to the database successfully!`))
                                .then(() => init());
                            });
                        });
                });
            });
    });
};

// function for Update Employee Role
const updateEmployeeRole = () => {
    db.findAllEmployees()
        .then(([rows]) =>
            let employees = rows;
            const employeeNames = employees.map(({id, first_name, last_name}) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));
            
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: "Which employee's role would you like to update?",
                    choices: employeeNames
                }
            ])
            .then(res => {
                let employee = res.employee
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
                                message: "Which role would you like to assign to this employee?",
                                choices: roleNames
                            }
                        ])
                        .then(res => db.updateEmployeeRole(employee, res.role))
                        .then(() => console.log("The employee's role has been updated successfully!"))
                        .then(() => init());
                    });
            });
        );
};

// function for View All Roles
const viewAllRoles = () => {
    db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.table(roles);
        })

    // then return back to initial prompting
    .then(() => init());
};

// function for Add Role
const addRole = () => {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;

            // pull from list / array of available departments for the new role
            const departmentNames = departments.map(({ id, department }) => ({
                name: department,
                value: id
            }));

            // collect necessary info on the new role
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Select the department which this new role belongs to.',
                    choices: departmentNames
                },
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the name of the new role.'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the salary of the role.'
                },

            ])
            .then(role => {
                db.addRole(role)
                .then(() => console.log(`Added the new role, ${role.title}, to the database successfully!`))
                .then(() => init());
            });
        });
};

// function for View All Departments
const viewAllDepartments = () => {
    db.findAllDepartments()
    
        .then(([rows]) => {
            let departments = rows;
            console.table(departments);
        })

    // then return back to initial prompting
        .then(() => init());
};

// function for Add Department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the new department.'
        }
    ])
    .then(res => {
        let name = res;
        db.addDepartment(name)
            .then(() => console.log(`${name.name} has been added to the database as a new department!`))
            .then(() => init());
    });
};

// close application
const quit = () => {
    console.log('You are quitting the application.');
    process.exit();
};

// call function to initialize the application
init();
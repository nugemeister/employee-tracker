const connection = require('./connection');

// Container Class for all lookup methods

class db {
    constructor(connection) {
        this.connection = connection;
    };

    // Method for Find All Employees / View All Employees
    findAllEmployees() {
        return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;");
    };

    // Method for Add Employee
    addEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee);
    };

    // Method for Updating Employee Role
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
    };

    // Method for Find All Roles / View All Roles
    findAllRoles() {
        return this.connection.promise().query("SELECT role.id, role.title AS job_title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;");
    };

    // Method for Add Role
    addRole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?", role);
    };

    // Method for Find All Departments / View All Departments
    findAllDepartments() {
        return this.connection.promise().query("SELECT department.id, department.name AS department FROM department;");
    };

    // Method for Add Department
    addDepartment(department) {
        return this.connection.promise().query("INSERT INTO department SET ?", department);
    };
};

//
module.exports = new db(connection);
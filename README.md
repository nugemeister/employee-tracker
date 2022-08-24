# Employee Tracker

## Project Explained
The purpose of this project is to create a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.
<br></br>
## Success Criteria

### User Stories
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```
### Acceptance Criteria
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

```

## Installation

1. Clone down the repository onto your local machine using the `git clone` command.
2. Ensure you have MySQL2 package downloaded locally, as well as inquirer (use `npm i inquirer@8.2.4`).
3. Run `npm install` to install necessary packages and dependencies.
4. Enter the command `node index.js` to initialize the application, proceed by answering the following prompts.

<br></br>

## Tests
Enter the command `npm run test` to run the associated tests.

<br></br>
## Video Demo

The following video shows the web application's appearance and functionality:

![This is a recording of the live webpage.](./images/Demo-team-profile-builder.mp4)
<br></br>

## Provided Mock-Up for Reference

The following image was provided as a directional mock-up for reference.

![This is a screenshot of the provided mock-up image for reference.](./images/mockup.png)
<br></br>


// const to req mysql
const mysql = require('mysql2');

// building connection to DB
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
},
console.log(`Connected to the employees_db database.`)
);

connection.connect(function (err) {
    if(err) throw err;
});

// exporting DB connection
module.exports = connection;
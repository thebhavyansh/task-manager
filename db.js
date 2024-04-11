const mysql = require('mysql2')
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'anumysql_247',
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL server!');

    db.query("CREATE DATABASE IF NOT EXISTS DB", (err, result) => {
        if (err) throw err;
        console.log("Database 'DB' created successfully!");
    });

    db.query("USE DB", (err, result) => {
        if (err) throw err;
        console.log("Switched to database 'DB'");
    });

    db.query(`CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    )`, (err, result) => {
        if (err) throw err;
        console.log('Users table created successfully!');
    });

  
    db.query(`CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`, (err, result) => {
        if (err) throw err;
        console.log('tasks table created successfully!');
    });
});

module.exports = db;

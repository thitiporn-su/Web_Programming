// var mysql = require("mysql2");
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
// });

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected Success!");
// });

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected Success!");
//     con.query("CREATE DATABASE IF NOT EXISTS fun05", function (err, result) {
//         if (err) throw err;
//         console.log("Database created");
//     });
// });


var mysql = require("mysql2");
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MySQL
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "fun05"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL!");

    // Create table if not exists
    const createTable = `
        CREATE TABLE IF NOT EXISTS records (
            id INT AUTO_INCREMENT PRIMARY KEY,
            male_count INT NOT NULL,
            female_count INT NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    con.query(createTable, function (err, result) {
        if (err) throw err;
        console.log("Table ready!");
    });
});

// ✅ API: Save data
app.post("/save", function (req, res) {
    const { male_count, female_count } = req.body;
    const sql = "INSERT INTO records (male_count, female_count) VALUES (?, ?)";
    con.query(sql, [male_count, female_count], function (err, result) {
        if (err) throw err;
        res.send({ message: "Data saved!" });
    });
});

// ✅ API: Fetch records with optional date filtering
app.get("/records", function (req, res) {
    const { startDate, endDate } = req.query;

    let sql = "SELECT * FROM records";
    let params = [];

    if (startDate && endDate) {
        sql += " WHERE timestamp BETWEEN ? AND ?";
        params = [startDate, endDate];
    }

    sql += " ORDER BY timestamp DESC";

    con.query(sql, params, function (err, results) {
        if (err) throw err;
        res.json(results);
    });
});

// ✅ Start the server on Port 3001
app.listen(3001, function () {
    console.log("Server running on port 3001");
});




// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Connect to MySQL
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root', 
//     password: 'root', 
//     database: 'DataBase'
// });

// db.connect(err => {
//     if (err) console.error('❌ Database connection failed:', err);
//     else console.log('✅ Connected to MySQL');
// });

// // API to save counts
// app.post('/save', (req, res) => {
//     const { male_count, female_count } = req.body;
//     const sql = 'INSERT INTO records (male_count, female_count) VALUES (?, ?)';
//     db.query(sql, [male_count, female_count], (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json({ message: '✅ Data saved' });
//     });
// });

// // API to get saved records
// app.get('/records', (req, res) => {
//     const sql = 'SELECT * FROM records ORDER BY timestamp DESC';
//     db.query(sql, (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json(results);
//     });
// });

// app.listen(3001, () => console.log('🚀 Server running on port 3001'));

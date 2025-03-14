var mysql = require("mysql2");
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MySQL using the "fun05" database
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "fun05"
});

con.connect(function (err) {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        throw err;
    }
    console.log("Connected to MySQL!");

    // Create the records table if it does not exist
    const createTable = `
        CREATE TABLE IF NOT EXISTS records (
            id INT AUTO_INCREMENT PRIMARY KEY,
            male_count INT NOT NULL,
            female_count INT NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    con.query(createTable, function (err, result) {
        if (err) {
            console.error("Error creating table:", err);
            throw err;
        }
        console.log("Table ready!");
    });
});

// API: Save data – insert new record with male and female counts
app.post("/save", function (req, res) {
    const { male_count, female_count } = req.body;

    if (male_count === undefined || female_count === undefined) {
        return res.status(400).send({ message: "Invalid data" });
    }

    const sql = "INSERT INTO records (male_count, female_count) VALUES (?, ?)";
    con.query(sql, [male_count, female_count], function (err, result) {
        if (err) {
            console.error("Error saving record:", err);
            return res.status(500).send({ message: "Error saving data" });
        }
        res.send({ message: "Data saved successfully!" });
    });
});

// API: Fetch records with optional date filtering (expects startDate and endDate as YYYY-MM-DD)
app.get("/records", function (req, res) {
    const { startDate, endDate } = req.query;
    console.log("Received dates:", startDate, endDate);
    

    let sql = "SELECT * FROM records";
    let params = [];

    if (startDate && endDate) {
        sql += " WHERE DATE(timestamp) BETWEEN ? AND ?";
        params = [startDate, endDate];
    } else if (startDate) {
        sql += " WHERE DATE(timestamp) >= ?";
        params = [startDate];
    } else if (endDate) {
        sql += " WHERE DATE(timestamp) <= ?";
        params = [endDate];
    }

    sql += " ORDER BY timestamp DESC"; // Sort latest first

    con.query(sql, params, function (err, results) {
        if (err) {
            console.error("Error fetching records:", err);
            return res.status(500).send({ message: "Error fetching records" });
        }
        res.json(results); // Send the results as JSON
    });
});


// Start the server on Port 3001
app.listen(3001, function () {
    console.log("Server running on port 3001");
});

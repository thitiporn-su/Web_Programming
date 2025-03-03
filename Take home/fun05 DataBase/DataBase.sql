CREATE DATABASE IF NOT EXISTS fun05;
USE fun05;

CREATE TABLE IF NOT EXISTS records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    male_count INT NOT NULL,
    female_count INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- mysql -u root -p               
-- USE fun05;
-- SELECT * FROM records;

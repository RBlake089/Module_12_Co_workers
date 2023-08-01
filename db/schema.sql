-- Drop the old database if it exists
DROP DATABASE IF EXISTS employees_db;

-- Create a new database
CREATE DATABASE employees_db;

-- Use the newly created database
USE employees_db;

-- Create a table to store department information
CREATE TABLE department_list (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

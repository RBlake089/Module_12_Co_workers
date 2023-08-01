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
-- Create a table to store role information
CREATE TABLE role_list (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    department_list_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (department_list_id) REFERENCES department_list(id) ON DELETE CASCADE
);

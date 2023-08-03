-- Insert data into the department_list table
INSERT INTO department_list (dept_name)
VALUES
    ("Sales"),            -- Department ID 1
    ("Marketing"),        -- Department ID 2
    ("Human Resources"),  -- Department ID 3
    ("Finance"),          -- Department ID 4
    ("Operations");       -- Department ID 5

-- Insert data into the role_list table with different values
INSERT INTO role_list (title, salary, department_list_id)
VALUES
    ("Sales Manager", 8000, 1),           -- Role ID 1
    ("Marketing Specialist", 6000, 2),    -- Role ID 2
    ("HR Coordinator", 4000, 3),          -- Role ID 3
    ("Financial Analyst", 5000, 4),       -- Role ID 4
    ("Operations Supervisor", 4500, 5),   -- Role ID 5
    ("Sales Representative", 3500, 1),    -- Role ID 6
    ("Marketing Assistant", 3000, 2);     -- Role ID 7

-- Insert data into the employee_list table
INSERT INTO employee_list (first_name, last_name, role_list_id, manager_id)
VALUES
    ("John", "Doe", 1, NULL),          -- Employee ID 1
    ("Jane", "Smith", 2, 1),           -- Employee ID 2
    ("Michael", "Johnson", 3, 1),      -- Employee ID 3
    ("Emily", "Williams", 4, 2),       -- Employee ID 4
    ("Robert", "Jones", 5, 3),         -- Employee ID 5
    ("Olivia", "Brown", 6, 4),         -- Employee ID 6
    ("William", "Davis", 7, 5);        -- Employee ID 7

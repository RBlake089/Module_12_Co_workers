-- Insert data into the department_list table
INSERT INTO department_list (dept_name)
VALUES
    ("Executive"),       -- Department ID 1
    ("Management"),      -- Department ID 2
    ("Administrative"),  -- Department ID 3
    ("Security"),        -- Department ID 4
    ("Medical");         -- Department ID 5

-- Insert data into the role_list table with different values
INSERT INTO role_list (title, salary, department_list_id)
VALUES
    ("CEO", 10000, 1),           -- Role ID 1
    ("Manager", 5000, 2),        -- Role ID 2
    ("Supervisor", 4000, 2),     -- Role ID 3
    ("Lead Engineer", 4500, 3),  -- Role ID 4
    ("Senior Engineer", 4200, 3),-- Role ID 5
    ("Therapist", 3500, 4),      -- Role ID 6
    ("Nurse", 2800, 2);          -- Role ID 7

-- Insert data into the employee_list table
INSERT INTO employee_list (first_name, last_name, role_list_id, manager_id)
VALUES
    ("Jean-Luc", "Picard", 4, 1),    -- Employee ID 1
    ("William", "Riker", 4, 2),      -- Employee ID 2
    ("Worf", "worst", 4, 1),         -- Employee ID 3
    ("Data", "dood", 2, NULL),       -- Employee ID 4
    ("Geordi", "La Forge", 2, 3),    -- Employee ID 5
    ("Deanna", "Troi", 1, 6),        -- Employee ID 6
    ("Beverly", "Crusher", 3, NULL); -- Employee ID 7
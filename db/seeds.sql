INSERT INTO department (name) 
    VALUES 
        ('Engineering'),
        ('Sales'),
        ('Service'),
        ('Administration');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Software Engineer', 100000, 1),
    ('Account Manager', 75000, 3),
    ('Sales Rep', 50000, 2);
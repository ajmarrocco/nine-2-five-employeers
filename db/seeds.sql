INSERT INTO department (name) 
    VALUES 
        ('Engineering'),
        ('Sales'),
        ('Service'),
        ('Administration');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Engineering Manager', 300000, 1),
    ('Software Engineer', 200000, 1),
    ('CFO', 375000, 4),
    ('Admistrative Assistant', 50000, 4),
    ('Sales Manager', 185000, 2),
    ('Mechanical Engineer', 95000, 1),
    ('Sales Rep', 150000, 2),
    ('Sales Coordinator', 65000, 2),
    ('Junior Software Engineer', 140000, 1),
    ('Service Coordinator', 75000, 3),
    ('Warehouse Manager', 45000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Gary', 'Petros', 1, NULL),
    ('Stephaine', 'Mercado', 2, 1),
    ('Jourdyn', 'Guimaraes', 3, NULL),
    ('Nate', 'Eng', 4, 3),
    ('Topher', 'Paltoo', 5, NULL),
    ('Ken', 'Carre', 6, 1),
    ('Natalia', 'King', 7, 5),
    ('Trae', 'Joseph', 8, 5),
    ('Dan', 'King', 9, 1),
    ('Brian', 'Latchman', 10, NULL),
    ('Gabe', 'Jardine', 11, 10);

INSERT INTO katerniuksm.roles (id, name)
VALUES
    (1, 'ROLE_USER');
INSERT INTO katerniuksm.statuses (id, status)
VALUES
    (1, 'IN_PROGRESS'),
    (2, 'ON_HOLD'),
    (3, 'COMPLETED'),
    (4, 'NONE');
INSERT INTO katerniuksm.regularities (id, regularity)
VALUES
    (1, 'ONCE'),
    (2, 'DAILY'),
    (3, 'EVERY_OTHER_DAY'),
    (4, 'WEEKLY'),
    (5, 'BIWEEKLY'),
    (6, 'MONTHLY'),
    (7, 'QUARTERLY');
INSERT INTO katerniuksm.priorities (id, priority)
VALUES
    (1, 'CRITICAL'),
    (2, 'URGENT'),
    (3, 'HIGH'),
    (4, 'MEDIUM'),
    (5, 'LOW'),
    (6, 'NONE');
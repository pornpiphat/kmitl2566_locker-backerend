CREATE TABLE [students] (
    [id] INT IDENTITY(1, 1) PRIMARY KEY,
    [firstname] nvarchar(255),
    [lanstname] nvarchar(255),
    [student_code] nvarchar(255),
    [active] bit DEFAULT ('TRUE'),
    [deleted] bit DEFAULT ('FALSE'),
    [createdAt] datetime DEFAULT (getdate()),
    [createdBy] nvarchar(255),
    [updatedAt] datetime DEFAULT (getdate()),
    [updatedBy] nvarchar(255),
);

CREATE TABLE [professors] (
    [id] INT IDENTITY(1, 1) PRIMARY KEY,
    [firstname] nvarchar(255),
    [lanstname] nvarchar(255),
    [password] nvarchar(255)
);

CREATE TABLE [locker_roless] (
    [id] INT IDENTITY(1, 1) PRIMARY KEY,
    [name] nvarchar(255),
    [active] bit DEFAULT ('TRUE'),
    [deleted] bit DEFAULT ('FALSE'),
    [createdAt] datetime DEFAULT (getdate()),
    [createdBy] nvarchar(255),
    [updatedAt] datetime DEFAULT (getdate()),
    [updatedBy] nvarchar(255)
);

CREATE TABLE [student_lockers] (
    [id] INT IDENTITY(1, 1) PRIMARY KEY,
    [studentId] int,
    [lockerId] int,
    [active] bit DEFAULT ('TRUE'),
    [deleted] bit DEFAULT ('FALSE'),
    [createdAt] datetime DEFAULT (getdate()),
    [createdBy] nvarchar(255),
    [updatedAt] datetime DEFAULT (getdate()),
    [updatedBy] nvarchar(255)
);

CREATE TABLE [lockers] (
    [id] INT IDENTITY(1, 1) PRIMARY KEY,
    [LockerNmae] nvarchar(255),
    [lockerRoleId] int,
    [output] int,
    [status] bit DEFAULT ('TRUE'),
    [active] bit DEFAULT ('TRUE'),
    [deleted] bit DEFAULT ('FALSE'),
    [createdAt] datetime DEFAULT (getdate()),
    [createdBy] nvarchar(255),
    [updatedAt] datetime DEFAULT (getdate()),
    [updatedBy] nvarchar(255)
);

CREATE TABLE [locker_professors] (
    [id] INT IDENTITY(1, 1) PRIMARY KEY,
    [lockerId] int,
    [professorId] int
);

ALTER TABLE
    [student_lockers]
ADD
    FOREIGN KEY ([studentId]) REFERENCES [students] ([id]);

ALTER TABLE
    [student_lockers]
ADD
    FOREIGN KEY ([lockerId]) REFERENCES [lockers] ([id]);

ALTER TABLE
    [lockers]
ADD
    FOREIGN KEY ([LockerRoleId]) REFERENCES [locker_roles] ([id]);

ALTER TABLE
    [locker_professors]
ADD
    FOREIGN KEY ([lockerId]) REFERENCES [lockers] ([id]);

ALTER TABLE
    [locker_professors]
ADD
    FOREIGN KEY ([professorId]) REFERENCES [professors] ([id]);
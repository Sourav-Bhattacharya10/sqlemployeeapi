USE WorkDB; --                  Step 1. Your databse name
GO

-- Table Creation               Step 2. Table creation
CREATE TABLE Employee (
    EmployeeID INT IDENTITY PRIMARY KEY CLUSTERED,
    EmployeeName VARCHAR(200) NOT NULL,
    EmployeeEmail VARCHAR(200) NOT NULL,
    EmployeePassword VARCHAR(200) NOT NULL,
    EmployeeImage VARCHAR(1000),
    EmployeeSalary INT NOT NULL
);
GO

-- CREATE Procedure             Step 3. Employee Creation
CREATE PROCEDURE CreateEmployee
(
    @EmployeeName VARCHAR(200),
    @EmployeeEmail VARCHAR(200),
    @EmployeePassword VARCHAR(200),
    @EmployeeSalary INT,
    @OperationStatus BIT OUT
)
AS
    SET XACT_ABORT ON
    BEGIN TRY
        BEGIN TRAN  
            INSERT INTO Employee (EmployeeName, EmployeeEmail, EmployeePassword, EmployeeSalary) VALUES (@EmployeeName, @EmployeeEmail, @EmployeePassword, @EmployeeSalary);
        COMMIT TRAN
        SET @OperationStatus = 1
    END TRY
    BEGIN CATCH
        ROLLBACK TRAN;
        SET @OperationStatus = 0
    END CATCH
GO

-- Display All Procedure        Step 4. Get All Employee Details
CREATE PROCEDURE GetAllEmployees
AS
    SELECT * from Employee;
GO

Execute Display All
EXEC GetAllEmployees

-- Display One Procedure        Step 5. Get only one employee details
CREATE PROCEDURE GetEmployee
(
    @EmployeeID INT
)
AS
    SELECT * from Employee WHERE EmployeeID = @EmployeeID;
GO

-- Update One Procedure         Step 6. Update employee details by EmployeeID
CREATE PROCEDURE UpdateEmployee
(
    @EmployeeID INT,
    @EmployeeName VARCHAR(200),
    @EmployeeSalary INT,
    @OperationStatus BIT OUT
)
AS
    SET XACT_ABORT ON
    BEGIN TRY
        BEGIN TRAN  
            UPDATE Employee SET EmployeeName = @EmployeeName, EmployeeSalary = @EmployeeSalary WHERE EmployeeID = @EmployeeID;
        COMMIT TRAN
        SET @OperationStatus = 1
    END TRY
    BEGIN CATCH
        ROLLBACK TRAN;
        SET @OperationStatus = 0
    END CATCH
GO

-- Delete One Procedure Step 7. Delete employee details by EmployeeID
CREATE PROCEDURE DeleteEmployee
(
    @EmployeeID INT,
    @OperationStatus BIT OUT
)
AS
    SET XACT_ABORT ON
    BEGIN TRY
        BEGIN TRAN  
            DELETE FROM Employee WHERE EmployeeID = @EmployeeID;
        COMMIT TRAN
        SET @OperationStatus = 1
    END TRY
    BEGIN CATCH
        ROLLBACK TRAN;
        SET @OperationStatus = 0
    END CATCH
GO
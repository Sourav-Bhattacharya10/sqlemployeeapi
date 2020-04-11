import sql, { pool } from "mssql";

class MsSqlConnection {
  constructor(
    serverName,
    databaseName,
    portNumber,
    userName,
    userPassword,
    isEncrypted
  ) {
    // this.connectionString = isEncrypted
    //   ? `mssql://${userName}:${userPassword}@${serverName}:${portNumber}/${databaseName}?encrypt=${isEncrypted}&enableArithAbort=true`
    //   : `mssql://${userName}:${userPassword}@${serverName}:${portNumber}/${databaseName}`;

    this.config = {
      user: userName,
      password: userPassword,
      server: serverName,
      database: databaseName,
      port: portNumber,
      encrypt: isEncrypted,
      enableArithAbort: true,
    };
  }

  getAll(requ, resp) {
    sql
      .connect(this.config)
      .then((pool) => {
        // Stored procedure
        return (
          pool
            .request()
            // .input("input_parameter", sql.Int, value)
            // .output("output_parameter", sql.VarChar(50))
            .execute("GetAllEmployees")
        );
      })
      .then((result) => {
        // console.dir(result);
        sql.close();
        resp.status(200).json(result.recordset);
      })
      .catch((err) => {
        // ... error checks
        console.log("Error : ", err);
      });
  }

  getOne(requ, resp) {
    sql
      .connect(this.config)
      .then((pool) => {
        // Stored procedure
        return pool
          .request()
          .input("EmployeeID", sql.Int, requ.params.id)
          .execute("GetEmployee");
      })
      .then((result) => {
        sql.close();
        if (result.recordset.length > 0) {
          resp.status(200).json(result.recordset[0]);
        } else {
          resp
            .status(200)
            .json({ error: "No record found for this employee id" });
        }
      })
      .catch((err) => {
        // ... error checks
        console.log("Error : ", err);
      });
  }

  createOne(requ, resp) {
    sql
      .connect(this.config)
      .then((pool) => {
        // Stored procedure
        return pool
          .request()
          .input("EmployeeName", sql.VarChar(200), requ.body.EmployeeName)
          .input("EmployeeEmail", sql.VarChar(200), requ.body.EmployeeEmail)
          .input(
            "EmployeePassword",
            sql.VarChar(200),
            requ.body.EmployeePassword
          )
          .input("EmployeeSalary", sql.Int, requ.body.EmployeeSalary)
          .output("OperationStatus", sql.Bit)
          .execute("CreateEmployee");
      })
      .then((result) => {
        sql.close();
        if (result.output.OperationStatus) {
          resp.status(201).json({ insertStatus: true });
        } else {
          resp.status(200).json({ insertStatus: false });
        }
      })
      .catch((err) => {
        // ... error checks
        console.log("Error : ", err);
      });
  }

  updateOne(requ, resp) {
    sql
      .connect(this.config)
      .then((pool) => {
        // Stored procedure
        return pool
          .request()
          .input("EmployeeID", sql.Int, requ.params.id)
          .input("EmployeeName", sql.VarChar(200), requ.body.EmployeeName)
          .input("EmployeeSalary", sql.Int, requ.body.EmployeeSalary)
          .output("OperationStatus", sql.Bit)
          .execute("UpdateEmployee");
      })
      .then((result) => {
        sql.close();
        if (result.output.OperationStatus) {
          resp.status(200).json({ updateStatus: true });
        } else {
          resp.status(200).json({ updateStatus: false });
        }
      })
      .catch((err) => {
        // ... error checks
        console.log("Error : ", err);
      });
  }

  deleteOne(requ, resp) {
    sql
      .connect(this.config)
      .then((pool) => {
        // Stored procedure
        return pool
          .request()
          .input("EmployeeID", sql.Int, requ.params.id)
          .output("OperationStatus", sql.Bit)
          .execute("DeleteEmployee");
      })
      .then((result) => {
        sql.close();
        if (result.output.OperationStatus) {
          resp.status(200).json({ deleteStatus: true });
        } else {
          resp.status(200).json({ deleteStatus: false });
        }
      })
      .catch((err) => {
        // ... error checks
        console.log("Error : ", err);
      });
  }
}

export default MsSqlConnection;

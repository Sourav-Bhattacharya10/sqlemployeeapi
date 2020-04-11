import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import MsSQlConnection from "./mssqlconnection";
import configdata from "./config.json";
import MsSqlConnection from "./mssqlconnection";

const app = express();
app.use(cors());

app.use(bodyParser.json());

let conn = new MsSqlConnection(
  configdata.server,
  configdata.database,
  configdata.port,
  configdata.username,
  configdata.password,
  configdata.encrypt
);

app.get("/employees", (req, res) => {
  //get all employees
  conn.getAll(req, res);
});

app.get("/employees/:id", (req, res) => {
  //get employee by name
  conn.getOne(req, res);
});

app.post("/employees", (req, res) => {
  // create a new employee
  // { "name" : "Potato", "price" : 30 }
  conn.createOne(req, res);
});

app.put("/employees/:id", (req, res) => {
  // update the employee with specified name
  // { "name" : "Potato", "price" : 40 }
  conn.updateOne(req, res);
});

app.delete("/employees/:id", (req, res) => {
  // delete the employee with specified name
  conn.deleteOne(req, res);
});

app.listen(8850, () => console.log("Example app listening on port 8850!"));

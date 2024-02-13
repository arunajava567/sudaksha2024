const mongoose = require("mongoose");

const Employee = mongoose.model(
  "Employee",
  new mongoose.Schema({
    name: String,
    designation: String,
    salary: Number
  })
);

module.exports = Employee;

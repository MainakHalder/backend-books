const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
  employeeProfilePic: String,
  employeeName: String,
  employeeRole: String,
  employeeId: Number,
  dateOfBirth: String,
  mail: String,
  telephoneNumber: Number,
  address: String,
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;

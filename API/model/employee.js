const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeScheema = Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  age: {
    type: String,
    require: true,
  },
  dateOfJoining: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  department: {
    type: String,
    require: true,
  },
  employeeType: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Employee", employeeScheema);

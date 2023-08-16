const express = require("express");
const cors = require("cors");
const fs = require("fs");
require("./model/connection");
const bodyParser = require("body-parser");
const Employee = require("./model/employee");
const { ApolloServer } = require("apollo-server-express");
const app = express();
app.use(cors());
app.use(bodyParser.json());

async function getEmployees() {
  const employees = await Employee.find();
  return employees;
}

const addEmployee = async (_, data) => {
  const employeeData = new Employee({
    firstName: data.firstName,
    lastName: data.lastName,
    age: data.age,
    birthDate: data.birthDate,
    dateOfJoining: data.dateOfJoining,
    title: data.title,
    department: data.department,
    employeeType: data.employeeType,
    employeeStatus: data.employeeStatus,
  });

  try {
    const res = await employeeData.save();
    console.log(res);
  } catch (err) {
    return console.log(err);
  }
};

const updateEmployee = async (_, { data }) => {
  return await Employee.findByIdAndUpdate(
    { _id: data._id },
    {
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      birthDate: data.birthDate,
      dateOfJoining: data.dateOfJoining,
      title: data.title,
      department: data.department,
      employeeType: data.employeeType,
      employeeStatus: data.employeeStatus,
    }
  );
};

const deleteEmp = async (_, _id) => {
  return await Employee.deleteOne(_id);
};

const EmployeeDetails = async (_, _id) => {
  let abc = await Employee.findById(_id);
  console.log(abc, "data+++");
  return await Employee.findById(_id);
};

async function filterEmpByType(_, employeeType) {
  // const result = await Employee.find(employeeType);
  // console.log(result, "filter data---");
  // return result;
  return await Employee.findOne(employeeType);
}

const resolvers = {
  Query: {
    getEmployees,
  },
  Mutation: {
    addEmployee,
    updateEmployee,
    deleteEmp,
    EmployeeDetails,
    filterEmpByType,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync("graphql_schema", "utf8"),
  resolvers,
});

const port = "3200";
app.use(express.static("./public"));

server.start().then(function () {
  server.applyMiddleware({ app, path: "/graphql", cors: true });
});

app.get("/", function (req, res) {
  res.render("index.html");
});

app.listen(port, function () {
  console.log("WebServer is running on port:", port);
});

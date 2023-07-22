import React from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeFilter from "./EmployeeFilter";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeSearch from "./EmployeeSearch";

const EmployeeDirectory = () => {
  const [employees, setEmployeesData] = React.useState([]);
  let query = {
    query: `query {
      getEmployees {
        _id,
        firstName,
        lastName,
        age,
        title,
        dateOfJoining,
        department,
        employeeType
      }
    }`,
  };
  const refreshEmployeeList = async () => {
    const response = await fetch("http://localhost:3200/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    });
    let _response = await response.json();
    let empData = _response.data.getEmployees;
    setEmployeesData(empData);
  };
  React.useEffect(function () {
    refreshEmployeeList();
  }, [setEmployeesData]);

  const addEmployee = (employee) => {
    const requestBody = {
      query: `
      mutation {
        addEmployee(
            firstName: "${employee.firstName}" ,
            lastName: "${employee.lastName}", 
            age: "${employee.age}",
            dateOfJoining: "${employee.dateOfJoining}" ,
            title: "${employee.title}" , 
            department: "${employee.department}" ,
            employeeType: "${employee.employeeType}" 
          )
          {
            firstName,
            lastName
          }
        }                         
    `,
    };

    fetch("http://localhost:3200/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      const data = await response.json();
      refreshEmployeeList();
      console.log(data);
    });
  };

  return (
    <div id="child">
      <EmployeeSearch />
      <EmployeeCreate addEmployee={addEmployee} />
      <EmployeeFilter />
      <EmployeeTable employees={employees} />
    </div>
  );
};
export default EmployeeDirectory;

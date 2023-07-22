import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const { _id } = useParams();
  const [employeeDetails, setEmployeeDetails] = useState(null);
  
  const query = `
    mutation {
      EmployeeDetails(_id: "${_id}") {
        _id
        firstName,
        lastName,
        age,
        dateOfJoining,
        title,
        department,
        employeeType
      }
    }
  `;

  React.useEffect(
    function () {
      fetch("http://localhost:3200/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      }).then(async (response) => {
        let { data } = await response.json();
        setEmployeeDetails(data.EmployeeDetails);
      });
    },
    [_id]
  );

  return (
    <div className="employee-details">
      <h1> Employee Details </h1>
      {employeeDetails && (
        <React.Fragment>
          <h4>FirstName: {employeeDetails.firstName} </h4>
          <h4>lastName: {employeeDetails.lastName} </h4>
          <h4>Age: {employeeDetails.age} </h4>
          <h4>Date of Join: {employeeDetails.dateOfJoining} </h4>
          <h4>Title: {employeeDetails.title} </h4>
          <h4>Department: {employeeDetails.department} </h4>
          <h4>Employee Type: {employeeDetails.employeeType} </h4>
          <Link to="/" className="submit-btn">
            <button>Go Back</button>
          </Link>
        </React.Fragment>
      )}
    </div>
  );
};

export default EmployeeDetails;

import React from "react";
import { Link } from "react-router-dom";

class EmployeeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeDetails: null,
      retirement: null,
    };
  }

  componentDidMount() {
    const url = window.location.href;
    const _id = url.split("/").pop();

    const query = `
      mutation {
        EmployeeDetails(_id: "${_id}") {
          _id
          firstName,
          lastName,
          age,
          birthDate,
          dateOfJoining,
          title,
          department,
          employeeType,
          employeeStatus
        }
      }
    `;

    fetch("http://localhost:3200/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
      .then(async (response) => {
        const { data } = await response.json();
        this.setState({ employeeDetails: data.EmployeeDetails });
      })
      .catch((error) =>
        console.error("Error fetching employee details:", error)
      );
  }

  calculateRetirementDate = (birthdate) => {
    const birthDateObj = new Date(birthdate);
    const retirementYear = birthDateObj.getFullYear() + 65;
    const retirementDateObj = new Date(
      retirementYear,
      birthDateObj.getMonth(),
      birthDateObj.getDate()
    );

    // Calculate the difference in months between the current date and the retirement date
    const monthsDifference =
      (retirementDateObj - new Date()) / (1000 * 60 * 60 * 24 * 30.44); // Average month length

    if (monthsDifference > 0) {
      return retirementDateObj.toISOString().split("T")[0];
    } else {
      return "Emplyee is Retire";
    }
  };

  render() {
    const { employeeDetails } = this.state;

    return (
      <div className="employee-details">
        <h1> Employee Details </h1>
        {employeeDetails && (
          <React.Fragment>
            <h4>FirstName: {employeeDetails.firstName} </h4>
            <h4>lastName: {employeeDetails.lastName} </h4>
            <h4>Age: {employeeDetails.age} </h4>
            <h4>Birth Date: {employeeDetails.birthDate} </h4>
            <h4>Date of Join: {employeeDetails.dateOfJoining} </h4>
            <h4>Title: {employeeDetails.title} </h4>
            <h4>Status: {employeeDetails.employeeStatus} </h4>
            <h4>Department: {employeeDetails.department} </h4>
            <h4>Employee Type: {employeeDetails.employeeType} </h4>
            <h4>
              Employee Retirement:{" "}
              {this.calculateRetirementDate(employeeDetails.birthDate)}
            </h4>
            <Link to="/" className="submit-btn">
              <button>Go Back</button>
            </Link>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default EmployeeDetails;

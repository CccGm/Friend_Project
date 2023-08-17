import React from "react";
import { Link } from "react-router-dom";

class EmployeeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeDetails: null,
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
          dateOfJoining,
          title,
          department,
          employeeType
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
        console.log(data, "given data");
      })
      .catch((error) =>
        console.error("Error fetching employee details:", error)
      );
  }

  render() {
    const { employeeDetails } = this.state;

    return (
      <div className="container employee-details-main">
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
      </div>
    );
  }
}

export default EmployeeDetails;

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
          _id,
          firstName,
          lastName,
          age,
          birthDate,
          dateOfJoining,
          title,
          department,
          employeeType,
          employeeStatus,
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
      <>
        <div className="container employee-details-main">
          <div>
            <h1> Employee Details </h1>
          </div>

          <div className="employee-details">
            {employeeDetails && (
              <React.Fragment>
                <div>
                  <tr>
                    <th>FirstName: </th>
                    <td> {employeeDetails.firstName}</td>
                  </tr>
                  <tr>
                    <th>lastName: </th>
                    <td> {employeeDetails.lastName}</td>
                  </tr>
                  <tr>
                    <th>Age: </th>
                    <td> {employeeDetails.age}</td>
                  </tr>
                  <tr>
                    <th>Birth of Date: </th>
                    <td> {employeeDetails.birthDate}</td>
                  </tr>
                  <tr>
                    <th>Date of Join: </th>
                    <td> {employeeDetails.dateOfJoining}</td>
                  </tr>
                  <tr>
                    <th>Title: </th>
                    <td> {employeeDetails.title}</td>
                  </tr>
                  <tr>
                    <th>Empoyee Status: </th>
                    <td> {employeeDetails.employeeStatus}</td>
                  </tr>
                  <tr>
                    <th>Department: </th>
                    <td> {employeeDetails.department}</td>
                  </tr>
                  <tr>
                    <th>Employee Type: </th>
                    <td> {employeeDetails.employeeType}</td>
                  </tr>
                  <tr>
                    <th>Employee Retirement:: </th>
                    <td>
                      {" "}
                      {this.calculateRetirementDate(employeeDetails.birthDate)}
                    </td>
                  </tr>
                  <div className="row">
                    <Link to="/" className="col-12 back-button submit-btn">
                      <button>Go Back</button>
                    </Link>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default EmployeeDetails;

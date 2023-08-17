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
                    <th>Date of Join: </th>
                    <td> {employeeDetails.dateOfJoining}</td>
                  </tr>
                  <tr>
                    <th>Title: </th>
                    <td> {employeeDetails.title}</td>
                  </tr>
                  <tr>
                    <th>Department: </th>
                    <td> {employeeDetails.department}</td>
                  </tr>
                  <tr>
                    <th>Employee Type: </th>
                    <td> {employeeDetails.employeeType}</td>
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

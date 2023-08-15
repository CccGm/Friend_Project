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

  getDateDifference = (DATE) => {
    const birthDate = new Date(DATE);
    const y_birth = birthDate.getFullYear() + 65;
    const m_birth = birthDate.getMonth() + 1;
    const d_birth = birthDate.getDate();
    const b_Date = `${y_birth}-${m_birth}-${d_birth}`;
    const retirementDate = new Date(b_Date);

    const currentDate = new Date();
    const y_current = currentDate.getFullYear();
    const m_current = currentDate.getMonth() + 1;
    const d_current = currentDate.getDate() + 1;
    const c_Date = `${y_current}-${m_current}-${d_current}`;
    const todayDate = new Date(c_Date);

    const timeDifference = retirementDate - todayDate;
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const millisecondsPerYear = millisecondsPerDay * 365.25; // Approximate average days in a year

    const yearsDifference = Math.floor(timeDifference / millisecondsPerYear);
    const remainingMilliseconds = timeDifference % millisecondsPerYear;

    const monthsDifference = Math.floor(
      remainingMilliseconds / (millisecondsPerDay * 30.44)
    );

    const remainingDays = Math.floor(
      (remainingMilliseconds % (millisecondsPerDay * 30.44)) /
        millisecondsPerDay
    );
    const retirement = `${yearsDifference} Year - ${monthsDifference} Month - ${remainingDays} Day`;

    const sixMonthsBefore = this.calculateSixMonthsDifference(
      retirementDate,
      -6
    );

    const year_diff = sixMonthsBefore.getFullYear() - currentDate.getFullYear();
    const month_diff = sixMonthsBefore.getMonth() - currentDate.getMonth();
    const date_diff = sixMonthsBefore.getDate() - currentDate.getDate();

    if (month_diff < 6 && year_diff < 0) {
      if (month_diff === 0 && date_diff > 1) {
        return date_diff + " days Left";
      } else if (month_diff > 1) {
        return `${month_diff} months remining`;
      } else {
        return "Employee Retire";
      }
    } else {
      return retirement;
    }
  };

  calculateSixMonthsDifference = (baseDate, monthsDifference) => {
    const newDate = baseDate;
    newDate.setMonth(newDate.getMonth() + monthsDifference);
    return newDate;
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
              {this.getDateDifference(employeeDetails.birthDate)}
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

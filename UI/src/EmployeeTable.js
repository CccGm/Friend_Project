import React from "react";
import EmployeeFilter from "./EmployeeFilter";

class EmployeeTable extends React.Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(window.location.search);
    const value = params.get("emp-Type");

    this.state = {
      empData: props.employees,
      filteredData: null,
      value: value || "",
    };
  }

  componentDidMount() {
    if (this.state.value === "" || !this.state.value) {
      this.getEmployeeDetails();
    } else {
      this.fetchFilteredData();
    }
  }

  getEmployeeDetails = () => {
    const query = {
      query: `query {
        getEmployees {
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
      }`,
    };

    fetch("http://localhost:3200/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        this.setState({ empData: data.getEmployees });
        console.log(data.getEmployees, "get dat");
      })
      .catch((e) => {
        console.log(e, "<=errpe");
      });
  };

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

  fetchFilteredData = () => {
    console.log("call", this.state.value);
    const employeeTypeQuery = `
      mutation {
        filterEmpByType(employeeType: "${this.state.value}") {
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
      body: JSON.stringify({ query: employeeTypeQuery }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        console.log(data, "abc=-----");
        this.setState({ filteredData: data.filterEmpByType });
      })
      .catch((e) => console.log(e, "<=error"));
  };

  onEmpDelete = async (deleteId) => {
    const deleteQuery = `
      mutation {
        deleteEmp(_id: "${deleteId}") {
          _id
        }
      }
    `;
    await fetch("http://localhost:3200/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: deleteQuery }),
    }).then(async (response) => {
      await response.json();
      window.location.reload();
    });
  };

  render() {
    const { empData, filteredData } = this.state;

    return (
      <div className="table-container">
        <EmployeeFilter />
        <h1>Employee Table</h1>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Birth Date</th>
              <th>DateOf Joining</th>
              <th>Title</th>
              <th>Status</th>
              <th>Department</th>
              <th>Employee Type</th>
              <th>Retirement Time</th>
              <th>View</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {empData && empData.length > 0 ? (
              empData.map((data, index) => {
                return (
                  <tr key={index}>
                    <td> {data.firstName}</td>
                    <td> {data.lastName}</td>
                    <td> {data.age}</td>
                    <td> {data.birthDate}</td>
                    <td> {data.dateOfJoining}</td>
                    <td> {data.title}</td>
                    <td> {data.employeeStatus}</td>
                    <td> {data.department}</td>
                    <td> {data.employeeType}</td>
                    <td>{this.getDateDifference(data.birthDate)}</td>
                    <td>
                      <div
                        className="links"
                        onClick={(_) =>
                          (window.location.href = `details/${data._id}`)
                        }
                      >
                        Details
                      </div>
                    </td>
                    <td>
                      <div
                        className="links"
                        onClick={(_) =>
                          (window.location.href = `edit/${data._id}`)
                        }
                      >
                        Edit
                      </div>
                    </td>
                    <td>
                      <div
                        className="links"
                        onClick={(_) => {
                          if (data.employeeStatus === "Active") {
                            alert("Status Active so not deleted");
                          } else {
                            this.onEmpDelete(data._id);
                          }
                          // this.onEmpDelete(data._id);
                        }}
                      >
                        Delete
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : filteredData ? (
              <tr>
                <td> {filteredData.firstName}</td>
                <td> {filteredData.lastName}</td>
                <td> {filteredData.age}</td>
                <td> {filteredData.employeeStatus}</td>
                <td> {filteredData.birthDate}</td>
                <td> {filteredData.title}</td>
                <td> {filteredData.department}</td>
                <td> {filteredData.employeeType}</td>
                <td> {filteredData.employeeStatus}</td>
                <td>{this.getDateDifference(filteredData.birthDate)}</td>
                <td>
                  <div
                    className="links"
                    onClick={(_) => {
                      window.location.href = `details/${filteredData._id}`;
                    }}
                  >
                    Details
                  </div>
                </td>
                <td>
                  <div
                    className="links"
                    onClick={(_) => {
                      window.location.href = `edit/${filteredData._id}`;
                    }}
                  >
                    Edit
                  </div>
                </td>
                <td>
                  <div
                    className="links"
                    onClick={(_) => this.onEmpDelete(filteredData._id)}
                  >
                    Delete
                  </div>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    );
  }
}

export default EmployeeTable;

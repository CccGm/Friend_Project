import React from "react";
import EmployeeFilter from "./EmployeeFilter";
import YearFilter from "./YearFilter";

class EmployeeTable extends React.Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(window.location.search);
    const empValue = params.get("emp-Type");
    const yearValue = params.get("filter-year");

    this.state = {
      empData: props.employees,
      filteredData: null,
      filterYear: yearValue || "",
      value: empValue || "",
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
    // const query = {
    //   query: `query {
    //     getEmployees {
    //       _id,
    //       firstName,
    //       lastName,
    //       age,
    //       birthDate,
    //       dateOfJoining,
    //       title,
    //       department,
    //       employeeType,
    //       employeeStatus,
    //     }
    //   }`,
    // };

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
      .then((data) => {
        console.log(data, "get dat");
        this.setState({ empData: data.data.getEmployees });
      })
      .catch((e) => {
        console.log(e, "<=error");
      });
  };

  calculateRetirementDate = (birthdate) => {
    const birthDateObj = new Date(birthdate);
    const retirementYear = birthDateObj.getFullYear() + 65;
    const retirementDateObj = new Date(
      retirementYear,
      birthDateObj.getMonth(),
      birthDateObj.getDate()
    );

    let f_year = this.state.filterYear;

    // Calculate the difference in months between the current date and the retirement date
    const monthsDifference =
      (retirementDateObj - new Date()) / (1000 * 60 * 60 * 24 * 30.44); // Average month length

    const yearsDifference =
      (retirementDateObj - new Date()) / (1000 * 60 * 60 * 24 * 365.25); // Average year length including leap years

    if (f_year !== "" && monthsDifference > 0) {
      if (f_year === "less1year" && yearsDifference < 1) {
        return retirementDateObj.toISOString().split("T")[0];
      } else if (f_year === "less5year" && yearsDifference < 5) {
        return retirementDateObj.toISOString().split("T")[0];
      } else if (f_year === "less10year" && yearsDifference < 10) {
        return retirementDateObj.toISOString().split("T")[0];
      } else {
        return null;
      }
    } else {
      if (monthsDifference > 0) {
        return retirementDateObj.toISOString().split("T")[0];
      } else {
        return "Emplyee is Retire";
      }
    }
  };

  fetchFilteredData = async () => {
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

    await fetch("http://localhost:3200/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: employeeTypeQuery }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "filter data");
        this.setState({ filteredData: data.data.filterEmpByType });
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
        <YearFilter />
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
                {
                  if (this.calculateRetirementDate(data.birthDate) != null)
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
                        <td>{this.calculateRetirementDate(data.birthDate)}</td>
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
                }
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
                <td>{this.calculateRetirementDate(filteredData.birthDate)}</td>
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

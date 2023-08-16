import React from "react";

class UpComingRetirement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      empData: props.employees,
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

  calculateRetirementDate = (birthdate) => {
    const birthDateObj = new Date(birthdate);
    const retirementYear = birthDateObj.getFullYear() + 65;
    const retirementDateObj = new Date(
      retirementYear,
      birthDateObj.getMonth(),
      birthDateObj.getDate()
    );

    const monthsDifference =
      (retirementDateObj - new Date()) / (1000 * 60 * 60 * 24 * 30.44);

    if (monthsDifference < 6) {
      if (monthsDifference > 0) {
        return retirementDateObj.toISOString().split("T")[0];
      } else {
        return "Emplyee is Retire.";
      }
    } else {
      return "Retirement date is more than 6 months away.";
    }
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
    const { empData } = this.state;

    return (
      <div className="table-container">
        <h1>Up Coming Retirment Details</h1>
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
            {empData && empData.length > 0
              ? empData.map((data, index) => {
                  if (
                    this.calculateRetirementDate(data.birthDate) !=
                      "Emplyee is Retire." &&
                    this.calculateRetirementDate(data.birthDate) !=
                      "Retirement date is more than 6 months away."
                  ) {
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
                        {/* <td>{this.getDateDifference(data.birthDate)}</td> */}
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
                            }}
                          >
                            Delete
                          </div>
                        </td>
                      </tr>
                    );
                  }
                })
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UpComingRetirement;

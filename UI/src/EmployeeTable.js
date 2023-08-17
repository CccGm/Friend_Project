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
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
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
          title,
          dateOfJoining,
          department,
          employeeType
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
      });
  };

  fetchFilteredData = () => {
    const employeeTypeQuery = `
      mutation {
        filterEmpByType(employeeType: "${this.state.value}") {
          _id,
          firstName,
          lastName,
          age,
          title,
          dateOfJoining,
          department,
          employeeType
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
        this.setState({ filteredData: data.filterEmpByType });
      });
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
      <div className="container main-Employee-type">
        <EmployeeFilter />
        <h1 className="Employee-table">Employee Table</h1>
        <div className="employee-table-main">
          <table className="users-table">
            <thead className="employee-table">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>DateOf Joining</th>
                <th>Title</th>
                <th>Department</th>
                <th>Employee Type</th>
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
                      <td> {data.dateOfJoining}</td>
                      <td> {data.title}</td>
                      <td> {data.department}</td>
                      <td> {data.employeeType}</td>
                      <td>
                        <div
                          className="links"
                          onClick={(_) =>
                            (window.location.href = `details/${data._id}`)
                          }
                        >
                          details
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
                          onClick={(_) => this.onEmpDelete(data._id)}
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
                  <td> {filteredData.dateOfJoining}</td>
                  <td> {filteredData.title}</td>
                  <td> {filteredData.department}</td>
                  <td> {filteredData.employeeType}</td>
                  <td>
                    <div
                      className="links"
                      onClick={(_) => {
                        window.location.href = `details/${filteredData._id}`;
                      }}
                    >
                      details
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
      </div>
    );
  }
}

export default EmployeeTable;

import React from "react";
import { Link, useParams } from "react-router-dom";

class EmployeeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      employee: {},
    };
  }

  componentDidMount() {
    const url = window.location.href;
    const _id = url.split("/").pop();
    const empDetailsQuery = `
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
      body: JSON.stringify({ query: empDetailsQuery }),
    })
      .then(async (response) => {
        const { data } = await response.json();
        this.setState({ employee: data.EmployeeDetails });
      })
      .catch((error) =>
        console.error("Error fetching employee details:", error)
      );
  }

  handleUpdate = async (e) => {
    e.preventDefault();
    const form = document.forms.employeeEdit;
    let data = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      age: form.age.value,
      dateOfJoining: form.dateOfJoining.value,
      title: form.title.value,
      department: form.department.value,
      employeeType: form.employeeType.value,
    };
    const url = window.location.href;
    const _id = url.split("/").pop();
    const employeeUpdateQuery = `
      mutation {
        updateEmployee(data: {
          _id: "${_id}" ,
          firstName: "${data.firstName}" ,
          lastName: "${data.lastName}", 
          age: "${data.age}",
          dateOfJoining: "${data.dateOfJoining}" ,
          title: "${data.title}" , 
          department: "${data.department}" ,
          employeeType: "${data.employeeType}" 
        }) {
          _id
        }
      }
    `;

    await fetch("http://localhost:3200/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: employeeUpdateQuery }),
    })
      .then(async (response) => {
        const { data } = await response.json();
        if (data.updateEmployee) {
          this.setState({ status: true });
          alert("Employ details has been edited");
          // window.location.href = "/";
          window.location.reload();
        }
      })
      .catch((error) => console.error("Error updating employee:", error));
  };

  render() {
    const { status, employee } = this.state;

    return (
      <div>
        {status ? <Link to="/" /> : null}
        <form
          name="employeeEdit"
          className="employeeEdit"
          onSubmit={this.handleUpdate}
        >
          <div className="form-control">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              defaultValue={employee.firstName}
              placeholder="First name"
              disabled
            ></input>
          </div>

          <div className="form-control">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              defaultValue={employee.lastName}
              placeholder="Last name"
              disabled
            />
          </div>

          <div className="form-control">
            <label>Age</label>
            <input
              type="number"
              name="age"
              defaultValue={employee.age}
              placeholder="Age"
              disabled
            ></input>
          </div>

          <div className="form-control">
            <label>Date Of Joining</label>
            <input
              type="date"
              name="dateOfJoining"
              defaultValue={employee.dateOfJoining}
              disabled
            ></input>
          </div>

          <div className="form-control">
            <label>Title</label>
            <select name="title" defaultValue={employee.title}>
              <option value="select" disabled>
                Select an Option
              </option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="director">Director</option>
              <option value="vp">VP</option>
            </select>
          </div>

          <div className="form-control">
            <label>Department</label>
            <select name="department" defaultValue={employee.department}>
              <option value="select" disabled>
                Select an Option
              </option>
              <option value="it">IT</option>
              <option value="marketing">Marketing</option>
              <option value="hr">HR</option>
              <option value="engineering">Engineering</option>
            </select>
          </div>

          <div className="form-control">
            <label>Employee Type</label>
            <select name="employeeType" defaultValue={employee.employeeType}>
              <option value="select" disabled>
                Select an Option
              </option>
              <option value="fullTime">Full Time</option>
              <option value="partTime">Part Time</option>
              <option value="contract">Contract</option>
              <option value="seasonal">Seasonal</option>
            </select>
          </div>
          <div className="action-buttons">
            <Link to="/" className="submit-btn">
              <button type="button">Go back</button>
            </Link>
            <div className="submit-btn">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EmployeeEdit;

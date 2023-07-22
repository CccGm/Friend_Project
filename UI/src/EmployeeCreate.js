import React from "react";

class EmployeeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const form = document.forms.employeeForm;
    let employee = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      age: form.age.value,
      dateOfJoining: form.dateOfJoining.value,
      title: form.title.value,
      department: form.department.value,
      employeeType: form.employeeType.value,
    };
    let _errors = {
      fnameErr: null,
      lnameErr: null,
      ageErr: null,
      dateOfJoiningErr: null,
      titleErr: null,
      departmentErr: null,
      empTypeErr: null,
    };
    if (employee.firstName === "") {
      _errors.fnameErr = "First name required";
    }
    if (employee.lastName === "") {
      _errors.lnameErr = "Last name required";
    }
    if (employee.age === "") {
      _errors.ageErr = "Age is required";
    }
    if (employee.dateOfJoining === "") {
      _errors.dateOfJoiningErr = "Date of joining is required";
    }
    if (employee.title === "") {
      _errors.titleErr = "Title is required";
    }
    if (employee.department === "") {
      _errors.departmentErr = "Department is required";
    }
    if (employee.employeeType === "") {
      _errors.empTypeErr = "Employee Type is required";
    }
    this.setState({ errors: _errors });

    if (
      employee.firstName &&
      employee.lastName &&
      employee.age &&
      employee.dateOfJoining &&
      employee.title &&
      employee.department &&
      employee.employeeType
    ) {
      this.addEmployee(employee);
      alert("Employ added to table");
      // window.location.href = "/";
      window.location.reload();
    }
  };

  addEmployee = (employee) => {
    const requestBody = {
      query: `
      mutation {
        addEmployee(
          firstName: "${employee.firstName}" ,
          lastName: "${employee.lastName}", 
          age: "${employee.age}",
          dateOfJoining: "${employee.dateOfJoining}" ,
          title: "${employee.title}" , 
          department: "${employee.department}" ,
          employeeType: "${employee.employeeType}" 
        ) {
          firstName,
          lastName
        }
      }                         
    `,
    };

    fetch("http://localhost:3200/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      const data = await response.json();
      this.refreshEmployeeList();
      console.log(data);
    });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="create-employee">
        <h1> Employee Form </h1>
        <form id="employee-form" name="employeeForm" onSubmit={this.onSubmit}>
          <div className="form-control">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
            ></input>
            {errors && <p className="error"> {errors.fnameErr} </p>}
          </div>

          <div className="form-control">
            <label>Last Name</label>
            <input type="text" name="lastName" placeholder="Last name"></input>
            {errors && <p className="error"> {errors.lnameErr} </p>}
          </div>

          <div className="form-control">
            <label>Age</label>
            <input type="number" name="age" placeholder="Age"></input>
            {errors && <p className="error"> {errors.ageErr} </p>}
          </div>

          <div className="form-control">
            <label>Date Of Joining</label>
            <input type="date" name="dateOfJoining"></input>
            {errors && <p className="error"> {errors.dateOfJoiningErr} </p>}
          </div>

          <div className="form-control">
            <label>Title</label>
            <select name="title">
              <option value="select" disabled>
                Select an Option
              </option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="director">Director</option>
              <option value="vp">VP</option>
            </select>
            {errors && <p className="error"> {errors.titleErr} </p>}
          </div>

          <div className="form-control">
            <label>Department</label>
            <select name="department">
              <option value="select" disabled>
                Select an Option
              </option>
              <option value="it">IT</option>
              <option value="marketing">Marketing</option>
              <option value="hr">HR</option>
              <option value="engineering">Engineering</option>
            </select>
            {errors && <p className="error"> {errors.departmentErr} </p>}
          </div>

          <div className="form-control">
            <label>Employee Type</label>
            <select name="employeeType">
              <option value="select" disabled>
                Select an Option
              </option>
              <option value="fullTime">Full Time</option>
              <option value="partTime">Part Time</option>
              <option value="contract">Contract</option>
              <option value="seasonal">Seasonal</option>
            </select>
            {errors && <p className="error"> {errors.empTypeErr} </p>}
          </div>
          <div className="submit-btn form-control">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default EmployeeCreate;

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
    const form = e.target;
    const employee = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      age: form.age.value,
      birthDate: form.birthDate.value,
      dateOfJoining: form.dateOfJoining.value,
      title: form.title.value,
      department: form.department.value,
      employeeType: form.employeeType.value,
      employeeStatus: form.employeeStatus.value,
    };

    const errors = {};

    const fieldsToValidate = [
      "firstName",
      "lastName",
      "age",
      "birthDate",
      "dateOfJoining",
      "title",
      "department",
      "employeeType",
      "employeeStatus",
    ];

    fieldsToValidate.forEach((field) => {
      if (!employee[field]) {
        errors[`${field}Err`] = `${field} is required`;
      }
    });

    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.addEmployee(employee);
      alert("Employee added successfully");
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
          birthDate:"${employee.birthDate}",
          dateOfJoining: "${employee.dateOfJoining}" ,
          title: "${employee.title}" , 
          employeeStatus:"${employee.employeeStatus}",
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
      <div className="container ">
        <div className="container row create-employee">
          <div className="col-12">
            <h1> Employee Form </h1>
          </div>
          <form
            className="col-12 bg-light shadow rounded users-from-bg "
            id="employee-form"
            name="employeeForm"
            onSubmit={this.onSubmit}
          >
            <div className="form-control">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
              ></input>
              {errors && <p className="error"> {errors.firstNameErr} </p>}
            </div>

            <div className="form-control">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
              ></input>
              {errors && <p className="error"> {errors.lastNameErr} </p>}
            </div>

            <div className="form-control">
              <label>Age</label>
              <input type="number" name="age" placeholder="Age"></input>
              {errors && <p className="error"> {errors.ageErr} </p>}
            </div>

            <div className="form-control">
              <label>Birth Date</label>
              <input type="date" name="birthDate"></input>
              {errors && <p className="error"> {errors.birthDateErr} </p>}
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
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
                <option value="VP">VP</option>
              </select>
              {errors && <p className="error"> {errors.titleErr} </p>}
            </div>

            <div className="form-control">
              <label>Status</label>
              <select name="employeeStatus">
                <option value="select" disabled>
                  Select an Option
                </option>
                <option value="Active">Active</option>
                <option value="Deactive">Deactive</option>
              </select>
              {errors && <p className="error"> {errors.employeeStatusErr} </p>}
            </div>

            <div className="form-control">
              <label>Department</label>
              <select name="department">
                <option value="select" disabled>
                  Select an Option
                </option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
              </select>
              {errors && <p className="error"> {errors.departmentErr} </p>}
            </div>

            <div className="form-control">
              <label>Employee Type</label>
              <select name="employeeType">
                <option value="select" disabled>
                  Select an Option
                </option>
                <option value="FullTime">Full Time</option>
                <option value="PartTime">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Seasonal">Seasonal</option>
              </select>
              {errors && <p className="error"> {errors.empTypeErr} </p>}
            </div>
            <div className="submit-btn form-control">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EmployeeCreate;

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

    const inputFields = [
      { name: "firstName", label: "First Name", type: "text" },
      { name: "lastName", label: "Last Name", type: "text" },
      { name: "age", label: "Age", type: "number" },
      { name: "birthDate", label: "Birth Date", type: "date" },
      { name: "dateOfJoining", label: "Date Of Joining", type: "date" },
    ];

    const selectFields = [
      {
        name: "title",
        label: "Title",
        options: ["Employee", "Manager", "Director", "VP"],
      },
      {
        name: "employeeStatus",
        label: "Status",
        options: ["Active", "Deactive"],
      },
      {
        name: "department",
        label: "Department",
        options: ["IT", "Marketing", "HR", "Engineering"],
      },
      {
        name: "employeeType",
        label: "Employee Type",
        options: ["Full Time", "Part Time", "Contract", "Seasonal"],
      },
    ];

    const FormInput = ({ name, label, type, error }) => (
      <div className="form-control">
        <label>{label}</label>
        <input type={type} name={name} placeholder={label}></input>
        {error && <p className="error">{error}</p>}
      </div>
    );

    return (
      <div className="container">
        <div className="container row create-employee">
          <div className="col-12">
            <h1>Employee Form</h1>
          </div>
          <form
            className="col-12 bg-light shadow rounded users-from-bg"
            id="employee-form"
            name="employeeForm"
            onSubmit={this.onSubmit}
          >
            {inputFields.map((field, index) => (
              <FormInput
                key={index}
                name={field.name}
                label={field.label}
                type={field.type}
                error={errors && errors[`${field.name}Err`]}
              />
            ))}

            {selectFields.map((field, index) => (
              <div className="form-control" key={index}>
                <label>{field.label}</label>
                <select name={field.name}>
                  <option value="select" disabled>
                    Select an Option
                  </option>
                  {field.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors && (
                  <p className="error"> {errors[`${field.name}Err`]} </p>
                )}
              </div>
            ))}

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

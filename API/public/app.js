const EmployeeSearch = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "search-container"
  }, /*#__PURE__*/React.createElement("h3", null, " Search "));
};
const EmployeeCreate = ({
  addEmployee
}) => {
  const [errors, setErrors] = React.useState(null);
  const onSubmit = e => {
    e.preventDefault();
    const form = document.forms.employeeForm;
    let employee = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      age: form.age.value,
      dateOfJoining: form.dateOfJoining.value,
      title: form.title.value,
      department: form.department.value,
      employeeType: form.employeeType.value
    };
    let _errors = {
      fnameErr: null,
      lnameErr: null,
      ageErr: null,
      dateOfJoiningErr: null,
      titleErr: null,
      departmentErr: null,
      empTypeErr: null
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
    setErrors({
      ..._errors
    });
    if (employee.firstName && employee.lastName && employee.age && employee.dateOfJoining && employee.title && employee.department && employee.employeeType) {
      return addEmployee(employee);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "create-employee"
  }, /*#__PURE__*/React.createElement("h1", null, " Employee Form "), /*#__PURE__*/React.createElement("form", {
    id: "employee-form",
    name: "employeeForm",
    onSubmit: onSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-control"
  }, /*#__PURE__*/React.createElement("label", null, "First Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "firstName",
    placeholder: "First name"
  }), errors && /*#__PURE__*/React.createElement("p", {
    className: "error"
  }, " ", errors.fnameErr, " ")), /*#__PURE__*/React.createElement("div", {
    className: "form-control"
  }, /*#__PURE__*/React.createElement("label", null, "Last Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "lastName",
    placeholder: "Last name"
  }), errors && /*#__PURE__*/React.createElement("p", {
    className: "error"
  }, " ", errors.lnameErr, " ")), /*#__PURE__*/React.createElement("div", {
    className: "form-control"
  }, /*#__PURE__*/React.createElement("label", null, "Age"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "age",
    placeholder: "Age"
  }), errors && /*#__PURE__*/React.createElement("p", {
    className: "error"
  }, " ", errors.ageErr, " ")), /*#__PURE__*/React.createElement("div", {
    className: "form-control"
  }, /*#__PURE__*/React.createElement("label", null, "Date Of Joining"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    name: "dateOfJoining"
  }), errors && /*#__PURE__*/React.createElement("p", {
    className: "error"
  }, " ", errors.dateOfJoiningErr, " ")), /*#__PURE__*/React.createElement("div", {
    className: "form-control"
  }, /*#__PURE__*/React.createElement("label", null, "Title"), /*#__PURE__*/React.createElement("select", {
    name: "title"
  }, /*#__PURE__*/React.createElement("option", {
    value: "select",
    disabled: true
  }, "Select an Option"), /*#__PURE__*/React.createElement("option", {
    value: "employee"
  }, "Employee"), /*#__PURE__*/React.createElement("option", {
    value: "manager"
  }, "Manager"), /*#__PURE__*/React.createElement("option", {
    value: "director"
  }, "Director"), /*#__PURE__*/React.createElement("option", {
    value: "vp"
  }, "VP")), errors && /*#__PURE__*/React.createElement("p", {
    className: "error"
  }, " ", errors.titleErr, " ")), /*#__PURE__*/React.createElement("div", {
    className: "form-control"
  }, /*#__PURE__*/React.createElement("label", null, "Department"), /*#__PURE__*/React.createElement("select", {
    name: "department"
  }, /*#__PURE__*/React.createElement("option", {
    value: "select",
    disabled: true
  }, "Select an Option"), /*#__PURE__*/React.createElement("option", {
    value: "it"
  }, "IT"), /*#__PURE__*/React.createElement("option", {
    value: "marketing"
  }, "Marketing"), /*#__PURE__*/React.createElement("option", {
    value: "hr"
  }, "HR"), /*#__PURE__*/React.createElement("option", {
    value: "engineering"
  }, "Engineering")), errors && /*#__PURE__*/React.createElement("p", {
    className: "error"
  }, " ", errors.departmentErr, " ")), /*#__PURE__*/React.createElement("div", {
    className: "form-control"
  }, /*#__PURE__*/React.createElement("label", null, "Employee Type"), /*#__PURE__*/React.createElement("select", {
    name: "employeeType"
  }, /*#__PURE__*/React.createElement("option", {
    value: "select",
    disabled: true
  }, "Select an Option"), /*#__PURE__*/React.createElement("option", {
    value: "fullTime"
  }, "Full Time"), /*#__PURE__*/React.createElement("option", {
    value: "partTime"
  }, "Part Time"), /*#__PURE__*/React.createElement("option", {
    value: "contract"
  }, "Contract"), /*#__PURE__*/React.createElement("option", {
    value: "seasonal"
  }, "Seasonal")), errors && /*#__PURE__*/React.createElement("p", {
    className: "error"
  }, " ", errors.empTypeErr, " ")), /*#__PURE__*/React.createElement("div", {
    className: "submit-btn form-control"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Submit"))));
};
const EmployeeTable = ({
  employees
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "table-container"
  }, /*#__PURE__*/React.createElement("h1", null, "Employee Table"), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "First Name"), /*#__PURE__*/React.createElement("th", null, "LastName"), /*#__PURE__*/React.createElement("th", null, "Age"), /*#__PURE__*/React.createElement("th", null, "DateOfJoining"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Department"), /*#__PURE__*/React.createElement("th", null, "EmployeeType"), /*#__PURE__*/React.createElement("th", null, "CurrentStatus"))), /*#__PURE__*/React.createElement("tbody", null, employees.map((data, index) => {
    return /*#__PURE__*/React.createElement("tr", {
      key: index
    }, /*#__PURE__*/React.createElement("td", null, " ", data.firstName), /*#__PURE__*/React.createElement("td", null, " ", data.lastName), /*#__PURE__*/React.createElement("td", null, " ", data.age), /*#__PURE__*/React.createElement("td", null, " ", data.dateOfJoining), /*#__PURE__*/React.createElement("td", null, " ", data.title), /*#__PURE__*/React.createElement("td", null, " ", data.department), /*#__PURE__*/React.createElement("td", null, " ", data.employeeType), /*#__PURE__*/React.createElement("td", null, " 1 "));
  }))));
};
const EmployeeDirectory = () => {
  const [employees, setEmployeesData] = React.useState([]);
  let query = {
    query: `query {
      getEmployees {
        firstName,
        lastName,
        age,
        title,
        dateOfJoining,
        department,
        employeeType
      }
    }`
  };
  const refreshEmployeeList = async () => {
    const response = await fetch("http://localhost:3200/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(query)
    });
    let _response = await response.json();
    let empData = _response.data.getEmployees;
    setEmployeesData(empData);
  };
  React.useEffect(function () {
    refreshEmployeeList();
  }, [setEmployeesData]);
  const addEmployee = employee => {
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
          )
          {
            firstName,
            lastName
          }
        }                         
    `
    };
    fetch("http://localhost:3200/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async response => {
      const data = await response.json();
      refreshEmployeeList();
      console.log(data);
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    id: "child"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "page-header"
  }, " Employee Management System "), /*#__PURE__*/React.createElement(EmployeeSearch, null), /*#__PURE__*/React.createElement(EmployeeCreate, {
    addEmployee: addEmployee
  }), /*#__PURE__*/React.createElement(EmployeeTable, {
    employees: employees
  }));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(EmployeeDirectory, null));
import React, { useEffect, useState } from "react";
import EmployeeFilter from "./EmployeeFilter";
import { useLocation } from "react-router-dom";

const EmployeeTable = ({ employees }) => {
  const params = useLocation().search;
  const value = new URLSearchParams(params).get("emp-Type");
  const [empData, setEmployeesData] = useState(employees);
  const [filteredData, setFilteredData] = useState(null);

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
  const getEmployeeDetails = () => {
    fetch("http://localhost:3200/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setEmployeesData(data.getEmployees);
      });
  };
  useEffect(() => {
    if (value === "" || !value) {
      getEmployeeDetails();
    }
  }, [value]);

  useEffect(() => {
    const employeeTypeQuery = `
    mutation {
      filterEmpByType(employeeType: "${value}") {
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
        setFilteredData(data.filterEmpByType);
      });
  }, [value]);

  const onEmpDelete = async (deleteId) => {
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
                      onClick={(_) => onEmpDelete(data._id)}
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
                  onClick={(_) => onEmpDelete(filteredData._id)}
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
};

export default EmployeeTable;

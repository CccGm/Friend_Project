import React, { useState } from "react";

const EmployeeFilter = () => {
  const [empType, setEmpType] = useState("");

  const onChangeFilter = (e) => {
    setEmpType(e.target.value)
  }

  return (
    <div className="filter-container">
      <h2> Select Employee Type: </h2>
      <form name="employeeFilter">
        <select
          value={empType}
          className="form-control"
          name="emp-Type"
          onChange={(e) => onChangeFilter(e)}
        >
          <option value="">All</option>
          <option value="fullTime">Full Time</option>
          <option value="partTime">Part Time</option>
          <option value="contract">Contract</option>
          <option value="seasonal">Seasonal</option>
        </select>
        <button type="submit" className="btn-submit">
          Filter
        </button>
      </form>
    </div>
  );
};

export default EmployeeFilter;

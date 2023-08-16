import React from "react";

class EmployeeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empType: "",
    };
  }

  onChangeFilter = (e) => {
    this.setState({ empType: e.target.value });
  };

  render() {
    const { empType } = this.state;

    return (
      <div className="filter-container">
        <h2> Select Employee Type: </h2>
        <form name="employeeFilter">
          <select
            value={empType}
            className="form-control"
            name="emp-Type"
            onChange={this.onChangeFilter}
          >
            <option value="">All</option>
            <option value="FullTime">Full Time</option>
            <option value="PartTime">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </select>
          <button type="submit" className="submit-btn form-control">
            Filter
          </button>
        </form>
      </div>
    );
  }
}

export default EmployeeFilter;

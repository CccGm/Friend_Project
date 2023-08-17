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
      <div className=" p-5  bg-light shadow rounded mb-8 users-card-color flex flex-col ">
        <div className="row">
          <div className="col-4 employee-type">
            <h2> Select Employee Type: </h2>
          </div>

          <form className="col-4 " name="employeeFilter">
            <select
              value={empType}
              className="form-control select-input"
              name="emp-Type"
              onChange={this.onChangeFilter}
            >
              <option value="">All</option>
              <option value="fullTime">Full Time</option>
              <option value="partTime">Part Time</option>
              <option value="contract">Contract</option>
              <option value="seasonal">Seasonal</option>
            </select>

          </form>
          <div className="col-4 text-end">
            <button type="submit" className="submit-btn-employ btn-submit">
              Filter
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeFilter;

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
      <div className=" p-3  bg-light shadow rounded mb-8 users-card-color flex flex-col">
        <div className="row justify-content-center">
          <div className="col-4 employee-type">
            <h2> Select Employee Type: </h2>
          </div>

          <form className="col-4 " name="employeeFilter">
            <div className="row">
              <div className="col-8">
                <select
                  value={empType}
                  className="form-control select-input"
                  name="emp-Type"
                  onChange={this.onChangeFilter}
                >
                  <option value="">All</option>
                  <option value="FullTime">Full Time</option>
                  <option value="PartTime">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Seasonal">Seasonal</option>
                </select>
              </div>
              <div className="col-4 text-end">
                <button type="submit" className="submit-btn-employ btn-submit">
                  Filter
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EmployeeFilter;

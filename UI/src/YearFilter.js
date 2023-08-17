import React from "react";

class YearFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterYear: "",
    };
  }

  onChangeYear = (e) => {
    this.setState({ filterYear: e.target.value });
  };

  render() {
    const { filterYear } = this.state;

    return (
      <div className=" p-3 mt-3  bg-light shadow rounded mb-8 users-card-color flex flex-col ">
        <div className="row justify-content-center">
          <div className="col-4 employee-type">
            <h2> Filter By Year: </h2>
          </div>

          <form className="col-4 " name="YearFilter">
            <div className="row">
              <div className="col-8">
                <select
                  value={filterYear}
                  className="form-control select-input"
                  name="filter-year"
                  onChange={this.onChangeYear}
                >
                  <option value="">All</option>
                  <option value="less1year">Less than 1 Year</option>
                  <option value="less5year">Less than 5 Year</option>
                  <option value="less10year">Less than 10 Year</option>
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

export default YearFilter;

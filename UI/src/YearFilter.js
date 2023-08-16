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
      <div className="filter-container">
        <h2>Filter By Date</h2>
        <form name="YearFilter">
          <select
            value={filterYear}
            className="form-control"
            name="filter-year"
            onChange={this.onChangeYear}
          >
            <option value="">All</option>
            <option value="less1year">Less than 1 Year</option>
            <option value="less5year">Less than 5 Year</option>
            <option value="less10year">Less than 10 Year</option>
          </select>
          <button type="submit" className="submit-btn form-control">
            Filter Year
          </button>
        </form>
      </div>
    );
  }
}

export default YearFilter;

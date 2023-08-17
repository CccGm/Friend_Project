import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import PageRoutes from "./PageRoutes";

class Page extends React.Component {
  render() {
    return (
      <>
        <nav className="navbar-top-fixed navbar bg-white shadow navbar-expand-lg bg-body-tertiary">
          <div className="container">
            <a className="navbar-brand" href="#">
              Employee Management Systems
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse navbar-item-main"
              id="navbarNavAltMarkup"
            >
              <div className="navbar-nav">
                <a
                  className="nav-link nevbar-item-pt"
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
                <a className="nav-link nevbar-item-pt" href="add-employee">
                  Add Employee
                </a>
                <a className="nav-link nevbar-item-pt" href="employee-data">
                  Employee Data
                </a>
                <a
                  className="nav-link nevbar-item-pt"
                  href="upcoming-retirement"
                >
                  Up Coming Retirement
                </a>
              </div>
            </div>
          </div>
        </nav>
        <Router>
          {/* <div className="row">
          <nav className="navbar">
            <Link to="/">Home</Link> {"| "}
            <Link to="/add-employee"> Add Employee </Link> {"| "}
            <Link to="/employee-data"> Employee Data </Link>
          </nav>
        </div> */}
          <PageRoutes />
        </Router>
      </>
    );
  }
}

export default Page;

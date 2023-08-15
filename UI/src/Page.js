import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import PageRoutes from "./PageRoutes";

class Page extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar">
            <Link to="/">Home</Link> {"| "}
            <Link to="/add-employee"> Add Employee </Link> {"| "}
            <Link to="/employee-data"> Employee Data </Link> {"| "}
            <Link to="/upcoming-retirement"> Up Coming Retirement </Link>
          </nav>
        </div>
        <PageRoutes />
      </Router>
    );
  }
}

export default Page;

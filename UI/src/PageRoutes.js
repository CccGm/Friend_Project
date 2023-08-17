import React from "react";
import { Route, Routes } from "react-router-dom";
import EmployeeEdit from "./EmployeeEdit";
import EmployeeTable from "./EmployeeTable";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeDetails from "./EmployeeDetails";
import EmployeeDirectory from "./EmployeeDirectory";

const NotFound = () => <h2>This Path is Not Available. </h2>;

class PageRoutes extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<EmployeeDirectory />} />
        <Route path="/employee-data" element={<EmployeeTable />} />
        <Route path="/add-employee" element={<EmployeeCreate />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/edit/:_id" element={<EmployeeEdit />} />
        <Route path="/details/:_id" element={<EmployeeDetails />} />
      </Routes>
    );
  }
}

export default PageRoutes;

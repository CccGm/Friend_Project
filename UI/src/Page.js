import { BrowserRouter as Router, Link} from "react-router-dom";
import PageRoutes from "./PageRoutes";

export default function Page() {
    return (
        <Router>
            <div>
                <nav className="navbar">
                    <Link to="/">Home</Link> { "| "}
                    <Link to="/add-employee"> Add Employee </Link>  { "| "}
                    <Link to="/employee-data"> Employee Data </Link>
                </nav>
            </div>
            <PageRoutes />
        </Router>
    )
}
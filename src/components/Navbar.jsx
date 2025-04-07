import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';  
import "./Navbar.css";

export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="menu-btn" onClick={toggleSidebar}>☰</button>
        <span className="logo">
          <h3> 
            <span className="logo-h">H</span><span className="logo-c">C</span>onnect
          </h3> 
        </span>
        <Link to="/home" className="nav-btn">Home</Link>
        <Link to="/appointments" className="nav-btn">Appointments</Link>
        <button className="btn btn-danger logout-btn" onClick={() => {
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("userId");
            window.location.href = "/login"; 
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

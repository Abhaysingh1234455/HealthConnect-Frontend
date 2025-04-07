import { useState } from 'react';
import { Link } from 'react-router-dom';  
import "./Sidebar.css";
import PropTypes from 'prop-types';

export default function Sidebar({ isOpen }) {
  const [isReportsOpen, setReportsOpen] = useState(false);

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <nav>
        <ul className="sidebar-menu">
          <li>
            <Link to="/home" className="sidebar-link">Home</Link>
          </li>
          <li>
            <Link to="/metrics" className="sidebar-link">Body Metrics</Link>
          </li>
          <li>
            <Link to="/health" className="sidebar-link">Health</Link>
          </li>
          <li className="reports-dropdown">
            <div 
              className={`dropdown-header ${isReportsOpen ? 'open' : ''}`}
              onClick={() => setReportsOpen(!isReportsOpen)}
            >
              <Link to="/reports" className="sidebar-link">Reports</Link>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

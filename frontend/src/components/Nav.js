import React from "react";
import { useLocation } from "react-router-dom";
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import '../css/styles.css';

function Nav({ Toggle }) {
  const location = useLocation();

  // Map pathnames to human-readable names
  const pageNames = {
    '/': 'Overview',
    '/dashboard': 'Dashboard',
    '/report': 'Report',
    '/recipe': 'Recipe',
    '/calendar': 'Calendar'
  };

  // Get the page name based on the current pathname
  const pageName = pageNames[location.pathname] || 'Navbar';

  return (
    <nav className="navbar navbar-expand-sm navbar-dark custom-navbar">
      <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}>
        {pageName}
      </i>
      
      {/* Conditionally render the heading for the Recipe page */}
      {location.pathname === '/recipe' && (
        <h2 style={{ color: 'black', marginLeft: '10px',textAlign: "center" }}>Jenkins Summary Report</h2>
      )}

      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="bi bi-justify"></i>
      </button>

      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              USER
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              <a className="dropdown-item" href="#">Profile</a>
              <a className="dropdown-item" href="#">Setting</a>
              <a className="dropdown-item" href="#">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;

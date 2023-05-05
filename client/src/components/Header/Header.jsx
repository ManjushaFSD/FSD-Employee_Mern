import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Import the CSS file

const Header = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Fetch the user role from local storage
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  const isLoggedIn = localStorage.getItem("token") !== null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

 // const isAdmin = userRole === "admin"; // Check if the user has an "admin" role

  return (
    <>
      <nav className="navbar navbar-expand-lg item">
        <div className="container-fluid">
          <Link className="item" to="/home">
            Employee App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="item" to="/home">
                  Home
                </Link>
              </li>
              
                <li className="nav-item">
                  <Link className="item" to="/addemployees">
                    Add Employee
                  </Link>
                </li>
              
              {isLoggedIn ? (
                <li className="nav-item">
                  <Link className="item" to="/login" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="item" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

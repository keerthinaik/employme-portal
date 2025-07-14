import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoDark from "../assets/images/logo-dark.png";
import client from "../assets/images/team/01.jpg";
import { FiUser, FiLogOut } from "../assets/icons/vander";

// Simulate authentication (replace with real auth logic)
const isLoggedIn = () => {
  // e.g. return !!localStorage.getItem("token");
  return true; // Set to true to test logged-in state
};

export default function Navbar({ navClass = "", navLight = false }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      id="topnav"
      className={`navbar navbar-expand-lg ${navClass} ${
        navLight ? "navbar-light" : "navbar-dark"
      } bg-white shadow-sm`}
    >
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo/Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          {/* <img src={logoDark} alt="EmployMe" height={36} className="me-2" /> */}
          <span className="fw-bold fs-4 text-primary mb-0">EmployMe</span>
        </Link>

        {/* Navigation */}
        <nav className="d-flex align-items-center">
          <ul className="navbar-nav flex-row align-items-center mb-0">
            <li className="nav-item mx-2">
              <Link
                to="/job-list-two"
                className={`nav-link${
                  location.pathname.startsWith("/job") ? " active" : ""
                }`}
              >
                Jobs
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                to="/companies"
                className={`nav-link${
                  location.pathname.startsWith("/companies") ? " active" : ""
                }`}
              >
                Companies
              </Link>
            </li>
            {!isLoggedIn() ? (
              <li className="nav-item mx-2">
                <Link
                  to="/login"
                  className={`btn btn-primary px-4 ms-2`}
                  style={{ fontWeight: 500 }}
                >
                  Sign In
                </Link>
              </li>
            ) : (
              <li className="nav-item mx-2 position-relative" ref={dropdownRef}>
                <button
                  className="btn btn-light d-flex align-items-center px-2 py-1"
                  style={{ borderRadius: "50%" }}
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  <img
                    src={client}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: 36, height: 36, objectFit: "cover" }}
                  />
                </button>
                {/* Dropdown */}
                <div
                  className={`dropdown-menu dd-menu dropdown-menu-end bg-white rounded shadow border-0 mt-2${
                    dropdownOpen ? " show" : ""
                  }`}
                  style={{
                    minWidth: 180,
                    right: 0,
                    left: "auto",
                    display: dropdownOpen ? "block" : "none",
                    position: "absolute",
                    zIndex: 1050,
                  }}
                >
                  <Link
                    to="/candidate-profile"
                    className="dropdown-item fw-medium fs-6"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FiUser className="fea icon-sm me-2 align-middle" />
                    Profile
                  </Link>
                  <div className="dropdown-divider border-top"></div>
                  <Link
                    to="/login"
                    className="dropdown-item fw-medium fs-6"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FiLogOut className="fea icon-sm me-2 align-middle" />
                    Logout
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

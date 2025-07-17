import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoDark from "../assets/images/logo-dark.png";
import client from "../assets/images/team/01.jpg";
import { FiUser, FiLogOut, FiMenu } from "../assets/icons/vander";
import { useAuth } from "../apis/AuthContext";
import { BASE_URL } from "../apis/api";

export default function Navbar({ navClass = "", navLight = false }) {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  // Get user object from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const profilePhoto = storedUser?.profilePhoto
    ? `${BASE_URL}/${storedUser.profilePhoto}`
    : client;

  // Close mobile menu on navigation
  const handleNavClick = () => setMobileOpen(false);

  return (
    <header
      id="topnav"
      className={`navbar navbar-expand-lg ${navClass} ${
        navLight ? "navbar-light" : "navbar-dark"
      } bg-white shadow-sm`}
    >
      <div className="container d-flex align-items-center justify-content-between px-3 w-100">
        {/* Logo/Brand */}
        <Link className="navbar-brand d-flex align-items-center m-0" to="/">
          <span className="fw-bold fs-4 text-primary mb-0">EmployMe</span>
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="navbar-toggler d-lg-none border-0 bg-transparent ms-auto"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <FiMenu size={28} />
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="d-none d-lg-flex align-items-center">
        <ul className="navbar-nav flex-row align-items-center mb-0">
          <li className="nav-item mx-2">
            <Link
              to="/jobs"
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
          {!user ? (
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
            <li className="nav-item mx-2 position-relative">
              <button
                className="btn btn-light d-flex align-items-center px-2 py-1"
                style={{ borderRadius: "50%" }}
                onClick={() => setDropdownOpen((open) => !open)}
              >
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: 36, height: 36, objectFit: "cover" }}
                />
              </button>
              {/* Dropdown */}
              {dropdownOpen && (
                <div
                  className="dropdown-menu dd-menu dropdown-menu-end bg-white rounded shadow border-0 mt-2 show"
                  style={{
                    minWidth: 180,
                    right: 0,
                    left: "auto",
                    position: "absolute",
                    zIndex: 1050,
                    display: "block",
                  }}
                >
                  <Link
                    to="/profile"
                    className="dropdown-item fw-medium fs-6"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FiUser className="fea icon-sm me-2 align-middle" />
                    Profile
                  </Link>
                  <div className="dropdown-divider border-top"></div>
                  <button
                    className="dropdown-item fw-medium fs-6"
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                  >
                    <FiLogOut className="fea icon-sm me-2 align-middle" />
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{
            background: "rgba(0,0,0,0.25)",
            zIndex: 1999,
          }}
          onClick={() => setMobileOpen(false)}
        >
          <nav
            className="bg-white shadow position-fixed top-0 end-0 vh-100"
            style={{
              width: 260,
              right: 0,
              zIndex: 2000,
              transition: "right 0.3s",
              boxShadow: "0 0 20px rgba(0,0,0,0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex flex-column h-100">
              <div className="d-flex align-items-center justify-content-between px-3 py-3 border-bottom">
                <span className="fw-bold fs-4 text-primary">EmployMe</span>
                <button
                  className="btn btn-link p-0"
                  aria-label="Close"
                  onClick={() => setMobileOpen(false)}
                >
                  &times;
                </button>
              </div>
              <ul className="navbar-nav flex-column px-3 pt-3">
                <li className="nav-item mb-2">
                  <Link
                    to="/jobs"
                    className={`nav-link${
                      location.pathname.startsWith("/job") ? " active" : ""
                    }`}
                    onClick={handleNavClick}
                  >
                    Jobs
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link
                    to="/companies"
                    className={`nav-link${
                      location.pathname.startsWith("/companies")
                        ? " active"
                        : ""
                    }`}
                    onClick={handleNavClick}
                  >
                    Companies
                  </Link>
                </li>
                {!user ? (
                  <li className="nav-item mb-2">
                    <Link
                      to="/login"
                      className="btn btn-primary w-100"
                      style={{ fontWeight: 500 }}
                      onClick={handleNavClick}
                    >
                      Sign In
                    </Link>
                  </li>
                ) : (
                  <>
                    <li className="nav-item mb-2">
                      <Link
                        to="/profile"
                        className="nav-link"
                        onClick={handleNavClick}
                      >
                        <FiUser className="fea icon-sm me-2 align-middle" />
                        Profile
                      </Link>
                    </li>
                    <li className="nav-item mb-2">
                      <button
                        className="btn btn-link nav-link text-start w-100"
                        style={{ color: "#40189d" }}
                        onClick={() => {
                          setMobileOpen(false);
                          logout();
                        }}
                      >
                        <FiLogOut className="fea icon-sm me-2 align-middle" />
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
              <div className="flex-grow-1"></div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

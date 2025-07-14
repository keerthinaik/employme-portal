import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoDark from "../assets/images/logo-dark.png";
import client from "../assets/images/team/01.jpg";
import { FiUser, FiLogOut, FiMenu, FiX } from "../assets/icons/vander";
import { useAuth } from "../apis/AuthContext";

export default function Navbar({ navClass = "", navLight = false }) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.classList.contains("navbar-toggler")
      ) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

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

        {/* Hamburger for mobile */}
        <button
          className="navbar-toggler d-lg-none border-0 bg-transparent"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

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
                    to="/profile"
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
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                  >
                    <FiLogOut className="fea icon-sm me-2 align-middle" />
                    Logout
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Navigation Drawer */}
        <div
          ref={mobileMenuRef}
          className={`mobile-nav bg-white shadow position-fixed top-0 end-0 vh-100 d-lg-none transition-all`}
          style={{
            width: 260,
            right: mobileOpen ? 0 : -300,
            zIndex: 2000,
            transition: "right 0.3s",
            boxShadow: mobileOpen ? "0 0 20px rgba(0,0,0,0.15)" : "none",
          }}
        >
          <div className="d-flex flex-column h-100">
            <div className="d-flex align-items-center justify-content-between px-3 py-3 border-bottom">
              <span className="fw-bold fs-4 text-primary">EmployMe</span>
              <button
                className="btn btn-link p-0"
                aria-label="Close"
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileOpen(false);
                }}
              >
                <FiX size={28} />
              </button>
            </div>
            <ul className="navbar-nav flex-column px-3 pt-3">
              <li className="nav-item mb-2">
                <Link
                  to="/jobs"
                  className={`nav-link${
                    location.pathname.startsWith("/job") ? " active" : ""
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  Jobs
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/companies"
                  className={`nav-link${
                    location.pathname.startsWith("/companies") ? " active" : ""
                  }`}
                  onClick={() => setMobileOpen(false)}
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
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign In
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item mb-2">
                    <Link
                      to="/candidate-profile"
                      className="nav-link"
                      onClick={() => setMobileOpen(false)}
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
        </div>
        {/* Overlay for mobile menu */}
        {mobileOpen && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{
              background: "rgba(0,0,0,0.25)",
              zIndex: 1999,
            }}
            onClick={() => setMobileOpen(false)}
          ></div>
        )}
      </div>
    </header>
  );
}

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoDark from "../assets/images/logo-dark.png";
import logoLight from "../assets/images/logo-light.png";
import client from "../assets/images/team/01.jpg";
import {
  LuSearch,
  FiUser,
  FiSettings,
  FiLock,
  FiLogOut,
} from "../assets/icons/vander";

export default function NavbarDark() {
  let [isOpen, setMenu] = useState(true);
  let [scroll, setScroll] = useState(false);
  let [search, setSearch] = useState(false);
  let [cartitem, setCartitem] = useState(false);

  let [manu, setManu] = useState("");
  let location = useLocation();
  useEffect(() => {
    let current = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    setManu(current);
  }, [location.pathname.substring(location.pathname.lastIndexOf("/") + 1)]);

  useEffect(() => {
    function scrollHandler() {
      setScroll(window.scrollY > 50);
    }
    window.addEventListener("scroll", scrollHandler);

    let searchModal = () => {
      setSearch(false);
    };
    document.addEventListener("mousedown", searchModal);

    let cartModal = () => {
      setCartitem(false);
    };
    document.addEventListener("mousedown", cartModal);

    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      document.removeEventListener("mousedown", searchModal);
      document.removeEventListener("mousedown", cartModal);
    };
  }, []);
  const toggleMenu = () => {
    setMenu(!isOpen);
    if (document.getElementById("navigation")) {
      const anchorArray = Array.from(
        document.getElementById("navigation").getElementsByTagName("a")
      );
      anchorArray.forEach((element) => {
        element.addEventListener("click", (elem) => {
          const target = elem.target.getAttribute("href");
          if (target !== "") {
            if (elem.target.nextElementSibling) {
              var submenu = elem.target.nextElementSibling.nextElementSibling;
              submenu.classList.toggle("open");
            }
          }
        });
      });
    }
  };
  return (
    <header
      id="topnav"
      className={`${scroll ? "nav-sticky" : ""} defaultscroll sticky`}
    >
      <div className="container">
        <Link className="logo" to="/">
          <p className="p-3" style={{ color: " #40189d" }}>
            Employ Me
          </p>
        </Link>
        <div className="menu-extras">
          <div className="menu-item">
            <Link
              to="#"
              className="navbar-toggle"
              id="isToggle"
              onClick={toggleMenu}
            >
              <div className="lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </Link>
          </div>
        </div>

        <ul className="buy-button list-inline mb-0">
          <li className="list-inline-item ps-1 mb-0">
            <div className="dropdown dropdown-primary">
              <button
                type="button"
                onClick={() => setCartitem(!cartitem)}
                className="dropdown-toggle btn btn-sm btn-icon btn-pills btn-primary"
              >
                <img src={client} className="img-fluid rounded-pill" alt="" />
              </button>
              <div style={{ display: cartitem === true ? "block" : "none" }}>
                <div
                  className={` dropdown-menu dd-menu dropdown-menu-end bg-white rounded shadow border-0 mt-3 show`}
                >
                  <Link
                    to="candidate-profile"
                    className="dropdown-item fw-medium fs-6"
                  >
                    <FiUser className="fea icon-sm me-2 align-middle" />
                    Profile
                  </Link>
                  <Link
                    to="candidate-profile-setting"
                    className="dropdown-item fw-medium fs-6"
                  >
                    <FiSettings className="fea icon-sm me-2 align-middle" />
                    Settings
                  </Link>
                  <div className="dropdown-divider border-top"></div>
                  <Link
                    to="lock-screen"
                    className="dropdown-item fw-medium fs-6"
                  >
                    <FiLock className="fea icon-sm me-2 align-middle" />
                    Lockscreen
                  </Link>
                  <Link to="login" className="dropdown-item fw-medium fs-6">
                    <FiLogOut className="fea icon-sm me-2 align-middle" />
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <div id="navigation">
          <ul className="navigation-menu nav-right">
            <li>
              <Link to="/job-list-Two">Jobs</Link>
            </li>
            <li>
              <Link to="/login">Sign In</Link>
            </li>
            <li>
              <Link to="/job-list-Two">Companies</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

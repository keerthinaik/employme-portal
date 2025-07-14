import React from "react";
import { Link } from "react-router-dom";

import bg1 from "../assets/images/hero/bg3.jpg";
import logo from "../assets/images/logo-dark.png";
import Navbar from "../componants/navbar";
import Footer from "../componants/footer";
import googleLogo from "../assets/images/svg/google.svg";
import fbLogo from "../assets/images/svg/facebook.svg";
import appleLogo from "../assets/images/svg/appleId.svg";
import linkedInLogo from "../assets/images/svg/linkedin.svg";

export default function Login() {
  return (
    <div>
      <Navbar navClass="defaultscroll sticky " navLight={true} />
      <section
        className="bg-home d-flex align-items-center justify-content-center "
        style={{ backgroundImage: `url(${bg1})`, backgroundPosition: "center" }}
      >
        {/* <div className="bg-overlay bg-linear-gradient-2"></div> */}
        <div className="container-fluid px-0">
          <div className="row g-0 justify-content-center rounded shadow-md w-100">
            <div className="col-lg-4 col-md-5 col-12 p-4 bg-white">
              <p>
                By continuing you indicate that you agree to EmployMe's terms of
                Service and Privacy Policy.
              </p>
              <button
                className="btn w-100 mb-3"
                style={{ backgroundColor: "#e1d3ff", padding: "0px" }}
              >
                <div className="d-flex align-items-center justify-content-evenly">
                  <img src={googleLogo} height={30} alt="g" />
                  <h5 style={{ paddingTop: "8px", color: "#40189d" }}>
                    Login with Google
                  </h5>
                </div>
              </button>
              <button
                className="btn w-100 mb-3"
                style={{ backgroundColor: "#e1d3ff", padding: "0px" }}
              >
                <div className="d-flex align-items-center justify-content-evenly">
                  <img
                    src={fbLogo}
                    height={25}
                    style={{ paddingLeft: "12px" }}
                    alt="g"
                  />
                  <h5 style={{ paddingTop: "8px", color: "#40189d" }}>
                    Login with Facebook
                  </h5>
                </div>
              </button>
              <button
                className="btn w-100 mb-3"
                style={{ backgroundColor: "#e1d3ff", padding: "0px" }}
              >
                <div className="d-flex align-items-center justify-content-evenly">
                  <img src={appleLogo} height={30} alt="g" />
                  <h5 style={{ paddingTop: "8px", color: "#40189d" }}>
                    Login with Apple ID
                  </h5>
                </div>
              </button>
              <button
                className="btn w-100 mb-3"
                style={{ backgroundColor: "#e1d3ff", padding: "0px" }}
              >
                <div className="d-flex align-items-center justify-content-evenly">
                  <img src={linkedInLogo} height={30} alt="g" />
                  <h5 style={{ paddingTop: "8px", color: "#40189d" }}>
                    Login with LinkedIn
                  </h5>
                </div>
              </button>
            </div>

            <div
              className="col-lg-1 d-none d-md-block mt-4 mb-4"
              style={{
                width: "1px",
                backgroundColor: "gray",
              }}
            ></div>

            <div className="col-lg-4 col-md-5 col-12 p-4 bg-white">
              <form className="w-100">
                <h6 className="mb-3 text-uppercase fw-semibold">
                  Please sign in
                </h6>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Your Email</label>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="example@website.com"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold" htmlFor="loginpass">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="loginpass"
                    placeholder="Password"
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-label form-check-label text-muted"
                        htmlFor="flexCheckDefault"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <span className="forgot-pass text-muted small mb-0">
                    <Link to="/reset-password" className="text-muted">
                      Forgot password?
                    </Link>
                  </span>
                </div>

                <button
                  className="btn text-white w-100"
                  style={{ backgroundColor: "#40189d" }}
                  type="submit"
                >
                  Sign in
                </button>

                <div className="col-12 text-center mt-3">
                  <span>
                    <span className="text-muted me-2 small">
                      Don't have an account?
                    </span>
                    <Link to="/signup" className="text-dark fw-semibold small">
                      Sign Up
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

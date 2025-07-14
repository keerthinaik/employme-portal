import React, { useState } from "react";
import { Link } from "react-router-dom";
import bg1 from "../assets/images/hero/bg3.jpg";
import logo from "../assets/images/logo-dark.png";
import Navbar from "../componants/navbar";
import Footer from "../componants/footer";

export default function Signup() {
  const [isChecked, setIsChecked] = useState(true); // default to checked

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle checkbox state
  };

  return (
    <>
      <Navbar navClass="defaultscroll sticky" navLight={true} />
      <section
        className="bg-half-140 d-flex align-items-center justify-content-center"
        style={{ backgroundImage: `url(${bg1})`, backgroundPosition: "center" }}
      >
        <div className="bg-overlay bg-linear-gradient-2 "></div>
        <div className="container mb-60">
          <div className="row">
            <div className="col-lg-8 col-md-5 col-12">
              <div
                className="p-4 bg-white rounded shadow-md mx-auto w-auto"
                style={{ maxWidth: "400px" }}
              >
                <form>
                  <Link to="/">
                    <h4
                      style={{
                        color: " #40189d",
                        textAlign: "center",
                      }}
                      className="pb-2"
                    >
                      Employ Me
                    </h4>
                  </Link>
                  <h6 className="mb-3 text-uppercase fw-semibold">
                    Register your account
                  </h6>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Your Name</label>
                    <input
                      name="name"
                      id="name"
                      type="text"
                      className="form-control"
                      placeholder="Calvin Carlo"
                    />
                  </div>

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
                    <label
                      className="form-label fw-semibold"
                      htmlFor="loginpass"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="loginpass"
                      placeholder="Password"
                    />
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <label
                      className="form-label form-check-label text-muted"
                      htmlFor="flexCheckDefault"
                      style={{
                        textDecorationColor: "#fbf6ff",
                      }}
                    >
                      I Accept{" "}
                      <Link
                        to="/terms"
                        style={{
                          textDecorationColor: "#fbf6ff",
                        }}
                      >
                        Terms And Condition
                      </Link>
                    </label>
                  </div>

                  <button
                    className="btn btn-primary w-100"
                    type="submit"
                    disabled={!isChecked}
                  >
                    Register
                  </button>

                  <div className="col-12 text-center mt-3">
                    <span>
                      <span className="text-muted small me-2">
                        Already have an account ?{" "}
                      </span>{" "}
                      <Link to="/login" className="text-dark fw-semibold small">
                        Sign in
                      </Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

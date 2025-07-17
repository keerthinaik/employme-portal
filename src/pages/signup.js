import React, { useState } from "react";
import { Link } from "react-router-dom";
import bg1 from "../assets/images/hero/bg3.jpg";
import Navbar from "../componants/navbar";
import Footer from "../componants/footer";
import googleLogo from "../assets/images/svg/google.svg";
import fbLogo from "../assets/images/svg/facebook.svg";
import appleLogo from "../assets/images/svg/appleId.svg";
import linkedInLogo from "../assets/images/svg/linkedin.svg";
import { post } from "../apis/api"; // <-- Import post method

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmpass: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirmpass) {
      setError("All fields are required.");
      return;
    }
    if (form.password !== form.confirmpass) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      // Use post from api.js
      await post("/api/v1/jobseekers", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      // Redirect or show success
      window.location.href = "/login";
    } catch (err) {
      setError(err.message || "Signup failed.");
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar navClass="defaultscroll sticky" navLight={true} />
      <section
        className="bg-home d-flex align-items-center justify-content-center"
        style={{ backgroundImage: `url(${bg1})`, backgroundPosition: "center" }}
      >
        <div className="container-fluid px-0">
          <div className="row g-0 justify-content-center w-100">
            <div className="col-lg-4 col-md-5 col-12 p-0 d-flex justify-content-center">
              <div
                className="bg-white rounded-4 shadow p-4 w-100"
                style={{ maxWidth: 400 }}
              >
                <h5 className="text-center fw-bold mb-1 text-primary">
                  Sign up to EmployMe
                </h5>
                <p className="text-center mb-3" style={{ fontSize: 13 }}>
                  By continuing you indicate that you agree to EmployMe's{" "}
                  <a
                    href="#"
                    className="text-primary text-decoration-underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-primary text-decoration-underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
                {/* Social signup buttons */}
                <div className="d-flex justify-content-center gap-3 mb-4">
                  <button
                    className="btn btn-light shadow-sm d-flex align-items-center justify-content-center p-0"
                    style={{ borderRadius: "50%", width: 48, height: 48 }}
                  >
                    <img src={googleLogo} height={24} alt="Google" />
                  </button>
                  <button
                    className="btn btn-light shadow-sm d-flex align-items-center justify-content-center p-0"
                    style={{ borderRadius: "50%", width: 48, height: 48 }}
                  >
                    <img src={linkedInLogo} height={24} alt="LinkedIn" />
                  </button>
                  <button
                    className="btn btn-light shadow-sm d-flex align-items-center justify-content-center p-0"
                    style={{ borderRadius: "50%", width: 48, height: 48 }}
                  >
                    <img src={appleLogo} height={24} alt="Apple" />
                  </button>
                  <button
                    className="btn btn-light shadow-sm d-flex align-items-center justify-content-center p-0"
                    style={{ borderRadius: "50%", width: 48, height: 48 }}
                  >
                    <img src={fbLogo} height={24} alt="Facebook" />
                  </button>
                </div>
                {/* Divider */}
                <div className="d-flex align-items-center mb-3">
                  <div className="flex-1 border-bottom" />
                  <span className="mx-2 text-muted small">or</span>
                  <div className="flex-1 border-bottom" />
                </div>
                {/* Signup form */}
                <form className="w-100" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" htmlFor="name">
                      Name
                    </label>
                    <input
                      name="name"
                      id="name"
                      type="text"
                      className="form-control"
                      placeholder="Your name"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" htmlFor="email">
                      Email address
                    </label>
                    <input
                      name="email"
                      id="email"
                      type="email"
                      className="form-control"
                      placeholder="example@website.com"
                      autoComplete="username"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      className="form-label fw-semibold"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      className="form-label fw-semibold"
                      htmlFor="confirmpass"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmpass"
                      name="confirmpass"
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                      value={form.confirmpass}
                      onChange={handleChange}
                    />
                  </div>
                  {error && (
                    <div className="alert alert-danger py-2">{error}</div>
                  )}
                  <button
                    className="btn btn-primary w-100 fw-bold"
                    style={{ fontSize: 16 }}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Signing Up..." : "SIGN UP"}
                  </button>
                  <div className="text-center mt-3">
                    <span className="text-muted small">
                      Already have an account?{" "}
                      <Link to="/login" className="fw-semibold text-primary">
                        Sign In
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
    </div>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg1 from "../assets/images/hero/bg3.jpg";
import Navbar from "../componants/navbar";
import Footer from "../componants/footer";
import googleLogo from "../assets/images/svg/google.svg";
import fbLogo from "../assets/images/svg/facebook.svg";
import appleLogo from "../assets/images/svg/appleId.svg";
import linkedInLogo from "../assets/images/svg/linkedin.svg";
import { apiRequest } from "../apis/api";
import { useAuth } from "../apis/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await apiRequest("/api/v1/auth/login", {
        method: "POST",
        body: form,
      });

      localStorage.setItem("token", res.token);
      const token = localStorage.getItem("token");
      console.log(`Logged in with token: ${token}`);
      // Optionally store user info if needed
      localStorage.setItem("user", JSON.stringify(res.data.user));
      login(res.data.user);
      navigate("/"); // Redirect to home or dashboard
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar navClass="defaultscroll sticky " navLight={true} />
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
                  Sign in to EmployMe
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
                {/* Social login buttons in a single row */}
                <div className="d-flex justify-content-center gap-3 mb-4">
                  <button
                    className="btn btn-light shadow-sm d-flex align-items-center justify-content-center p-0"
                    style={{ borderRadius: "50%", width: 48, height: 48 }}
                    type="button"
                  >
                    <img src={googleLogo} height={24} alt="Google" />
                  </button>
                  <button
                    className="btn btn-light shadow-sm d-flex align-items-center justify-content-center p-0"
                    style={{ borderRadius: "50%", width: 48, height: 48 }}
                    type="button"
                  >
                    <img src={linkedInLogo} height={24} alt="LinkedIn" />
                  </button>
                  <button
                    className="btn btn-light shadow-sm d-flex align-items-center justify-content-center p-0"
                    style={{ borderRadius: "50%", width: 48, height: 48 }}
                    type="button"
                  >
                    <img src={appleLogo} height={24} alt="Apple" />
                  </button>
                  <button
                    className="btn btn-light shadow-sm d-flex align-items-center justify-content-center p-0"
                    style={{ borderRadius: "50%", width: 48, height: 48 }}
                    type="button"
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
                {/* Login form */}
                <form className="w-100" onSubmit={handleSubmit}>
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
                      required
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
                      name="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        style={{ marginTop: 2 }}
                      />
                      <label
                        className="form-check-label text-muted"
                        htmlFor="flexCheckDefault"
                        style={{ fontSize: 13 }}
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      to="/reset-password"
                      className="text-muted"
                      style={{ fontSize: 13 }}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  {error && (
                    <div
                      className="alert alert-danger py-2 mb-2"
                      role="alert"
                      style={{ fontSize: 14 }}
                    >
                      {error}
                    </div>
                  )}
                  <button
                    className="btn btn-primary w-100 fw-bold"
                    style={{ fontSize: 16 }}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "SIGN IN"}
                  </button>
                  <div className="text-center mt-3">
                    <span className="text-muted small">
                      Don’t have an account?{" "}
                      <Link to="/signup" className="fw-semibold text-primary">
                        Sign Up
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

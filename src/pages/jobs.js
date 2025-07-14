import { Link, useLocation, useNavigate } from "react-router-dom";
import { get, BASE_URL } from "../apis/api"; // adjust path if needed

import Navbar from "../componants/navbar";

import Footer from "../componants/footer";
import ScrollTop from "../componants/scrollTop";

import {
  FiClock,
  FiMapPin,
  FiBookmark,
  FiSearch,
  FiShare2,
} from "../assets/icons/vander";
import JobPost from "./job-post";
import JobApply from "./job-apply";
import PopularListing from "../componants/popularListing";
import SearchInput from "../componants/searchInput";
import { useState, useEffect } from "react";
import JobSearch from "../componants/JobSearch";
import { timeAgo } from "../utils/timeAgoUtil";

function useIsMediumScreen() {
  const [isMedium, setIsMedium] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handler = () => setIsMedium(window.innerWidth >= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return isMedium;
}

export default function Jobs() {
  const [showFilter, setshowFilter] = useState(false);
  const [jobData, setJobData] = useState([{}]);
  const [jobCategories, setJobCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(6);
  const [jobTitle, setJobTitle] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const isMediumScreen = useIsMediumScreen();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  // fetch job categories on component mount
  useEffect(() => {
    const jobCategoriesUrl = "/api/v1/job-categories?fields=name,id";
    get(jobCategoriesUrl)
      .then((response) => {
        setJobCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // feching countries on component mount
  useEffect(() => {
    const countriesUrl = "/api/location/countries";
    get(countriesUrl)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Get page from URL
  const currentPage = parseInt(query.get("page") || "1", 10);

  useEffect(() => {
    // Build API query string from URL params
    const params = [];
    if (query.get("title"))
      params.push(`title=${encodeURIComponent(query.get("title"))}`);
    if (query.get("city"))
      params.push(`city=${encodeURIComponent(query.get("city"))}`);
    if (query.get("type"))
      params.push(`type=${encodeURIComponent(query.get("type"))}`);
    if (query.get("jobCategory"))
      params.push(
        `jobCategory=${encodeURIComponent(query.get("jobCategory"))}`
      );
    params.push(`page=${currentPage}`);
    params.push(`limit=${limit}`);

    const apiUrl = `/api/v1/jobs${params.length ? "?" + params.join("&") : ""}`;

    // Fetch jobs
    get(apiUrl)
      .then((data) => {
        setJobData(data.data);
        setPage(data.page || 1);
        setTotal(data.total || 0);
        setLimit(data.limit || 10);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
      });
  }, [location.search, limit]);

  // Pagination handler
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(location.search);
    params.set("page", newPage);
    navigate({ search: params.toString() });
  };

  // Calculate total pages
  const totalPages = Math.ceil(total / limit);

  // Get the current selected category from the URL
  const selectedCategory = query.get("jobCategory") || "";
  const selectedCountry = query.get("country") || "";

  // Handler for category change
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    // Build new query params
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set("jobCategory", value);
    } else {
      params.delete("jobCategory");
    }
    navigate({ search: params.toString() });
  };

  const handleCountryChange = (e) => {
    const value = e.target.value;
    // Build new query params
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set("country", value);
    } else {
      params.delete("country");
    }
    navigate({ search: params.toString() });
  };

  // Handle search form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (jobTitle) {
      params.set("title", jobTitle);
    } else {
      params.delete("title");
    }
    if (locationValue) {
      params.set("city", locationValue);
    } else {
      params.delete("city");
    }
    params.set("page", 1); // Reset to first page on new search
    navigate({ search: params.toString() });
  };

  return (
    <>
      <Navbar navClass="defaultscroll sticky" navLight={true} />

      <div className="position-relative">
        <div className="shape overflow-hidden text-white">
          <svg
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <form onSubmit={handleSearchSubmit}>
            <div
              className="job-search-container"
              style={{
                display: "flex",
                flexWrap: "wrap", // Allow wrapping on smaller screens
                alignItems: "center",
                gap: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Job Title Input */}
              <div
                style={{
                  flex: "1",
                  minWidth: "250px", // Prevents it from getting too small
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #eee",
                  padding: "8px",
                  borderRadius: "4px",
                  background: "#fff",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: "8px" }}
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  id="jobTitleInput"
                  type="text"
                  placeholder="Job title, keywords, or company"
                  style={{
                    border: "none",
                    outline: "none",
                    width: "100%",
                    background: "transparent",
                  }}
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>

              {/* Location Input */}
              <div
                style={{
                  flex: "1",
                  minWidth: "250px",
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #eee",
                  padding: "8px",
                  borderRadius: "4px",
                  background: "#fff",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: "8px" }}
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <input
                  id="locationInput"
                  type="text"
                  placeholder='City, state, zip code, or "remote"'
                  style={{
                    border: "none",
                    outline: "none",
                    width: "100%",
                    background: "transparent",
                  }}
                  value={locationValue}
                  onChange={(e) => setLocationValue(e.target.value)}
                />
              </div>

              {/* Find Jobs Button */}
              <div className="d-none d-md-block text-end align-items-center">
                <button className="find-jobs-btn btn btn-primary" type="submit">
                  Find jobs
                </button>
              </div>
              <div
                className="d-flex justify-content-between align-items-center d-md-none"
                style={{ marginTop: "16px", width: "100%" }}
              >
                <button className="find-jobs-btn btn btn-primary" type="submit">
                  Find jobs
                </button>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setshowFilter(!showFilter)}
                  title={showFilter ? "Hide Filters" : "Show Filters"}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px",
                    width: "42px",
                    height: "44px",
                    backgroundColor: showFilter ? "#1976d2" : "#ffffff",
                  }}
                >
                  <img
                    src={require("../assets/images/icons_filter.png")}
                    alt="Filter"
                    style={{ width: "20px", height: "20px" }}
                    className="mt-1/2"
                  />
                </button>
              </div>
              <style>
                {`
          @media (min-width: 768px) {
            .job-search-container {
              flex-wrap: nowrap; /* Prevent wrapping on large screens */
            }
            .find-jobs-btn {
              width: auto;
            }
          }
        `}
              </style>
            </div>
          </form>
          <div className="row g-4 mt-2">
            <div className="col-lg-4 col-md-6 col-12">
              {showFilter || isMediumScreen ? (
                <div className="card bg-white p-4 rounded shadow sticky-bar">
                  {/* <div>
                    <h6 className="mb-0">Search Properties</h6>
                    <div className="search-bar mt-2">
                      <div id="itemSearch2" className="menu-search mb-0">
                        <form
                          role="search"
                          method="get"
                          id="searchItemform2"
                          className="searchform"
                        >
                          <input
                            type="text"
                            className="form-control rounded border"
                            name="s"
                            id="searchItem2"
                            placeholder="Search..."
                          />
                          <input
                            type="submit"
                            id="searchItemsubmit2"
                            value="Search"
                          />
                        </form>
                      </div>
                    </div>
                  </div> */}
                  <div className="mt-4">
                    <h6 className="mb-0">Categories</h6>
                    <select
                      className="form-select form-control border mt-2"
                      aria-label="Default select example"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                    >
                      <option value="">All Categories</option>
                      {jobCategories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-4">
                    <h6 className="mb-0">Country</h6>

                    <select
                      className="form-select form-control border mt-2"
                      aria-label="Default select example"
                      value={selectedCountry}
                      onChange={handleCountryChange}
                    >
                      <option value="">All Countries</option>
                      {countries.map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-4">
                    <h6>Job Types</h6>

                    <div className="d-flex justify-content-between mt-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="Full"
                        />
                        <label className="form-check-label" htmlFor="Full">
                          Full Time
                        </label>
                      </div>

                      <span className="badge bg-soft-primary rounded-pill">
                        3
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mt-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="Part"
                        />
                        <label className="form-check-label" htmlFor="Part">
                          Part Time
                        </label>
                      </div>

                      <span className="badge bg-soft-primary rounded-pill">
                        7
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mt-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="Freelancer"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="Freelancer"
                        >
                          Freelancing
                        </label>
                      </div>

                      <span className="badge bg-soft-primary rounded-pill">
                        4
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mt-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="Fixed"
                        />
                        <label className="form-check-label" htmlFor="Fixed">
                          Fixed Price
                        </label>
                      </div>

                      <span className="badge bg-soft-primary rounded-pill">
                        6
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mt-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="Remote"
                        />
                        <label className="form-check-label" htmlFor="Remote">
                          Remote
                        </label>
                      </div>

                      <span className="badge bg-soft-primary rounded-pill">
                        7
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mt-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="Hourly"
                        />
                        <label className="form-check-label" htmlFor="Hourly">
                          Hourly Basis
                        </label>
                      </div>

                      <span className="badge bg-soft-primary rounded-pill">
                        44
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h6 className="mb-0">Salary</h6>

                    <ul className="list-unstyled mt-2 mb-0">
                      <li className="mt-1">
                        <div className="custom-control custom-radio custom-control-inline">
                          <div className="form-check mb-0">
                            <input
                              className="form-check-input"
                              defaultChecked
                              type="radio"
                              name="flexRadioDefault"
                              id="rent"
                            />
                            <label className="form-check-label" htmlFor="rent">
                              10k - 15k
                            </label>
                          </div>
                        </div>
                      </li>

                      <li className="mt-1">
                        <div className="custom-control custom-radio custom-control-inline">
                          <div className="form-check mb-0">
                            <input
                              className="form-check-input"
                              defaultChecked
                              type="radio"
                              name="flexRadioDefault"
                              id="buy"
                            />
                            <label className="form-check-label" htmlFor="buy">
                              15k - 25k
                            </label>
                          </div>
                        </div>
                      </li>

                      <li className="mt-1">
                        <div className="custom-control custom-radio custom-control-inline">
                          <div className="form-check mb-0">
                            <input
                              className="form-check-input"
                              defaultChecked
                              type="radio"
                              name="flexRadioDefault"
                              id="sell"
                            />
                            <label className="form-check-label" htmlFor="sell">
                              more than 25K
                            </label>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div
                    className="mt-4"
                    style={{
                      backgroundColor: " #40189d",
                    }}
                  >
                    <Link to="" className="btn text-white w-100">
                      Apply Filter
                    </Link>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>

            <div className="col-lg-8 col-md-6 col-12">
              <div className="row g-4">
                {jobData.map((item, index) => {
                  return (
                    <div className="col-12" key={item.id}>
                      <div className="job-post job-post-list rounded shadow p-4 d-md-flex align-items-center justify-content-between position-relative">
                        <div className="d-flex align-items-center w-250px">
                          <img
                            src={
                              item.employer && item.employer.profilePhoto
                                ? `${BASE_URL}/${item.employer.profilePhoto}`
                                : "https://placehold.co/400"
                            }
                            className="avatar avatar-small rounded shadow p-3 bg-white"
                            alt="naik"
                          />

                          <div className="ms-3">
                            <Link
                              to={`/job-detail-one/${item.id}`}
                              className="h5 title text-dark"
                            >
                              {item.title}
                            </Link>
                          </div>
                        </div>

                        <div className="d-flex align-items-center justify-content-between d-md-block mt-3 mt-md-0 w-100px">
                          <span className="badge bg-soft-primary rounded-pill">
                            {item.type}
                          </span>
                          <span className="text-muted d-flex align-items-center fw-medium mt-md-2">
                            <FiClock className="fea icon-sm me-1 align-middle" />
                            {timeAgo(item.createdAt)}
                          </span>
                        </div>

                        <div className="d-flex align-items-center justify-content-between d-md-block mt-2 mt-md-0 w-130px">
                          <span className="text-muted d-flex align-items-center">
                            <FiMapPin className="fea icon-sm me-1 align-middle" />
                            {item.city}
                          </span>
                          <span className="d-flex fw-medium mt-md-2">
                            $950 - $1100/mo
                          </span>
                        </div>

                        <div className="mt-3 mt-md-0">
                          <Link
                            to="#"
                            className="btn btn-icon btn-sm btn-soft-primary me-2"
                            // className="btn btn-sm btn-icon btn-pills btn-soft-primary bookmark"
                          >
                            <FiShare2 className="icons" />
                          </Link>
                          <Link
                            to={`/job-detail-three`}
                            className="btn btn-sm btn-primary w-full ms-md-1"
                          >
                            Apply Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="row">
                <div className="col-12 mt-4 pt-2">
                  <ul className="pagination justify-content-center mb-0">
                    <li
                      className={`page-item${
                        currentPage === 1 ? " disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        aria-label="Previous"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <span aria-hidden="true">
                          <i className="mdi mdi-chevron-left fs-6"></i>
                        </span>
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, idx) => (
                      <li
                        key={idx + 1}
                        className={`page-item${
                          currentPage === idx + 1 ? " active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(idx + 1)}
                        >
                          {idx + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item${
                        currentPage === totalPages ? " disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        aria-label="Next"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <span aria-hidden="true">
                          <i className="mdi mdi-chevron-right fs-6"></i>
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PopularListing />
      <Footer top={true} />
      <ScrollTop />
    </>
  );
}

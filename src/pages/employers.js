import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { get, BASE_URL } from "../apis/api";

import Navbar from "../componants/navbar";
// import Faq from "../componants/faq";
import Footer from "../componants/footer";
import ScrollTop from "../componants/scrollTop";

import { jobData } from "../data/data";

import { FiMapPin } from "../assets/icons/vander";

export default function Employers() {
  const [employers, setEmployers] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);

  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  // Get page from URL
  const currentPage = parseInt(query.get("page") || "1", 10);

  // Calculate total pages
  const totalPages = Math.ceil(total / limit);

  // Pagination handler
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(location.search);
    params.set("page", newPage);
    navigate({ search: params.toString() });
  };

  useEffect(() => {
    const params = [];
    params.push(`page=${currentPage}`);
    params.push(`limit=${limit}`);
    const employersUrl =
      "/api/v1/employers?fields=name,about,profilePhoto,country,city&" +
      params.join("&");
    get(employersUrl)
      .then((response) => {
        // Adjust according to your API response structure
        setEmployers(response.data);
        console.log(response.data);
        setTotal(
          response.data.total ||
            (response.data.data ? response.data.data.length : 0)
        );
        setLimit(response.data.limit || limit);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [location.search, limit]);

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
          <div className="row g-4 gy-5">
            {employers.map((employer) => {
              return (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex"
                  key={employer.id}
                >
                  <div className="employer-card position-relative bg-white rounded shadow p-4 mt-3 w-100 h-100 d-flex flex-column">
                    <div className="employer-img d-flex justify-content-center align-items-center bg-white shadow-md rounded">
                      <img
                        src={
                          employer.profilePhoto
                            ? `${BASE_URL}/${employer.profilePhoto}`
                            : "https://placehold.co/400"
                        }
                        className="avatar avatar-ex-small"
                        alt=""
                      />
                    </div>
                    <div className="content mt-3 flex-grow-1">
                      <p className="text-muted mt-2 mb-0">
                        {employer.about || "No description available"}
                      </p>
                    </div>

                    <ul className="list-unstyled d-flex justify-content-between align-items-center border-top mt-3 pt-3 mb-0">
                      <li className="text-muted d-inline-flex align-items-center">
                        <FiMapPin className="fea icon-sm me-1 align-middle" />
                        {`${employer.city || "Unknown City"}, ${
                          employer.country || "Unknown Country"
                        }`}
                      </li>
                      <li className="list-inline-item text-primary fw-medium">
                        {45} Jobs
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* <div className="row">
            <div className="col-12 mt-4 pt-2">
              <ul className="pagination justify-content-center mb-0">
                <li
                  className={`page-item${currentPage === 1 ? " disabled" : ""}`}
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
          </div> */}
        </div>
        {/* <div className="container mt-100 mt-60">
          <Faq />
        </div> */}
      </section>
      <Footer top={true} />
      <ScrollTop />
    </>
  );
}

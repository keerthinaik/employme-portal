import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import logo1 from "../assets/images/company/lenovo-logo.png";
import Navbar from "../componants/navbar";
import Footer from "../componants/footer";
import ScrollTop from "../componants/scrollTop";

import { BASE_URL, get } from "../apis/api";

import {
  FiLayout,
  FiMapPin,
  FiUserCheck,
  FiClock,
  FiMonitor,
  FiBriefcase,
  FiBook,
  FiDollarSign,
  FiArrowRight,
  FiBookmark,
  FiArrowUpRight,
} from "../assets/icons/vander";
import { jobData } from "../data/data";
import { apiRequest } from "../apis/api";
import Profile from "./profile";

export default function JobDetail() {
  let params = useParams();
  let id = params.id;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get(`/api/v1/jobs/${id}`)
      .then((response) => {
        console.log("Job details fetched successfully:", response.data);
        setJob(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
      });
  });

  console.log("Job ID:", id);
  let data = jobData.find((job) => job.id === parseInt(id));

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <Navbar navClass="defaultscroll sticky" navLight={true} />
      <section className="bg-half d-table w-100">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="card border-0 shadow rounded p-4 sticky-bar">
                <img
                  src={
                    job?.employer?.profilePhoto
                      ? BASE_URL + "/" + job.employer.profilePhoto
                      : logo1
                  }
                  className="avatar avatar-medium p-4 rounded-pill shadow bg-white"
                  alt=""
                />

                <div className="mt-4">
                  <h4 className="title mb-3">{"skjdajsd"}</h4>
                  <p className="para-desc text-muted">
                    Search all the open positions on the web. Get your own
                    personalized salary estimate. Read reviews on over 30000+
                    companies worldwide.
                  </p>
                  <ul className="list-unstyled mb-0">
                    <li className="d-inline-flex align-items-center text-muted me-2">
                      <FiLayout className="fea icon-sm text-primary me-1" />
                      {job.employer.name}
                    </li>
                    <li className="d-inline-flex align-items-center text-muted">
                      <FiMapPin className="fea icon-sm text-primary me-1" />
                      {job.country + ", " + job.city}
                    </li>
                  </ul>
                </div>
                <div
                  className="mt-4 d-flex justify-content-end"
                  style={{
                    backgroundColor: " #40189d",
                  }}
                >
                  <Link to="/job-apply" className="btn text-white">
                    Apply Now <i className="mdi mdi-send"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-6">
              <div className="sidebar border-0">
                <h5 className="mb-0">Job Information:</h5>

                <ul className="list-unstyled mb-0 mt-4">
                  <li className="list-inline-item px-3 py-2 shadow rounded text-start m-1 bg-white">
                    <div className="d-flex widget align-items-center">
                      <FiUserCheck className="fea icon-ex-md me-3" />
                      <div className="flex-1">
                        <h6 className="widget-title mb-0">Employee Type:</h6>
                        <small className="text-primary mb-0">{job.type}</small>
                      </div>
                    </div>
                  </li>

                  <li className="list-inline-item px-3 py-2 shadow rounded text-start m-1 bg-white">
                    <div className="d-flex widget align-items-center">
                      <FiMapPin className="fea icon-ex-md me-3" />
                      <div className="flex-1">
                        <h6 className="widget-title mb-0">Location:</h6>
                        <small className="text-primary mb-0">
                          {job.country + ", " + job.city}
                        </small>
                      </div>
                    </div>
                  </li>

                  <li className="list-inline-item px-3 py-2 shadow rounded text-start m-1 bg-white">
                    <div className="d-flex widget align-items-center">
                      <FiClock className="fea icon-ex-md me-3" />
                      <div className="flex-1">
                        <h6 className="widget-title mb-0">Date posted:</h6>
                        <small className="text-primary mb-0 mb-0">
                          {new Date(job.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  </li>

                  <li className="list-inline-item px-3 py-2 shadow rounded text-start m-1 bg-white">
                    <div className="d-flex widget align-items-center">
                      <FiMonitor className="fea icon-ex-md me-3" />
                      <div className="flex-1">
                        <h6 className="widget-title mb-0">Job Type:</h6>
                        <small className="text-primary mb-0">
                          {job.jobCategory.name}
                        </small>
                      </div>
                    </div>
                  </li>

                  {/* <li className="list-inline-item px-3 py-2 shadow rounded text-start m-1 bg-white">
                    <div className="d-flex widget align-items-center">
                      <FiBriefcase className="fea icon-ex-md me-3" />
                      <div className="flex-1">
                        <h6 className="widget-title mb-0">Experience:</h6>
                        <small className="text-primary mb-0">+2 Year</small>
                      </div>
                    </div>
                  </li>

                  <li className="list-inline-item px-3 py-2 shadow rounded text-start m-1 bg-white">
                    <div className="d-flex widget align-items-center">
                      <FiBook className="fea icon-ex-md me-3" />
                      <div className="flex-1">
                        <h6 className="widget-title mb-0">Qualifications:</h6>
                        <small className="text-primary mb-0">MSCIT</small>
                      </div>
                    </div>
                  </li> */}

                  <li className="list-inline-item px-3 py-2 shadow rounded text-start m-1 bg-white">
                    <div className="d-flex widget align-items-center">
                      <FiDollarSign className="fea icon-ex-md me-3" />
                      <div className="flex-1">
                        <h6 className="widget-title mb-0">Salary:</h6>
                        <small className="text-primary mb-0">
                          {job.ctcMinAmount} to {job.ctcMaxAmount}{" "}
                          {job.ctcCurrency}
                        </small>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <h5>Job Description: </h5>
                <p className="text-muted">{job.description}</p>

                <h5 className="mt-4">Responsibilities and Duties: </h5>
                <p className="text-muted">
                  It sometimes makes sense to select texts containing the
                  various letters and symbols specific to the output language.
                </p>
                <ul className="list-unstyled">
                  <li className="text-muted mt-2">
                    <FiArrowRight className="fea icon-sm text-primary me-2" />
                    Participate in requirements analysis
                  </li>
                  <li className="text-muted mt-2">
                    <FiArrowRight className="fea icon-sm text-primary me-2" />
                    Write clean, scalable code using C# and .NET frameworks
                  </li>
                  <li className="text-muted mt-2">
                    <FiArrowRight className="fea icon-sm text-primary me-2" />
                    Test and deploy applications and systems
                  </li>
                  <li className="text-muted mt-2">
                    <FiArrowRight className="fea icon-sm text-primary me-2" />
                    Revise, update, refactor and debug code
                  </li>
                  <li className="text-muted mt-2">
                    <FiArrowRight className="fea icon-sm text-primary me-2" />
                    Improve existing software
                  </li>
                  <li className="text-muted mt-2">
                    <FiArrowRight className="fea icon-sm text-primary me-2" />
                    Develop documentation throughout the software development
                    life cycle (SDLC)
                  </li>
                  <li className="text-muted mt-2">
                    <FiArrowRight className="fea icon-sm text-primary me-2" />
                    Serve as an expert on applications and provide technical
                    support
                  </li>
                </ul>

                <h5 className="mt-4">
                  Required Experience, Skills and Qualifications:{" "}
                </h5>
                <p className="text-muted">
                  It sometimes makes sense to select texts containing the
                  various letters and symbols specific to the output language.
                </p>
                <ul className="list-unstyled">
                  <li className="text-muted mt-2">
                    <FiArrowRight className="fea icon-sm text-primary me-2" />
                    Proven experience as a .NET Developer or Application
                    Developer
                  </li>
                  <li className="text-muted mt-2">
                    <FiArrowRight className="fea icon-sm text-primary me-2" />
                    good understanding of SQL and Relational Databases,
                    specifically Microsoft SQL Server.
                  </li>
                  <li className="text-muted mt-2">
                    <FiArrowRight className="fea icon-sm text-primary me-2" />
                    Experience designing, developing and creating RESTful web
                    services and APIs
                  </li>
                  <li className="text-muted mt-2">
                    <FiArrowRight className="fea icon-sm text-primary me-2" />
                    Basic know how of Agile process and practices
                  </li>
                  <li className="text-muted mt-2">
                    <FiArrowRight className="fea icon-sm text-primary me-2" />
                    Good understanding of object-oriented programming.
                  </li>
                  <li className="text-muted mt-2">
                    <FiArrowRight className="fea icon-sm text-primary me-2" />
                    Good understanding of concurrent programming.
                  </li>
                  <li className="text-muted mt-2">
                    <FiArrowRight className="fea icon-sm text-primary me-2" />
                    Sound knowledge of application architecture and design.
                  </li>
                  <li className="text-muted mt-2">
                    <FiArrowRight className="fea icon-sm text-primary me-2" />
                    Excellent problem solving and analytical skills
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <div className="row justify-content-center mb-4 pb-2">
            <div className="col-12">
              <div className="section-title text-center">
                <h4 className="title mb-3">Related Vacancies</h4>
                <p className="text-muted para-desc mx-auto mb-0">
                  Search all the open positions on the web. Get your own
                  personalized salary estimate. Read reviews on over 30000+
                  companies worldwide.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {jobData.slice(0, 3).map((item, index) => {
              return (
                <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2" key={index}>
                  <div className="job-post job-type-three rounded shadow bg-white p-4">
                    <div className="d-flex justify-content-between">
                      <div>
                        <img
                          src={item.image}
                          className="avatar avatar-small rounded shadow p-3 bg-white"
                          alt=""
                        />
                        <Link
                          to="/employer-profile"
                          className="h5 company text-dark d-block mt-2"
                        >
                          {item.name}
                        </Link>
                      </div>

                      <ul className="list-unstyled align-items-center mb-0">
                        <li className="list-inline-item">
                          <Link
                            to=""
                            className="btn btn-icon btn-sm btn-soft-primary"
                          >
                            <FiArrowUpRight className="icons" />
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-2">
                      <Link
                        to="job-detail-three"
                        className="text-dark title h5"
                      >
                        {item.title}
                      </Link>
                      <p className="text-muted mt-2">{item.desc}</p>

                      <ul className="list-unstyled mb-0">
                        <li className="d-inline-block me-1">
                          <Link to="" className="badge bg-primary">
                            {item.jobTime}
                          </Link>
                        </li>
                        <li className="d-inline-block me-1">
                          <Link to="" className="badge bg-primary">
                            $4,000 - $4,500
                          </Link>
                        </li>
                        <li className="d-inline-block me-1">
                          <Link to="" className="badge bg-primary">
                            <i className="mdi mdi-map-marker me-1"></i>
                            {item.country}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer top={true} />
      <ScrollTop />
    </>
  );
}

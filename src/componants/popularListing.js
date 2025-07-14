import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jobData } from "../constants";
import {
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiArrowUpRight,
} from "../assets/icons/vander";

const PopularListing = () => {
  return (
    <>
      <div className="container mb-60">
        <div className="row justify-content-center mb-4 pb-2">
          <div className="col-12">
            <div className="section-title text-center">
              <h4 className="title mb-3">Popular Job Listing</h4>
              <p className="text-muted para-desc mx-auto mb-0">
                Search all the open positions on the web. Get your own
                personalized salary estimate. Read reviews on over 30000+
                companies worldwide.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-0">
          {jobData.slice(0, 6).map((item, index) => {
            return (
              <div className="col-lg-4 col-md-6 col-12" key={index}>
                <div className="job-post rounded shadow bg-white">
                  <div className="p-4">
                    <div className="d-flex justify-content-between">
                      <Link
                        to={`/job-detail-two/${item.id}`}
                        className="text-dark title h5"
                      >
                        {item.title}
                      </Link>
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
                    <p className="text-muted d-flex align-items-center small">
                      <FiClock className="fea icon-sm text-primary me-1" />
                      Posted {item.posted} Days ago
                    </p>

                    <ul className="list-unstyled d-flex justify-content-between align-items-center mb-0 mt-3">
                      <li className="list-inline-item">
                        <span className="badge bg-soft-primary">
                          {item.jobTime}
                        </span>
                      </li>
                      <li className="list-inline-item">
                        <span className="text-muted d-flex align-items-center small">
                          <FiDollarSign className="fea icon-sm text-primary me-1" />
                          {item.salary}/mo
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="d-flex align-items-center p-4 border-top">
                    <img
                      src={item.image}
                      className="avatar avatar-small rounded shadow p-3 bg-white"
                      alt=""
                    />

                    <div className="ms-3">
                      <Link
                        to="/employer-profile"
                        className="h5 company text-dark"
                      >
                        {item.name}
                      </Link>
                      <span className="text-muted d-flex align-items-center mt-1">
                        <FiMapPin className="fea icon-sm me-1" />
                        {item.country}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PopularListing;

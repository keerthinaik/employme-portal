import React, { useState } from "react";
import { Link } from "react-router-dom";

import about1 from "../assets/images/team/brainstorm-meeting.jpg";

export default function ExploreInternships({ containerClass }) {
  let [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className={containerClass}>
        <div className="row align-items-start">
          <div className="col-lg-7 col-md-7">
            <div className="position-relative shadow rounded">
              <img src={about1} className="img-fluid rounded m-0" alt="" />
            </div>
          </div>

          <div className="col-lg-5 col-md-5">
            <div className="section-title ms-lg-5 justify-content-start d-flex flex-column container-fluid">
              <h3
                className="para-desc mb-0 fw-bold "
                style={{ color: "#40189d" }}
              >
                EmployMe a new way to find your path
              </h3>
              <h4 className="title mb-3">1000+ Openings for Jobs.</h4>

              <h5 className="text-justify">
                Discover countless opportunities with EmployMe, a platform
                designed to help you navigate through the vast world of job
                openings.
              </h5>
              <h5 className=" text-justify">
                Take charge of your future and discover exciting career
                possibilities today!
              </h5>
              <div className="mt-4 d-sm-block d-flex justify-content-center">
                <Link to="/job-list-Two" className="btn btn-primary me-1 my-1">
                  Explore Internships
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

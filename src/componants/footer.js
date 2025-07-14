import React from "react";
import { Link } from "react-router-dom";
import xIcon from "../assets/images/svg/x.svg";
import logo from "../assets/images/logo-light.png";

import {
  FiShoppingCart,
  FiDribbble,
  FiLinkedin,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiBookmark,
  FiX,
} from "../assets/icons/vander";
import CountryListComponent from "./countryListComponent";
import QuickLinksComponent from "./quickLinksComponent";
import PrivacyFixedBottom from "./privacy_fixed_bottom";

export default function Footer({ top }) {
  return (
    <footer className="bg-footer">
      {/* {top === true ? (
        <div className="container">
          <div className="row align-items-end">
            <div className="col-md-7">
              <div className="section-title">
                <div className="d-flex align-items-center">
                  <FiBookmark className="fea icon-lg" />
                  <div className="flex-1 ms-3">
                    <h4 className="fw-bold text-white mb-2">
                      Explore a job now!
                    </h4>
                    <p className="text-white-50 mb-0">
                      Search all the open positions on the web. Get your own
                      personalized salary estimate. Read reviews on over 30000+
                      companies worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-5 mt-4 mt-sm-0">
              <div className="text-md-end ms-5 ms-sm-0">
                <Link to="/job-apply" className="btn btn-primary me-1 my-1">
                  Apply Now
                </Link>
                <Link to="/contactus" className="btn btn-soft-primary my-1">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )} */}

      <div className="footer-bar">
        <CountryListComponent />
        <div className="container text-center">
          <div className="row align-items-center d-flex justify-content-between">
            <div className="col-sm-4 mb-4">
              <div className="text-sm-start">
                <p className="mb-0 fw-medium text-white">
                  © {new Date().getFullYear()} EmployMe. All Rights Reserved.
                </p>
              </div>
            </div>
            <div className="col-sm-5 mb-4">
              <div className="text-sm-start ">
                <ul className="footer-list terms-service d-flex justify-content-evenly w-100 mb-0 list-unstyled">
                  <li className="list-inline-item my-2">
                    <Link
                      to="/"
                      className="text-foot text-white fs-6 fw-medium me-2"
                    >
                      About Us
                    </Link>
                  </li>
                  <li
                    className="list-inline-item my-2"
                    style={{ paddingLeft: "12px" }}
                  >
                    <Link
                      to="/privacy"
                      className="text-foot text-white fs-6 fw-medium me-2"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="list-inline-item my-2">
                    <Link
                      to="/terms"
                      className="text-foot text-white fs-6 fw-medium me-2"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-3 mt-4 mt-sm-0 pt-2 pt-sm-0 mb-4">
              <ul className="text-white social-icon foot-social-icon text-sm-end mb-0">
                <li className="list-inline-item">
                  <Link to="/" target="_self" className="rounded">
                    <FiLinkedin className="fea icon-sm align-middle text-white" />
                  </Link>
                </li>
                <li className="list-inline-item ">
                  <Link to="/" target="_self" className="rounded">
                    <FiFacebook className="fea icon-sm align-middle text-white" />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/" target="_self" className="rounded">
                    <FiInstagram className="fea icon-sm align-middle text-white" />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/" target="_self" className="rounded">
                    <FiX className="fea icon-sm align-middle text-white" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <PrivacyFixedBottom /> */}
      </div>
    </footer>
  );
}

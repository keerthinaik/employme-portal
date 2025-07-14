import React from "react";
import heroImg from "../assets/images/hero/bg.jpg";
import Navbar from "../componants/navbar";
import FormSelect from "../componants/formSelect";
import Footer from "../componants/footer";
import ScrollTop from "../componants/scrollTop";
import CandidateProfile from "./candidate-profile";
import AboutTwo from "../componants/aboutTwo";
import PopularCountriesComponent from "../componants/popularCountriesComponent";
import ExploreInternships from "../componants/exploreInternships";
import AppDownload from "../componants/appDownload";

export default function Index() {
  return (
    <>
      <Navbar navClass="defaultscroll sticky" navLight={true} />
      <section
        className="bg-half-140 d-table w-100"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="bg-overlay bg-primary-gradient-overlay"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="title-heading text-center">
                <h1 className="heading text-white fw-bold">
                  Find & Hire Experts <br /> for any Job
                </h1>
                <p className="para-desc text-white-50 mx-auto mb-0">
                  Find Jobs, Employment & Career Opportunities. Some of the
                  companies we've helped recruit excellent applicants over the
                  years.
                </p>

                <div className="d-md-flex justify-content-between align-items-center bg-white shadow rounded p-2 mt-4">
                  <FormSelect />
                </div>

                <div className="mt-2">
                  <span className="text-white-50">
                    <span className="text-white">Popular Searches :</span>{" "}
                    Designer, Developer, Web, IOS, PHP Senior Engineer
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-40">
            <PopularCountriesComponent />
          </div>
        </div>
      </section>
      <div className="mt-60 mb-40">
        <ExploreInternships containerClass="container" />
      </div>
      <AboutTwo />
      <AppDownload />
      <Footer />
      <ScrollTop />
    </>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";

import bg1 from "../assets/images/hero/bg.jpg";
import Navbar from "../componants/navbar";
import { accordionData } from "../data/data";
import Footer from "../componants/footer";

import { FiArrowRight } from "../assets/icons/vander";
import ScrollTop from "../componants/scrollTop";

export default function Terms() {
  let [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <Navbar navClass="defaultscroll sticky" navLight={true} />

      <section
        className="bg-half-170 d-table w-100"
        style={{ backgroundImage: `url(${bg1})`, backgroundPosition: "top" }}
      >
        <div className="bg-overlay bg-gradient-overlay"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  Terms of Services
                </h5>
              </div>
            </div>
          </div>

          <div className="position-middle-bottom">
            <nav aria-label="breadcrumb" className="d-block">
              <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                <li className="breadcrumb-item">
                  <Link to="/">EmployMe</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  T&C
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
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
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="card shadow border-0 rounded">
                <div className="card-body">
                  <h5 className="card-title">Introduction :</h5>
                  <p className="text-muted">
                    It seems that only fragments of the original text remain in
                    the Lorem Ipsum texts used today. One may speculate that
                    over the course of time certain letters were added or
                    deleted at various positions within the text.
                  </p>

                  <h5 className="card-title">User Agreements :</h5>
                  <p className="text-muted">
                    The most well-known dummy text is the 'Lorem Ipsum', which
                    is said to have <b className="text-danger">originated</b> in
                    the 16th century. Lorem Ipsum is{" "}
                    <b className="text-danger">composed</b> in a pseudo-Latin
                    language which more or less{" "}
                    <b className="text-danger">corresponds</b> to 'proper'
                    Latin. It contains a series of real Latin words. This
                    ancient dummy text is also{" "}
                    <b className="text-danger">incomprehensible</b>, but it
                    imitates the rhythm of most European languages in Latin
                    script. The <b className="text-danger">advantage</b> of its
                    Latin origin and the relative{" "}
                    <b className="text-danger">meaninglessness</b> of Lorum
                    Ipsum is that the text does not attract attention to itself
                    or distract the viewer's{" "}
                    <b className="text-danger">attention</b> from the layout.
                  </p>
                  <p className="text-muted">
                    There is now an <b className="text-danger">abundance</b> of
                    readable dummy texts. These are usually used when a text is{" "}
                    <b className="text-danger">required purely</b> to fill a
                    space. These alternatives to the classic Lorem Ipsum texts
                    are often amusing and tell short, funny or{" "}
                    <b className="text-danger">nonsensical</b> stories.
                  </p>
                  <p className="text-muted">
                    It seems that only <b className="text-danger">fragments</b>{" "}
                    of the original text remain in the Lorem Ipsum texts used
                    today. One may speculate that over the course of time
                    certain letters were added or deleted at various positions
                    within the text.
                  </p>

                  <h5 className="card-title">Restrictions :</h5>
                  <p className="text-muted">
                    You are specifically restricted from all of the following :
                  </p>
                  <ul className="list-unstyled text-muted">
                    <li className="mt-2">
                      <FiArrowRight className="fea icon-sm me-2" />
                      Digital Marketing Solutions for Tomorrow
                    </li>
                    <li className="mt-2">
                      <FiArrowRight className="fea icon-sm me-2" />
                      Our Talented & Experienced Marketing Agency
                    </li>
                    <li className="mt-2">
                      <FiArrowRight className="fea icon-sm me-2" />
                      Create your own skin to match your brand
                    </li>
                    <li className="mt-2">
                      <FiArrowRight className="fea icon-sm me-2" />
                      Digital Marketing Solutions for Tomorrow
                    </li>
                    <li className="mt-2">
                      <FiArrowRight className="fea icon-sm me-2" />
                      Our Talented & Experienced Marketing Agency
                    </li>
                    <li className="mt-2">
                      <FiArrowRight className="fea icon-sm me-2" />
                      Create your own skin to match your brand
                    </li>
                  </ul>

                  <h5 className="card-title">Users Question & Answer :</h5>

                  <div className="accordion mt-4 pt-2" id="buyingquestion">
                    {accordionData.map((item, index) => {
                      return (
                        <div
                          className="accordion-item rounded mt-2"
                          key={index}
                        >
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className={`${
                                activeIndex === index ? "" : "collapsed"
                              } accordion-button border-0 bg-light`}
                              onClick={() => setActiveIndex(index)}
                            >
                              {item.title}
                            </button>
                          </h2>
                          <div
                            id="collapseOne"
                            className={`${
                              activeIndex === index ? "show" : ""
                            } accordion-collapse border-0 collapse`}
                          >
                            <div className="accordion-body text-muted">
                              There are many variations of passages of Lorem
                              Ipsum available, but the majority have suffered
                              alteration in some form.
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3">
                    <Link to="" className="btn btn-primary mt-2 me-2">
                      Accept
                    </Link>
                    <Link to="" className="btn btn-outline-primary mt-2">
                      Decline
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <ScrollTop />
    </>
  );
}

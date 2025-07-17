import React from "react";
import Navbar from "../componants/navbar";
import Footer from "../componants/footer";
import ScrollTop from "../componants/scrollTop";

const sampleJob = {
  title: "Senior Software Engineer",
  description: "We are looking for a highly skilled engineer to join our team.",
  category: "Software Development",
  employer: "Tech Corp",
  openings: 3,
  skills: ["React", "Node.js", "MongoDB"],
  languages: ["English", "Hindi"],
  benefits: ["Health Insurance", "Paid Leave"],
  minExperience: 3,
  maxExperience: 7,
  workModes: ["remote", "hybrid"],
  otherWorkMode: "",
  shiftType: "morning",
  otherShiftType: "",
  payrollType: "direct",
  contractDuration: 12,
  contractDurationUnit: "months",
  minHours: 30,
  maxHours: 40,
  startDate: "2025-08-01",
  currency: "USD",
  ctcMin: 70000,
  ctcMax: 90000,
  ctcFrequency: "yearly",
  supplementalPayments: ["bonus", "commission"],
  otherSupplemental: "",
  country: "US",
  state: "CA",
  city: "San Francisco",
  zip: "94107",
  address: "123 Tech Street, SF, CA",
  isActive: true,
  postingDate: "2025-07-10",
  createdAt: "2025-07-01",
  updatedAt: "2025-07-12",
  questions: [
    {
      question: "Do you have experience with React?",
      type: "boolean",
      options: [],
    },
    {
      question: "Which frameworks have you used?",
      type: "multi-choice",
      options: ["React", "Angular", "Vue"],
    },
  ],
};

export default function JobDetail() {
  const job = sampleJob;

  const formatArray = (arr) => (arr && arr.length ? arr.join(", ") : "-");

  return (
    <>
      <Navbar navClass="defaultscroll sticky" navLight={true} />
      <section className="section bg-light">
        <div className="container">
          <div className="card shadow p-4">
            <h3 className="mb-4 border-bottom pb-2">Job Details</h3>

            <div className="mb-4">
              <h5>General Information</h5>
              <p>
                <strong>Title:</strong> {job.title}
              </p>
              <p>
                <strong>Description:</strong> {job.description}
              </p>
              <p>
                <strong>Category:</strong> {job.category}
              </p>
              <p>
                <strong>Employer:</strong> {job.employer}
              </p>
              <p>
                <strong>Openings:</strong> {job.openings}
              </p>
            </div>

            <div className="mb-4">
              <h5>Skills & Requirements</h5>
              <p>
                <strong>Skills:</strong> {formatArray(job.skills)}
              </p>
              <p>
                <strong>Languages:</strong> {formatArray(job.languages)}
              </p>
              <p>
                <strong>Benefits:</strong> {formatArray(job.benefits)}
              </p>
              <p>
                <strong>Experience:</strong> {job.minExperience} -{" "}
                {job.maxExperience} years
              </p>
            </div>

            <div className="mb-4">
              <h5>Work & Contract Info</h5>
              <p>
                <strong>Work Modes:</strong> {formatArray(job.workModes)}
              </p>
              <p>
                <strong>Shift Type:</strong> {job.shiftType}
              </p>
              <p>
                <strong>Payroll Type:</strong> {job.payrollType}
              </p>
              <p>
                <strong>Contract Duration:</strong> {job.contractDuration}{" "}
                {job.contractDurationUnit}
              </p>
              <p>
                <strong>Hours/Week:</strong> {job.minHours} - {job.maxHours}
              </p>
              <p>
                <strong>Start Date:</strong> {job.startDate}
              </p>
            </div>

            <div className="mb-4">
              <h5>Salary & Compensation</h5>
              <p>
                <strong>CTC:</strong> {job.currency} {job.ctcMin} - {job.ctcMax}{" "}
                / {job.ctcFrequency}
              </p>
              <p>
                <strong>Supplemental Payments:</strong>{" "}
                {formatArray(job.supplementalPayments)}
              </p>
            </div>

            <div className="mb-4">
              <h5>Location</h5>
              <p>
                <strong>Country:</strong> {job.country}
              </p>
              <p>
                <strong>State:</strong> {job.state}
              </p>
              <p>
                <strong>City:</strong> {job.city}
              </p>
              <p>
                <strong>Zip Code:</strong> {job.zip}
              </p>
              <p>
                <strong>Address:</strong> {job.address}
              </p>
            </div>

            <div className="mb-4">
              <h5>Status & Dates</h5>
              <p>
                <strong>Is Active:</strong> {job.isActive ? "Yes" : "No"}
              </p>
              <p>
                <strong>Posting Date:</strong> {job.postingDate}
              </p>
              <p>
                <strong>Created At:</strong> {job.createdAt}
              </p>
              <p>
                <strong>Updated At:</strong> {job.updatedAt}
              </p>
            </div>

            <div className="mb-4">
              <h5>Screening Questions</h5>
              {job.questions.map((q, i) => (
                <div key={i} className="mb-3">
                  <p>
                    <strong>Q{i + 1}:</strong> {q.question}
                  </p>
                  <p>
                    <strong>Type:</strong> {q.type}
                  </p>
                  {q.options.length > 0 && (
                    <p>
                      <strong>Options:</strong> {formatArray(q.options)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer top={true} />
      <ScrollTop />
    </>
  );
}

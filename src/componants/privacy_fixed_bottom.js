import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./../assets/scss/_privacy_fixed_bottom.scss";

const PrivacyFixedBottom = () => {
  return (
    <div className="container-fluid">
      <div className="fixed-bottom bg-dark text-white px-4 py-2 w-100">
        <h5>We value your privacy</h5>
        <p className="mb-2 privacy-text">
          This site collects your data in order to improve your experience in
          the form of cookies. We use this data to provide social media
          features, personalize content and analyze our traffic. By clicking
          "Accept" below you consent to the use of this technology.
        </p>

        <div className="d-flex flex-row justify-content-start justify-content-md-center gap-2">
          <button className="btn btn-primary privacy-button">Accept All</button>
          <button className="btn btn-danger privacy-button">Reject All</button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyFixedBottom;

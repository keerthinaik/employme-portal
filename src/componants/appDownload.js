import React from "react";
import googlePlay from "../assets/images/appDownload/GooglePlay-removebg-preview.png";
import appleStore from "../assets/images/appDownload/apple.png";
import qrCode from "../assets/images/appDownload/qr.png";
import right from "../assets/images/appDownload/right.png";

const AppDownload = () => {
  return (
    <div className="container py-4 ">
      <div className="row align-items-center bg-white p-4 rounded shadow-sm">
        <div className="col-md-6">
          <h3 className="fw-bold">Available for both Android and iOS apps</h3>

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="d-flex flex-column align-items-center mb-3 mb-md-0">
              <img
                src={googlePlay}
                alt="Google Play"
                width="200"
                height="100"
                className="mb-2"
              />
              <img src={appleStore} alt="App Store" width="175" height="70" />
            </div>

            <div className="d-none d-md-flex flex-column align-items-center px-5">
              <img src={qrCode} alt="QR Code" height="100" className="mb-2" />
              <span>Scan to download</span>
            </div>
          </div>
        </div>
        <div
          className="
        col-md-6 ps-5 text-center"
        >
          <img src={right} alt="Mobile UI" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default AppDownload;

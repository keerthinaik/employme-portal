import React, { useEffect, useState } from "react";
import { jobRegions } from "../constants";
import { Link } from "react-router-dom";

const CountryListComponent = () => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    setRegions(jobRegions);
  }, []);

  return (
    <div className="container mt-2 mx-auto w-auto">
      <div className="row">
        {regions.map((regionData, index) => (
          <div
            key={index}
            className="col-md-2 col-sm-4 d-flex flex-column p-3 "
          >
            <h4
              className="text-white"
              style={{
                borderBottom: "2px solid",
                borderRadius: "5px",
                paddingLeft: "2px",
              }}
            >
              {regionData.region}
            </h4>
            <ul className="text-white align-items-start d-flex flex-column">
              {regionData.countries.map((country, idx) => (
                <li key={idx} className="mt-2">
                  <Link to="/job-list-Two" className="fw-medium link" style={{ color: 'white' }}>
                  {country}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryListComponent;

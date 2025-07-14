import React, { useEffect, useState } from "react";
import { popularCountries } from "../constants";
import { Link } from "react-router-dom";

const PopularCountriesComponent = () => {
  const [popularCountry, setPopularCountry] = useState([]);

  useEffect(() => {
    setPopularCountry(popularCountries.popularCountryList);
  }, []);

  return (
    <>
      <h1
        className="heading title-heading text-white fw-bold text-center"
        style={{ lineHeight: "1.3" }}
      >
        Popular Countries
      </h1>
      <div className="row row-cols-lg-6 row-cols-md-3 row-cols-sm-2 row-cols-1 g-4 mt-4">
        {popularCountry.map((item, index) => (
          <div className="col" key={index}>
            <div className="job-category job-category-two rounded shadow bg-light p-3">
            <h5 className="mb-1">{item.country}</h5>
              <p className="text-muted para mb-2">{item.jobs} Jobs</p>
              <Link to="/job-list-Two" className="text-primary fw-medium link">
                Explore Jobs <i className="mdi mdi-arrow-right"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularCountriesComponent;

import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FiBriefcase, FiMapPin, FiSearch } from "../assets/icons/vander";
import { useNavigate } from "react-router-dom";
import { get } from "../apis/api";

export default function FormSelect() {
  const [locationOptions, setLocationOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await get("/api/location/countries");
        if (res.status === "success" && Array.isArray(res.data)) {
          setLocationOptions(
            res.data.map((country) => ({
              value: country.isoCode,
              label: country.name,
            }))
          );
        }
      } catch (err) {
        setLocationOptions([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  let type = [
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" },
    { value: "Freelancer", label: "Freelancer" },
    { value: "Remote Work", label: "Remote Work" },
    { value: "Office Work", label: "Office Work" },
  ];

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.append("title", keyword);
    if (selectedCountry) params.append("country", selectedCountry.value);
    if (selectedType) params.append("type", selectedType.value);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <>
      <form className="card-body text-start" onSubmit={handleSubmit}>
        <div className="registration-form text-dark text-start">
          <div className="row g-lg-0">
            <div className="col-lg-3 col-md-6 col-12">
              <div className="mb-3 mb-sm-0">
                <label className="form-label d-none fs-6">Search :</label>
                <div className="filter-search-form position-relative filter-border">
                  <FiSearch className="fea icon-20 icons" />
                  <input
                    name="name"
                    type="text"
                    id="job-keyword"
                    className="form-control filter-input-box bg-light border-0"
                    placeholder="Search your keywords"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12">
              <div className="mb-3 mb-sm-0">
                <label className="form-label d-none fs-6">Location:</label>
                <div className="filter-search-form position-relative filter-border">
                  <FiMapPin className="fea icon-20 icons" />
                  <Select
                    options={locationOptions}
                    isLoading={loading}
                    placeholder="Select country"
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12">
              <div className="mb-3 mb-sm-0">
                <label className="form-label d-none fs-6">Type :</label>
                <div className="filter-search-form relative filter-border">
                  <FiBriefcase className="fea icon-20 icons" />
                  <Select
                    options={type}
                    value={selectedType}
                    onChange={setSelectedType}
                    placeholder="Select type"
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12">
              <button
                type="submit"
                id="search"
                name="search"
                style={{
                  height: "60px",
                  backgroundColor: " #40189d",
                  color: "white",
                }}
                className="btn searchbtn w-100"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

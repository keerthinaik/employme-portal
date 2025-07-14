import React from "react";

const JobSearch = () => {
  return (
    <div
      className="job-search-container"
      style={{
        display: "flex",
        flexWrap: "wrap", // Allow wrapping on smaller screens
        alignItems: "center",
        gap: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Job Title Input */}
      <div
        style={{
          flex: "1",
          minWidth: "250px", // Prevents it from getting too small
          display: "flex",
          alignItems: "center",
          border: "1px solid #eee",
          padding: "8px",
          borderRadius: "4px",
          background: "#fff",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginRight: "8px" }}
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Job title, keywords, or company"
          style={{
            border: "none",
            outline: "none",
            width: "100%",
            background: "transparent",
          }}
        />
      </div>

      {/* Location Input */}
      <div
        style={{
          flex: "1",
          minWidth: "250px",
          display: "flex",
          alignItems: "center",
          border: "1px solid #eee",
          padding: "8px",
          borderRadius: "4px",
          background: "#fff",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginRight: "8px" }}
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <input
          type="text"
          placeholder='City, state, zip code, or "remote"'
          style={{
            border: "none",
            outline: "none",
            width: "100%",
            background: "transparent",
          }}
        />
      </div>

      {/* Find Jobs Button */}
      <button
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
          textAlign: "center",
          flexShrink: 0, // Prevents shrinking
          minWidth: "140px", // Ensures button stays on one line
        }}
        className="find-jobs-btn"
      >
        Find jobs
      </button>

      <style>
        {`
          @media (min-width: 768px) {
            .job-search-container {
              flex-wrap: nowrap; /* Prevent wrapping on large screens */
            }
            .find-jobs-btn {
              width: auto;
            }
          }
        `}
      </style>
    </div>
  );
};

export default JobSearch;

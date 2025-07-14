import React from "react";

const SearchInput = ({ label, placeholder, icon, value, onChange }) => {
  return (
    <div className="align-items-center border rounded p-2 mb-3">
      {icon && <span style={{ marginRight: "8px" }}>{icon}</span>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          border: "none",
          outline: "none",
          fontSize: "16px",
        }}
      />
    </div>
  );
};

export default SearchInput;

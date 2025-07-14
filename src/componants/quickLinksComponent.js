import React, { useState, useEffect } from "react";
import { quickLinksData } from "../constants";

const QuickLinksComponent = () => {
  const [quickLinksInfo, setQuickLinksInfo] = useState({});

  useEffect(() => {
    // Directly set the quickLinksData as the state
    setQuickLinksInfo(quickLinksData);
  }, []);

  return (
    <div className="container my-4 bg-white rounded shadow-md mx-auto w-auto">
      <div className="p-3">
        {/* Use the title and links from quickLinksInfo */}
        <h4 style={{ color: "#40189d" }}>{quickLinksInfo.title}</h4>
        <ul className="list-unstyled">
          {quickLinksInfo.links &&
            quickLinksInfo.links.map((link, idx) => (
              <li key={idx} className="mb-2" style={{ color: "#40189d" }}>
                <a href={link.href} style={{ textDecoration: "none" }}>
                  {link.text}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default QuickLinksComponent;

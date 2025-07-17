import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../componants/navbar";
import Footer from "../componants/footer";
import ScrollTop from "../componants/scrollTop";
import { BASE_URL, get, apiRequest } from "../apis/api";
import {
  FiEdit,
  FiDownload,
  FiExternalLink,
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiPlus,
  FiTrash2,
  FiLinkedin,
  FiGithub,
  FiGlobe,
} from "../assets/icons/vander";

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
}

function timeAgo(date) {
  if (!date) return "";
  const now = new Date();
  const joined = new Date(date);
  const months =
    (now.getFullYear() - joined.getFullYear()) * 12 +
    now.getMonth() -
    joined.getMonth();
  if (months < 1) return "Joined recently";
  if (months === 1) return "Joined 1 month ago";
  return `Joined ${months} months ago`;
}

const mapApiToUser = (data) => ({
  banner: data.bannerImage ? `${BASE_URL}/${data.bannerImage}` : "",
  profilePhoto: data.profilePhoto ? `${BASE_URL}/${data.profilePhoto}` : "",
  fullName: data.name || "",
  headline: data.headline || "",
  email: data.email || "",
  phone: data.phoneNumber || "",
  gender: data.gender
    ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1)
    : "",
  dob: data.dateOfBirth ? data.dateOfBirth.slice(0, 10) : "",
  address: {
    city: data.city || "",
    state: data.state || "",
    country: data.country || "",
    zip: data.zipCode || "",
    address: data.address || "",
  },
  summary: data.summary || "",
  about: data.about || "",
  education: (data.education || []).map((edu) => ({
    degree: edu.degree || "",
    institution: edu.institution || "",
    field: edu.fieldOfStudy || edu.field || "",
    cgpa: edu.cgpa || "",
    start: edu.startDate ? edu.startDate.slice(0, 10) : "",
    end: edu.endDate ? edu.endDate.slice(0, 10) : "",
  })),
  experience: (data.experience || []).map((exp) => ({
    title: exp.jobTitle || "",
    company: exp.companyName || "",
    start: exp.startDate ? exp.startDate.slice(0, 10) : "",
    end: exp.endDate ? exp.endDate.slice(0, 10) : "",
    isCurrent: exp.isCurrent || false,
    responsibilities: Array.isArray(exp.responsibilities)
      ? exp.responsibilities.join(", ")
      : exp.responsibilities || "",
    achievements: Array.isArray(exp.achievements)
      ? exp.achievements.join(", ")
      : exp.achievements || "",
  })),
  projects: (data.projects || []).map((proj) => ({
    title: proj.title || "",
    description: proj.description || "",
    url: proj.url || "",
    duration:
      proj.startDate && proj.endDate
        ? `${formatDate(proj.startDate)} - ${formatDate(proj.endDate)}`
        : "",
  })),
  skills: data.skills || [],
  certifications: data.certifications || [],
  social: {
    linkedin: data.linkedInProfile || "",
    github: data.githubProfile || "",
    portfolio: data.portfolio || "",
  },
  passport: data.passportNumber || "",
  resume: data.resume ? `${BASE_URL}${data.resume}` : "",
  provider: data.provider || "",
  createdAt: data.createdAt || "",
});

const mapUserToApi = (user) => ({
  name: user.fullName,
  headline: user.headline,
  email: user.email,
  phoneNumber: user.phone,
  gender: user.gender ? user.gender.toLowerCase() : "",
  dateOfBirth: user.dob,
  city: user.address.city,
  state: user.address.state,
  country: user.address.country,
  zipCode: user.address.zip,
  address: user.address.address,
  summary: user.summary,
  about: user.about,
  education: (user.education || []).map((edu) => ({
    degree: edu.degree,
    institution: edu.institution,
    fieldOfStudy: edu.field,
    cgpa: edu.cgpa,
    startDate: edu.start,
    endDate: edu.end,
  })),
  experience: (user.experience || []).map((exp) => ({
    jobTitle: exp.title,
    companyName: exp.company,
    startDate: exp.start,
    endDate: exp.end,
    isCurrent: exp.isCurrent,
    responsibilities: exp.responsibilities
      ? exp.responsibilities.split(",").map((s) => s.trim())
      : [],
    achievements: exp.achievements
      ? exp.achievements.split(",").map((s) => s.trim())
      : [],
  })),
  projects: (user.projects || []).map((proj) => ({
    title: proj.title,
    description: proj.description,
    url: proj.url,
    // You may want to split duration back to startDate/endDate if needed
  })),
  skills: user.skills,
  certifications: user.certifications,
  linkedInProfile: user.social.linkedin,
  githubProfile: user.social.github,
  portfolio: user.social.portfolio,
  passportNumber: user.passport,
  provider: user.provider,
  // resume, profilePhoto, bannerImage: handle file uploads separately if needed
});

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch profile data on mount
  useEffect(() => {
    setLoading(true);
    get("/api/v1/auth/me")
      .then((res) => {
        const mapped = mapApiToUser(res.data);
        setUser(mapped);
        setEditUser(mapped);
      })
      .catch(() => {
        setUser(null);
        setEditUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // Handlers for editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  // Add/remove education, experience, projects, skills, certifications
  const addEducation = () =>
    setEditUser((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "",
          institution: "",
          field: "",
          cgpa: "",
          start: "",
          end: "",
        },
      ],
    }));
  const removeEducation = (idx) =>
    setEditUser((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== idx),
    }));

  const addExperience = () =>
    setEditUser((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          title: "",
          company: "",
          start: "",
          end: "",
          isCurrent: false,
          responsibilities: "",
          achievements: "",
        },
      ],
    }));
  const removeExperience = (idx) =>
    setEditUser((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== idx),
    }));

  const addProject = () =>
    setEditUser((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { title: "", description: "", url: "", duration: "" },
      ],
    }));
  const removeProject = (idx) =>
    setEditUser((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== idx),
    }));

  const addSkill = () =>
    setEditUser((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }));
  const removeSkill = (idx) =>
    setEditUser((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== idx),
    }));

  const addCertification = () =>
    setEditUser((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { name: "", file: "" }],
    }));
  const removeCertification = (idx) =>
    setEditUser((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== idx),
    }));

  // File uploads
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    // For demo, just set file name. In real app, upload and set URL.
    setEditUser((prev) => ({ ...prev, [field]: file.name }));
  };

  // Save/cancel
  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      // Prepare data for API
      const payload = mapUserToApi(editUser);
      await apiRequest("/api/v1/auth/me", {
        method: "PUT",
        body: payload,
      });
      setUser(editUser);
      setEditMode(false);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditUser(user);
    setEditMode(false);
  };

  // If loading or no user, show loader or message
  if (loading) {
    return (
      <>
        <Navbar navClass="defaultscroll sticky" navLight={true} />
        <section className="section">
          <div className="container text-center py-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        </section>
        <Footer top={true} />
        <ScrollTop />
      </>
    );
  }
  if (!user) {
    return (
      <>
        <Navbar navClass="defaultscroll sticky" navLight={true} />
        <section className="section">
          <div className="container text-center py-5">
            <h4>Profile not found.</h4>
          </div>
        </section>
        <Footer top={true} />
        <ScrollTop />
      </>
    );
  }

  // UI
  return (
    <>
      <Navbar navClass="defaultscroll sticky" navLight={true} />
      <section className="section">
        <div className="container">
          {/* Header Section */}
          <div className="card mb-4 p-0 overflow-hidden">
            <div
              className="profile-banner position-relative"
              style={{ height: 200, background: "#f5f5f5" }}
            >
              <img
                src={user.banner || "https://placehold.co/1200x200?text=Banner"}
                alt="Banner"
                className="w-100 h-100 object-fit-cover"
                style={{ objectFit: "cover", height: 200 }}
              />
              {editMode && (
                <label className="position-absolute top-0 end-0 m-3 btn btn-sm btn-outline-primary">
                  Change Banner
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleFileChange(e, "banner")}
                  />
                </label>
              )}
              <div
                className="position-absolute"
                style={{ left: 32, bottom: -48 }}
              >
                <img
                  src={
                    user.profilePhoto ||
                    "https://placehold.co/120x120?text=Photo"
                  }
                  alt="Profile"
                  className="rounded-circle border border-3 border-white shadow"
                  style={{ width: 120, height: 120, objectFit: "cover" }}
                />
                {editMode && (
                  <label
                    className="btn btn-sm btn-outline-primary position-absolute bottom-0 end-0"
                    style={{ borderRadius: "50%" }}
                  >
                    <FiEdit />
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleFileChange(e, "profilePhoto")}
                    />
                  </label>
                )}
              </div>
            </div>
            <div
              className="d-flex flex-wrap align-items-center justify-content-between px-4 pt-5 pb-3"
              style={{ marginTop: 40 }}
            >
              <div>
                <h3 className="mb-1">{user.fullName}</h3>
                <div className="text-muted">{user.headline}</div>
              </div>
              <div className="d-flex gap-2">
                {!editMode && (
                  <>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => setEditMode(true)}
                    >
                      <FiEdit className="me-1" /> Edit Profile
                    </button>
                    <a
                      href={user.resume ? `${BASE_URL}/${user.resume}` : "#"}
                      className="btn btn-outline-secondary"
                      download
                    >
                      <FiDownload className="me-1" /> Download Resume
                    </a>
                    <a
                      href={`/profile/${user.fullName
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                      className="btn btn-outline-secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiExternalLink className="me-1" /> Public Profile
                    </a>
                  </>
                )}
                {editMode && (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      <FiCheckCircle className="me-1" />{" "}
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={handleCancel}
                      disabled={saving}
                    >
                      <FiXCircle className="me-1" /> Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
            {error && (
              <div className="alert alert-danger mx-4 mb-0">{error}</div>
            )}
          </div>

          {/* Main Content */}
          <div className="row g-4">
            {/* Left Column */}
            <div className="col-lg-6">
              {/* Basic Information */}
              <div className="card mb-4 p-4">
                <h5 className="mb-3">Basic Information</h5>
                {!editMode ? (
                  <ul className="list-unstyled mb-0">
                    <li>
                      <FiUser className="me-2" /> {user.fullName}
                    </li>
                    <li>
                      <FiMail className="me-2" /> {user.email}
                    </li>
                    <li>
                      <FiPhone className="me-2" /> {user.phone}
                    </li>
                    <li>
                      <FiUser className="me-2" /> {user.gender}
                    </li>
                    <li>
                      <FiCalendar className="me-2" /> {formatDate(user.dob)}
                    </li>
                    <li>
                      <FiMapPin className="me-2" /> {user.address.city},{" "}
                      {user.address.state}, {user.address.country}{" "}
                      {user.address.zip}
                    </li>
                  </ul>
                ) : (
                  <form>
                    <div className="mb-2">
                      <label className="form-label">Full Name</label>
                      <input
                        className="form-control"
                        name="fullName"
                        value={editUser.fullName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        name="email"
                        value={editUser.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Phone</label>
                      <input
                        className="form-control"
                        name="phone"
                        value={editUser.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-select"
                        name="gender"
                        value={editUser.gender}
                        onChange={handleChange}
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Date of Birth</label>
                      <input
                        className="form-control"
                        type="date"
                        name="dob"
                        value={editUser.dob}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">City</label>
                      <input
                        className="form-control"
                        name="city"
                        value={editUser.address.city}
                        onChange={handleAddressChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">State</label>
                      <input
                        className="form-control"
                        name="state"
                        value={editUser.address.state}
                        onChange={handleAddressChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Country</label>
                      <input
                        className="form-control"
                        name="country"
                        value={editUser.address.country}
                        onChange={handleAddressChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Zip Code</label>
                      <input
                        className="form-control"
                        name="zip"
                        value={editUser.address.zip}
                        onChange={handleAddressChange}
                      />
                    </div>
                  </form>
                )}
              </div>

              {/* Professional Summary */}
              <div className="card mb-4 p-4">
                <h5 className="mb-3">Professional Summary</h5>
                {!editMode ? (
                  <>
                    <div>
                      <strong>Headline:</strong> {user.headline}
                    </div>
                    <div>
                      <strong>Summary:</strong> {user.summary}
                    </div>
                    <div>
                      <strong>About Me:</strong> {user.about}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-2">
                      <label className="form-label">Headline</label>
                      <input
                        className="form-control"
                        name="headline"
                        value={editUser.headline}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Summary</label>
                      <textarea
                        className="form-control"
                        name="summary"
                        value={editUser.summary}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">About Me</label>
                      <textarea
                        className="form-control"
                        name="about"
                        value={editUser.about}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Education */}
              <div className="card mb-4 p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5>Education</h5>
                  {editMode && (
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={addEducation}
                    >
                      <FiPlus /> Add
                    </button>
                  )}
                </div>
                {!editMode ? (
                  <ul className="list-unstyled mb-0">
                    {user.education.map((edu, idx) => (
                      <li key={idx} className="mb-2">
                        <strong>{edu.degree}</strong> at {edu.institution} (
                        {edu.field})<br />
                        CGPA: {edu.cgpa} | {formatDate(edu.start)} -{" "}
                        {formatDate(edu.end)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>
                    {editUser.education.map((edu, idx) => (
                      <div key={idx} className="border rounded p-2 mb-2">
                        <div className="d-flex justify-content-between">
                          <span className="fw-bold">#{idx + 1}</span>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeEducation(idx)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                        <input
                          className="form-control mb-1"
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditUser((prev) => {
                              const arr = [...prev.education];
                              arr[idx].degree = val;
                              return { ...prev, education: arr };
                            });
                          }}
                        />
                        <input
                          className="form-control mb-1"
                          placeholder="Institution"
                          value={edu.institution}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditUser((prev) => {
                              const arr = [...prev.education];
                              arr[idx].institution = val;
                              return { ...prev, education: arr };
                            });
                          }}
                        />
                        <input
                          className="form-control mb-1"
                          placeholder="Field"
                          value={edu.field}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditUser((prev) => {
                              const arr = [...prev.education];
                              arr[idx].field = val;
                              return { ...prev, education: arr };
                            });
                          }}
                        />
                        <input
                          className="form-control mb-1"
                          placeholder="CGPA"
                          value={edu.cgpa}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditUser((prev) => {
                              const arr = [...prev.education];
                              arr[idx].cgpa = val;
                              return { ...prev, education: arr };
                            });
                          }}
                        />
                        <input
                          className="form-control mb-1"
                          type="date"
                          placeholder="Start"
                          value={edu.start}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditUser((prev) => {
                              const arr = [...prev.education];
                              arr[idx].start = val;
                              return { ...prev, education: arr };
                            });
                          }}
                        />
                        <input
                          className="form-control mb-1"
                          type="date"
                          placeholder="End"
                          value={edu.end}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditUser((prev) => {
                              const arr = [...prev.education];
                              arr[idx].end = val;
                              return { ...prev, education: arr };
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="col-lg-6">
              {/* Work Experience */}
              <div className="card mb-4 p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5>Work Experience</h5>
                  {editMode && (
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={addExperience}
                    >
                      <FiPlus /> Add
                    </button>
                  )}
                </div>
                {!editMode ? (
                  <ul className="list-unstyled mb-0">
                    {user.experience.map((exp, idx) => (
                      <li key={idx} className="mb-2">
                        <strong>{exp.title}</strong> at {exp.company} <br />
                        {formatDate(exp.start)} -{" "}
                        {exp.isCurrent ? (
                          <span className="badge bg-success">Current</span>
                        ) : (
                          formatDate(exp.end)
                        )}
                        <br />
                        <span className="text-muted">
                          Responsibilities:
                        </span>{" "}
                        {exp.responsibilities}
                        <br />
                        <span className="text-muted">Achievements:</span>{" "}
                        {exp.achievements}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>
                    {editUser.experience.map((exp, idx) => (
                      <div key={idx} className="border rounded p-2 mb-2">
                        <div className="d-flex justify-content-between">
                          <span className="fw-bold">#{idx + 1}</span>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeExperience(idx)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                        <input
                          className="form-control mb-1"
                          placeholder="Job Title"
                          value={exp.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditUser((prev) => {
                              const arr = [...prev.experience];
                              arr[idx].title = val;
                              return { ...prev, experience: arr };
                            });
                          }}
                        />
                        <input
                          className="form-control mb-1"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditUser((prev) => {
                              const arr = [...prev.experience];
                              arr[idx].company = val;
                              return { ...prev, experience: arr };
                            });
                          }}
                        />
                        <input
                          className="form-control mb-1"
                          type="date"
                          placeholder="Start"
                          value={exp.start}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditUser((prev) => {
                              const arr = [...prev.experience];
                              arr[idx].start = val;
                              return { ...prev, experience: arr };
                            });
                          }}
                        />
                        <input
                          className="form-control mb-1"
                          type="date"
                          placeholder="End"
                          value={exp.end}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditUser((prev) => {
                              const arr = [...prev.experience];
                              arr[idx].end = val;
                              return { ...prev, experience: arr };
                            });
                          }}
                        />
                        <div className="form-check mb-1">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={exp.isCurrent}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setEditUser((prev) => {
                                const arr = [...prev.experience];
                                arr[idx].isCurrent = checked;
                                return { ...prev, experience: arr };
                              });
                            }}
                            id={`isCurrent${idx}`}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`isCurrent${idx}`}
                          >
                            Currently Working
                          </label>
                        </div>
                        <textarea
                          className="form-control mb-1"
                          placeholder="Responsibilities"
                          value={exp.responsibilities}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditUser((prev) => {
                              const arr = [...prev.experience];
                              arr[idx].responsibilities = val;
                              return { ...prev, experience: arr };
                            });
                          }}
                        />
                        <textarea
                          className="form-control mb-1"
                          placeholder="Achievements"
                          value={exp.achievements}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditUser((prev) => {
                              const arr = [...prev.experience];
                              arr[idx].achievements = val;
                              return { ...prev, experience: arr };
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Projects */}
              <div className="card mb-4 p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5>Projects</h5>
                  {editMode && (
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={addProject}
                    >
                      <FiPlus /> Add
                    </button>
                  )}
                </div>
                {!editMode ? (
                  <ul className="list-unstyled mb-0">
                    {user.projects.map((proj, idx) => (
                      <li key={idx} className="mb-2">
                        <strong>{proj.title}</strong> ({proj.duration})<br />
                        {proj.description}
                        <br />
                        {proj.url && (
                          <a
                            href={proj.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {proj.url}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>
                    {editUser.projects.map((proj, idx) => (
                      <div key={idx} className="border rounded p-2 mb-2">
                        <div className="d-flex justify-content-between">
                          <span className="fw-bold">#{idx + 1}</span>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeProject(idx)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                        <input
                          className="form-control mb-1"
                          placeholder="Title"
                          value={proj.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditUser((prev) => {
                              const arr = [...prev.projects];
                              arr[idx].title = val;
                              return { ...prev, projects: arr };
                            });
                          }}
                        />
                        <input
                          className="form-control mb-1"
                          placeholder="Duration"
                          value={proj.duration}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditUser((prev) => {
                              const arr = [...prev.projects];
                              arr[idx].duration = val;
                              return { ...prev, projects: arr };
                            });
                          }}
                        />
                        <textarea
                          className="form-control mb-1"
                          placeholder="Description"
                          value={proj.description}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditUser((prev) => {
                              const arr = [...prev.projects];
                              arr[idx].description = val;
                              return { ...prev, projects: arr };
                            });
                          }}
                        />
                        <input
                          className="form-control mb-1"
                          placeholder="URL"
                          value={proj.url}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditUser((prev) => {
                              const arr = [...prev.projects];
                              arr[idx].url = val;
                              return { ...prev, projects: arr };
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Skills & Certifications */}
              <div className="card mb-4 p-4">
                <h5 className="mb-3">Skills & Certifications</h5>
                {!editMode ? (
                  <>
                    <div className="mb-2">
                      {user.skills.map((skill, idx) => (
                        <span key={idx} className="badge bg-primary me-1 mb-1">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                    <ul className="list-unstyled mb-0">
                      {user.certifications.map((cert, idx) => (
                        <li key={idx}>
                          {cert.name}{" "}
                          {cert.file && (
                            <a
                              href={`${BASE_URL}/${cert.file}`}
                              download
                              className="ms-2"
                            >
                              <FiDownload />
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <div className="mb-2">
                      {editUser.skills.map((skill, idx) => (
                        <div key={idx} className="d-inline-block me-2 mb-1">
                          <input
                            className="form-control d-inline-block"
                            style={{ width: 120, display: "inline-block" }}
                            value={skill}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditUser((prev) => {
                                const arr = [...prev.skills];
                                arr[idx] = val;
                                return { ...prev, skills: arr };
                              });
                            }}
                          />
                          <button
                            className="btn btn-sm btn-outline-danger ms-1"
                            onClick={() => removeSkill(idx)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={addSkill}
                      >
                        <FiPlus /> Add Skill
                      </button>
                    </div>
                    <div>
                      {editUser.certifications.map((cert, idx) => (
                        <div
                          key={idx}
                          className="mb-2 d-flex align-items-center"
                        >
                          <input
                            className="form-control me-2"
                            placeholder="Certification Name"
                            value={cert.name}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditUser((prev) => {
                                const arr = [...prev.certifications];
                                arr[idx].name = val;
                                return { ...prev, certifications: arr };
                              });
                            }}
                          />
                          <input
                            type="file"
                            className="form-control me-2"
                            onChange={(e) =>
                              handleFileChange(e, `certifications[${idx}].file`)
                            }
                          />
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeCertification(idx)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={addCertification}
                      >
                        <FiPlus /> Add Certification
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Social Links */}
              <div className="card mb-4 p-4">
                <h5 className="mb-3">Social Links</h5>
                {!editMode ? (
                  <ul className="list-unstyled mb-0">
                    <li>
                      <FiLinkedin className="me-2" />
                      <a
                        href={user.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.social.linkedin}
                      </a>
                    </li>
                    <li>
                      <FiGithub className="me-2" />
                      <a
                        href={user.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.social.github}
                      </a>
                    </li>
                    <li>
                      <FiGlobe className="me-2" />
                      <a
                        href={user.social.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.social.portfolio}
                      </a>
                    </li>
                  </ul>
                ) : (
                  <>
                    <div className="mb-2">
                      <label className="form-label">LinkedIn</label>
                      <input
                        className="form-control"
                        name="linkedin"
                        value={editUser.social.linkedin}
                        onChange={(e) =>
                          setEditUser((prev) => ({
                            ...prev,
                            social: {
                              ...prev.social,
                              linkedin: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">GitHub</label>
                      <input
                        className="form-control"
                        name="github"
                        value={editUser.social.github}
                        onChange={(e) =>
                          setEditUser((prev) => ({
                            ...prev,
                            social: { ...prev.social, github: e.target.value },
                          }))
                        }
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Portfolio</label>
                      <input
                        className="form-control"
                        name="portfolio"
                        value={editUser.social.portfolio}
                        onChange={(e) =>
                          setEditUser((prev) => ({
                            ...prev,
                            social: {
                              ...prev.social,
                              portfolio: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Additional Info */}
              <div className="card mb-4 p-4">
                <h5 className="mb-3">Additional Info</h5>
                {!editMode ? (
                  <ul className="list-unstyled mb-0">
                    <li>
                      <strong>Passport:</strong> {user.passport}
                    </li>
                    <li>
                      <strong>Resume:</strong>{" "}
                      {user.resume && (
                        <a href={`${BASE_URL}/${user.resume}`} download>
                          <FiDownload />
                        </a>
                      )}
                    </li>
                    <li>
                      <strong>Provider:</strong> {user.provider}
                    </li>
                    <li>
                      <strong>{timeAgo(user.createdAt)}</strong>
                    </li>
                  </ul>
                ) : (
                  <>
                    <div className="mb-2">
                      <label className="form-label">Passport Number</label>
                      <input
                        className="form-control"
                        name="passport"
                        value={editUser.passport}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Resume</label>
                      <input
                        className="form-control"
                        type="file"
                        onChange={(e) => handleFileChange(e, "resume")}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Provider</label>
                      <select
                        className="form-select"
                        name="provider"
                        value={editUser.provider}
                        onChange={handleChange}
                      >
                        <option value="local">Local</option>
                        <option value="google">Google</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="apple">Apple</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer top={true} />
      <ScrollTop />
    </>
  );
}

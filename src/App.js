import React from "react";
import { Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/style.scss";
import "./assets/css/materialdesignicons.min.css";
import Index from "./pages";

import JobListTwo from "./pages/job-list-two";
import JobApply from "./pages/job-apply";
import JobPost from "./pages/job-post";
import JobDetailThree from "./pages/job-detail-three";

import Candidates from "./pages/candidates";
import CandidateProfile from "./pages/candidate-profile";
import CandidateProfileSetting from "./pages/candidate-profile-setting";
import Pricing from "./pages/pricing";

import Login from "./pages/login";
import Signup from "./pages/signup";
import ResetPassword from "./pages/reset-password";
import LockScreen from "./pages/lock-screen";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import ContactUs from "./pages/contactus";
import Error from "./pages/error";
import Comingsoom from "./pages/comingsoon";
import Maintenance from "./pages/maintenance";
import AboutTwo from "./componants/aboutTwo";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Index />} />
        <Route path="/index-two" element={<Index />} />
        <Route path="/job-list-Two" element={<JobListTwo />} />
        <Route path="/job-apply" element={<JobApply />} />
        <Route path="/job-post" element={<JobPost />} />
        <Route path="/job-detail-three" element={<JobDetailThree />} />
        <Route path="/job-detail-three/:id" element={<JobDetailThree />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/candidate-profile" element={<CandidateProfile />} />
        <Route path="/candidate-profile/:id" element={<CandidateProfile />} />
        <Route
          path="/candidate-profile-setting"
          element={<CandidateProfileSetting />}
        />
        <Route path="/about-two" element={<AboutTwo />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/lock-screen" element={<LockScreen />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="*" element={<Error />} />
        <Route path="/error" element={<Error />} />
        <Route path="/comingsoon" element={<Comingsoom />} />
        <Route path="/maintenance" element={<Maintenance />} />
      </Routes>
    </>
  );
}

export default App;

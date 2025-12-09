import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import About from "./pages/About/About";
import Register from "./pages/Register/Register";
import { NavBar } from "./Layout/NavBar/NavBar";
import "./App.css";
import Login from "./pages/LogIn/Login";


import JobListing from "./pages/Jobs/JobListing";
import JobDetails from "./pages/Jobs/JobDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import PostJob from "./pages/Jobs/PostJob";
import Profile from "./pages/Profile/Profile";

import Footer from "./Layout/Footer/Footer";

// ... previous code ...

function App() {
  return (
    <>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <NavBar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/jobs" element={<JobListing />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

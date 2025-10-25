// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("jobseeker");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const mockDB = {
    jobseeker: [{ email: "job@example.com", password: "1234" }],
    employer: [{ email: "emp@example.com", password: "1234" }],
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userExists = mockDB[role].some(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (userExists) {
      alert(`Login successful for ${role}!`);
      navigate("/profile");
    } else {
      alert(`No account found for this ${role}. Please register.`);
      navigate("/register");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2>Login</h2>

        <div className={styles.roleSelector}>
          <button
            className={role === "jobseeker" ? styles.active : ""}
            onClick={() => setRole("jobseeker")}
          >
            Job Seeker
          </button>
          <button
            className={role === "employer" ? styles.active : ""}
            onClick={() => setRole("employer")}
          >
            Employer
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <input
            type="email"
            name="email"
            placeholder={
              role === "jobseeker" ? "Job Seeker Email" : "Employer Email"
            }
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        <p>
          Don’t have an account? <span  onClick={() => navigate("/register")} className={styles.toggle}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";

export const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("jobseeker");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userExists = false; // Replace with backend logic

    if (!isLogin && !userExists) {
      console.log("Registering:", role, formData);
      alert("Registration Successful!");
    } else if (isLogin && !userExists) {
      alert("User not found! Please register first.");
      setIsLogin(false);
      return;
    } else {
      console.log("Logging in:", role, formData);
      alert("Login Successful!");
    }

    navigate("/profile");
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authFormCard}>
        <h2>{isLogin ? "Login" : "Register"}</h2>

        {/* Role Selector */}
        <div className={styles.roleSelector}>
          <button
            type="button"
            className={role === "jobseeker" ? styles.active : ""}
            onClick={() => {
              setRole("jobseeker");
              setFormData({ name: "", email: "", password: "" });
            }}
          >
            Job Seeker
          </button>
          <button
            type="button"
            className={role === "employer" ? styles.active : ""}
            onClick={() => {
              setRole("employer");
              setFormData({ name: "", email: "", password: "" });
            }}
          >
            Employer
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.authForm}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder={role === "jobseeker" ? "Job Seeker Email" : "Employer Email"}
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
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>

        <p onClick={() => setIsLogin(!isLogin)} className={styles.toggle}>
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};


// src/pages/Register.jsx
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import api from "../../../api/axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("jobseeker");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role:role,
  });


  useEffect(() => {
  setFormData((prev) => ({ ...prev, role }));
}, [role]);
 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await api.post("/auth/register", formData);
      console.log("✅ Registered successfully:", res.data);

      if(res){
        navigate("/login");
      }
    } catch (err) {
      console.error("❌ Registration error:", err.response?.data || err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2>Register</h2>

        <div className={styles.roleSelector}>
          <button
            className={role === "jobseeker" ? styles.active : ""}
            onClick={() => setRole("jobseeker")}
          >
            Job Seeker
          </button>
          <button
            className={role === "employer" ? styles.active : ""}
            onClick={() => {
              setRole("employer"); console.log("employer")}}
          >
            Employer
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account?<span onClick={() => navigate("/login")} className={styles.toggle}>Login</span> 
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

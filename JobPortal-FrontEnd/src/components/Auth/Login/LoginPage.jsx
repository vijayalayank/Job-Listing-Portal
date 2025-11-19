// src/pages/Login.jsx
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import api from "../../../api/axios";
import { useSession } from "../../../context/SessionContext"


const LoginPage = () => {
  const navigate = useNavigate();
  const { setSession } = useSession();
  const [role, setRole] = useState("jobseeker");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role:role,
  });

  useEffect(()=>{
    setFormData((prev) => ({ ...prev, role }));
  },[role]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await api.post("/auth/login",formData, { withCredentials: true } );
      console.log(res);

      if(res){
        setSession(true); 
        navigate("/");
      }

    }
    catch(e){
      console.log(e);
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

export default LoginPage;

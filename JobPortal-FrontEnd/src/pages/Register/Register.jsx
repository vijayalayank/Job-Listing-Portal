import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("jobseeker");
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
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
    if (isLogin) {
      const userExists = mockDB[role].some(
        (user) => user.email === formData.email && user.password === formData.password
      );
      if (userExists) {
        alert(`Login successful for ${role}!`);
        navigate("/profile");
      } else {
        alert(`No account found for this ${role}. Please register.`);
        setIsLogin(false);
      }
    } else {
      mockDB[role].push({ name: formData.name, email: formData.email, password: formData.password });
      alert(`Registration successful for ${role}! You can now login.`);
      setIsLogin(true);
      setFormData({ name: "", email: "", password: "" });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2>{isLogin ? "Login" : "Register"}</h2>

        <div className={styles.roleSelector}>
          <button
            className={role === "jobseeker" ? styles.active : ""}
            onClick={() => { setRole("jobseeker"); setFormData({ name: "", email: "", password: "" }); }}
          >
            Job Seeker
          </button>
          <button
            className={role === "employer" ? styles.active : ""}
            onClick={() => { setRole("employer"); setFormData({ name: "", email: "", password: "" }); }}
          >
            Employer
          </button>
        </div>

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
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Register;

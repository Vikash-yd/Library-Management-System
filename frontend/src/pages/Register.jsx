import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import Navbar from "../components/Navbar";
import bgImage from "../assets/library.jpg";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    mobile: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(formData.mobile)) {
      alert("Enter valid 10-digit mobile number");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users",
        formData
      );

      console.log("Registered:", response.data);
      alert("User registered successfully ✅");

      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        mobile: ""
      });

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-container">
        <img src={bgImage} className="auth-bg" alt="Library" />

        <div className="auth-overlay">
          <div className="auth-card">
            <h2>Register</h2>

            <form onSubmit={handleSubmit} className="auth-form">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
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

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />

              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
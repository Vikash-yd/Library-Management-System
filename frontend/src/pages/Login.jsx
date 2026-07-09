import "./Auth.css";
import Navbar from "../components/Navbar";
import bgImage from "../assets/library.jpg";
import { useEffect, useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const contentType = response.headers.get("content-type");

      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        alert(data);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));

      alert("Login successful");
      console.log(data);

      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-container">
        <img src={bgImage} className="auth-bg" alt="Library" />

        <div className="auth-overlay">
          <div className="auth-card login-card">
            <h2>Login</h2>

            <form onSubmit={handleSubmit} className="auth-form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Login</button>
            </form>

            <p style={{ marginTop: "10px" }}>
              Not registered?{" "}
              <a
                href="/register"
                style={{ color: "blue", cursor: "pointer" }}
              >
                Create account
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
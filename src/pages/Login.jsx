import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/login.css";
import logo from "../assets/images/food_quest_logo.png";
import toast, { Toaster } from "react-hot-toast";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "Itadmin" && password === "FQ@admin$") {
      navigate("/");
      localStorage.setItem("user", email);
      localStorage.setItem("isLoggedIn", true);
    } else if (email === "Faizal" && password === "FQ@admin$2024") {
      navigate("/");
      localStorage.setItem("user", email);
      localStorage.setItem("isLoggedIn", true);
    } else {
      toast.error("Invalid User Name or Password", {
        duration: 3000,
        position: "top-right",
        style: { backgroundColor: "#bd1515", color: "white", padding:"15px" },
      });
    }

    // Simulate successful login

    // Uncomment below if making a real API request:
    // try {
    //   const response = await fetch('https://your-api-url.com/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email,
    //       password,
    //     }),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Login failed');
    //   }

    //   const data = await response.json();
    //   console.log('Login successful:', data);

    //   localStorage.setItem("isLoggedIn", true); // Set login state in local storage
    //   navigate("/"); // Redirect to home page
    // } catch (error) {
    //   console.error('Error:', error);
    //   setErrorMessage('Login failed. Please check your credentials.');
    // }
  };

  return (
    <div className="login-container">
      <Toaster />
      <div className="login-box">
        <img src={logo} height="200" width="200" alt="logo" />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>User Name</label>
            <input
              type="text"
              placeholder="Enter your user name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              autoComplete=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="login-footer">
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

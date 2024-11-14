// /src/components/LoginForm.js
import React, { useState } from "react";
import logo from "../assets/logo technopartner.png";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password).catch((err) => {
      setError(err.message || "Something went wrong");
    });
  };

  return (
    <div className="login-form">
      <img src={logo} alt="logo" width={300} height={150} />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn-login">
          Login
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginForm;

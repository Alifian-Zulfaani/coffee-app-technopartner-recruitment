// /src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import LoginForm from "./components/LoginForm";
import HomePage from "./components/HomePage";
import MenuPage from "./components/MenuPage";
import BottomNav from "./components/BottomNav";
import { login } from "./services/apiService";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token"); // ambil token dari localstorage
    // console.log("Stored Token:", storedToken);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const token = await login(username, password);
      // console.log("Token yang diterima:", token);
      setToken(token);
      localStorage.setItem("access_token", token);
    } catch (error) {
      console.error(error);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="App">
      {!token ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<HomePage token={token} />} />
            <Route path="/menu" element={<MenuPage token={token} />} />
          </Routes>
          <BottomNav />
        </Router>
      )}
    </div>
  );
};

export default App;

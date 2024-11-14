// /src/components/HomePage.js
import React, { useEffect, useState } from "react";
import { getHomeData } from "../services/apiService";
import "../styles/homePage.css";
import logo from "../assets/logo technopartner.png";

const HomePage = ({ token }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    if (token) {
      getHomeData(token)
        .then((response) => setData(response))
        .catch((err) => setError("Failed to load data."));
    }
  }, [token]);

  useEffect(() => {
    let interval;
    if (data && data.result && data.result.banner) {
      interval = setInterval(() => {
        setCurrentBannerIndex(
          (prevIndex) => (prevIndex + 1) % data.result.banner.length
        );
      }, 2000); // Set 2 detik
    }
    return () => clearInterval(interval);
  }, [data]);

  if (!data || !data.result) {
    return <div className="loading-spinner">Loading...</div>;
  }

  const { greeting, name, saldo, point, qrcode, banner } = data.result;

  return (
    <div className="home-page">
      {error && <p className="error-message">{error}</p>}

      <div className="homepage-container">
        <header className="header">
          <img src={logo} alt="logo" className="logo" />
        </header>

        <div className="user-info-card">
          <p className="greeting">{greeting},</p>
          <h2 className="user-name">{name}</h2>
          <div className="balance-info">
            <img src={qrcode} alt="qrcode" />
            <div className="balance">
              <p>Saldo</p>
              <p className="balance-amount">{saldo}</p>
            </div>
            <div className="points">
              <p>Points</p>
              <p className="points-amount">{point}</p>
            </div>
          </div>
        </div>

        <div className="main-banner">
          <img
            src={banner[currentBannerIndex]}
            alt="carousel banner"
            className="banner-image"
          />
        </div>

        <div className="content">
          <p className="view-all">View all</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

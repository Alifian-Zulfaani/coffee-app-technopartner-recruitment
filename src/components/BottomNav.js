import React from "react";
import { Link } from "react-router-dom";
import homeIcon from "../assets/home1.png";
import menuIcon from "../assets/menu1.png";

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <Link to="/" className="nav-button">
        <img src={homeIcon} alt="Home" />
        <span>Home</span>
      </Link>
      <Link to="/menu" className="nav-button">
        <img src={menuIcon} alt="Menu" />
        <span>Menu</span>
      </Link>
    </nav>
  );
};

export default BottomNav;

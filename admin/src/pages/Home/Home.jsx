import React from "react";
import "./Home.css";
import { assets } from "../../assets/assets";

const Home = () => {
  return (
    <div className="home">
      <div className="home-card">
        <img src={assets.logo} alt="Bagify Logo" className="home-logo" />
        <h1>Welcome to Bagify Admin Panel</h1>
        <p>Manage your store efficiently with a modern dashboard.</p>
      </div>
    </div>
  );
};

export default Home;

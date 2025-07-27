import React from "react";
import { useNavigate } from "react-router-dom";
import homeIcon from "../../assets/home-icon.png";
import chatIcon from "../../assets/chat-icon.png";
import profileIcon from "../../assets/profile-icon.png";
import "./Navbar.css"; // Подключаем стили

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar-container">
      <button onClick={() => navigate("/")}>
        <img src={homeIcon} alt="Home" className="navbar-icon" />
      </button>
      <button onClick={() => navigate("/chats")}>
        <img src={chatIcon} alt="Chats" className="navbar-icon" />
      </button>
      <button onClick={() => navigate("/profile")}>
        <img src={profileIcon} alt="Profile" className="navbar-icon" />
      </button>
    </div>
  );
};

export default Navbar;

import React from "react";
import { useNavigate } from "react-router-dom";
import MapNavbar from "../components/MapNavbar/MapNavbar"; // Навбар с картой
import { useStyle } from "../contexts/StyleContext";
import Navbar from "../components/Navbar/Navbar";
import MapView from "../components/Map/MapView";
const Home = () => {
  const { style, toggleStyle } = useStyle(); // Получаем текущий стиль и функцию переключения
  const navigate = useNavigate(); // Навигация

  return (
    <div className="home-page">
      <header className="home-header">
        <MapView/>

        <h1>{style === "human" ? "Поиск пропавших Людей" : "Поиск пропавших Питомцев"}</h1>
        {/* Кнопка для переключения стиля */}
        <button className="style-switch" onClick={toggleStyle}>
          {style === "human" ? "Переключиться на стиль питомцев" : "Переключиться на стиль людей"}
        </button>
      </header>

      <main className="home-main">
        {/* Кнопка для создания новой заявки */}
        <button className="request-button" onClick={() => navigate("/request/new")}>
          Создать заявку
        </button>
      </main>
      <Navbar />
    </div>
  );
};

export default Home;

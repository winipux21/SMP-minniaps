import React, { useState, useRef } from "react";
import MapView from "../Map/MapView";
import "./MapNavbar.css";

const MapNavbar = () => {
  const [navbarHeight, setNavbarHeight] = useState(38); // Начальная высота навбара
  const [isDragging, setIsDragging] = useState(false); // Состояние "тянем"
  const startY = useRef(0); // Координата начала движения
  const navbarRef = useRef(null); // Ссылка на область навбара

  const handleStart = (e) => {
    // Проверяем, начали ли тянуть с области заголовка навбара
    const target = e.target;
    if (navbarRef.current && !navbarRef.current.contains(target)) return;

    setIsDragging(true);
    startY.current = e.touches ? e.touches[0].clientY : e.clientY; // Запоминаем начальную точку
  };

  const handleMove = (e) => {
    if (!isDragging) return;

    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = startY.current - currentY;

    const newHeight = Math.max(38, Math.min(600, navbarHeight - delta)); // Ограничиваем высоту
    setNavbarHeight(newHeight);

    startY.current = currentY; // Обновляем точку
  };

  const handleEnd = () => {
    setIsDragging(false);
    setNavbarHeight(navbarHeight > 150 ? 600 : 38); // Раскрываем или сворачиваем навбар
  };

  return (
    <div
      className="map-navbar"
      style={{
        height: `${navbarHeight}px`,
        transition: isDragging ? "none" : "height 0.3s ease-in-out",
      }}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onMouseDown={handleStart}
      onMouseMove={(e) => isDragging && handleMove(e)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      {/* Заголовок навбара */}
      <div
        className="map-header"
        ref={navbarRef} // Привязываем обработку событий только к навбару
        style={{
          transform: `translateY(${navbarHeight - 38}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease-in-out",
        }}
      >
        <span>К карте</span>
        <div className="toggle-icon">{navbarHeight > 150 ? "▲" : "▼"}</div>
      </div>

      {/* Карта */}
      <div
        className="map-content"
        style={{
          height: `${navbarHeight - 38}px`,
          transition: isDragging ? "none" : "height 0.3s ease-in-out",
        }}
      >
        <MapView /> {/* Карта рендерится один раз */}
      </div>
    </div>
  );
};

export default MapNavbar;

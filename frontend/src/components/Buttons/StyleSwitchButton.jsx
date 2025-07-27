import React from "react";
import { useStyle } from "../../contexts/StyleContext"; // Обращение к контексту

const StyleSwitchButton = () => {
  const { style, toggleStyle } = useStyle(); // Используем хук useStyle

  return (
    <button className="style-switch-button" onClick={toggleStyle}>
      {style === "human" ? "Переключиться на питомцев" : "Переключиться на людей"}
    </button>
  );
};

export default StyleSwitchButton;

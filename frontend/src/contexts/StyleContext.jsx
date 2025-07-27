import React, { createContext, useContext, useState } from "react";

// Создаем контекст
export const StyleContext = createContext();

// Создаем хук для доступа к контексту
export const useStyle = () => useContext(StyleContext);

// Обертка контекста
export const StyleProvider = ({ children }) => {
  const [style, setStyle] = useState("human"); // Начальный стиль "human"
  const [backgroundClass, setBackgroundClass] = useState("bg-human"); // Синий фон по умолчанию

  const toggleStyle = () => {
    setStyle((prevStyle) => (prevStyle === "human" ? "pet" : "human"));
    setBackgroundClass((prevClass) =>
      prevClass === "bg-human" ? "bg-pet" : "bg-human"
    );
  };

  return (
    <StyleContext.Provider value={{ style, toggleStyle, backgroundClass }}>
      {children}
    </StyleContext.Provider>
  );
};

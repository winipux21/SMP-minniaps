import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { StyleProvider, useStyle } from "./contexts/StyleContext";
import { AuthProvider } from "./contexts/AuthContext";

const AppContainer = ({ children }) => {
  const { backgroundClass } = useStyle(); // Получаем текущий класс фона

  return <div className={backgroundClass}>{children}</div>;
};

const App = () => (
  <AuthProvider>
    <StyleProvider>
      <BrowserRouter>
        <AppContainer>
          <AppRoutes />
        </AppContainer>
      </BrowserRouter>
    </StyleProvider>
  </AuthProvider>
);

export default App;

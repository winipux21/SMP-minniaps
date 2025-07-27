import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import bridge from "@vkontakte/vk-bridge";
import "./styles/global.css";

// Инициализация VK Bridge
bridge.send("VKWebAppInit");

ReactDOM.render(<App />, document.getElementById("root"));

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import bridge from "@vkontakte/vk-bridge";

// Инициализация VK Bridge
bridge.send("VKWebAppInit");

ReactDOM.render(<App />, document.getElementById("root"));

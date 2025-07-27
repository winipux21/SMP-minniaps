import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import bridge from "@vkontakte/vk-bridge";

// Список модераторов (локально в frontend)
const MODERATOR_IDS = ["317295271", "160615679", "205925815"];

// Используем API URL из .env
const API_URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const vkResponse = await bridge.send("VKWebAppGetUserInfo");
        const vkId = vkResponse.id;

        // Сохраняем VK ID в localStorage
        localStorage.setItem("vk_id", vkId);

        const firstName = vkResponse.first_name;
        const lastName = vkResponse.last_name;
        const photo = vkResponse.photo_200;

        // Получаем или создаём пользователя в базе данных
        try {
          const userResponse = await axios.get(`${API_URL}/users/${vkId}`);
          setUser({ ...userResponse.data, photo });
        } catch (error) {
          if (error.response && error.response.status === 404) {
            const newUser = {
              vkId,
              firstName,
              lastName,
              role: MODERATOR_IDS.includes(vkId.toString()) ? "moderator" : "user",
            };
            const createUserResponse = await axios.post(`${API_URL}/users`, newUser);
            setUser({ ...createUserResponse.data, photo });
          } else {
            console.error("Ошибка авторизации:", error);
          }
        }
      } catch (vkError) {
        console.error("Ошибка VK Bridge:", vkError);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

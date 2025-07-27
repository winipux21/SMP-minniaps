import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Получение информации о пользователе
export const getUserInfo = async (vkId) => {
  const response = await axios.get(`${API_BASE_URL}/users/${vkId}`);
  return response.data;
};

// Получение заявок пользователя
export const getUserRequests = async (vkId) => {
  const response = await axios.get(`${API_BASE_URL}/users/${vkId}/requests`);
  return response.data;
};

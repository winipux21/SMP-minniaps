import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getApprovedRequests = async (type) => {
  try {
    const response = await axios.get(`${API_URL}/map`, {
      params: { type },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка загрузки заявок для карты:", error);
    throw error;
  }
};

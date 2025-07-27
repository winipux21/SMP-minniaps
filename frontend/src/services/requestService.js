import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Создание заявки
export const createRequest = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/requests`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Заявка успешно отправлена:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Ошибка API при создании заявки:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Получение всех заявок
export const getRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/requests`);
    return response.data;
  } catch (error) {
    console.error("Ошибка получения заявок:", error);
    throw error;
  }
};

// Обновление статуса заявки
export const updateRequestStatus = async (
  id,
  { status, vkId, firstName, lastName }
) => {
  try {
    const response = await axios.patch(`${API_URL}/requests/${id}`, {
      status,
      vkId,
      firstName,
      lastName,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка обновления статуса:", error);
    throw error;
  }
};

export const getUserRequests = async (vkId) => {
  try {
    console.log(`Fetching requests for VK ID: ${vkId}`);
    const response = await axios.get(`${API_URL}/users/${vkId}/requests`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user requests:",
      error.response?.data || error.message
    );
    throw new Error("Unable to fetch user requests.");
  }
};

export const getRequestsByRole = async (vkId) => {
  try {
    const response = await axios.get(
      `${API_URL}/requests/users/${vkId}/requests`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Ошибка при получении заявок:",
      error.response?.data || error.message
    );
    throw new Error("Не удалось получить заявки.");
  }
};

export const getRequestById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/requests/${id}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка получения заявки:", error);
    throw error;
  }
};

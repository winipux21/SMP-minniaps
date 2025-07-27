import { io } from "socket.io-client";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// WebSocket клиент
const socket = io(API_URL);

// Получение чатов пользователя
export const getUserChats = async (vkId) => {
  const response = await axios.get(`${API_URL}/chat/${vkId}`);
  return response.data;
};

// Создание нового чата
export const createChat = async (requestId) => {
  const response = await axios.post(`${API_URL}/chat`, { requestId });
  return response.data;
};

// Получение сообщений из чата
export const getChatMessages = async (chatId) => {
  const response = await axios.get(`${API_URL}/chat/${chatId}/messages`);
  return response.data;
};

// Отправка сообщения через REST API
export const sendMessage = async (chatId, { senderVkId, content }) => {
  const response = await axios.post(`${API_URL}/chat/${chatId}/messages`, {
    senderVkId,
    content,
  });
  return response.data;
};

// Отправка сообщения через WebSocket
export const sendMessageWebSocket = (chatId, message) => {
  socket.emit("sendMessage", { chatId, message });
};

// Присоединение к комнате через WebSocket
export const joinChatRoom = (chatId) => {
  socket.emit("joinRoom", chatId);
};

// Подписка на новые сообщения через WebSocket
export const onNewMessage = (callback) => {
  socket.on("newMessage", callback);
};

// Присоединение к чату или создание нового
export const joinChat = async (chatId, { vkId, firstName, lastName }) => {
  const response = await axios.post(`${API_URL}/chat/${chatId}/join`, {
    vkId,
    firstName,
    lastName,
  });
  return response.data;
};

export default socket;

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  joinChatRoom,
  onNewMessage,
  sendMessageWebSocket,
  getChatMessages,
} from "../../services/chatService";
import "./ChatRoom.css";
import Navbar from "../Navbar/Navbar";
const ChatRoom = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getChatMessages(chatId);
        setMessages(data);
        scrollToBottom();
      } catch (err) {
        console.error("Ошибка загрузки сообщений:", err);
      }
    };

    fetchMessages();

    joinChatRoom(chatId);

    onNewMessage((message) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom();
    });
  }, [chatId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const vkId = localStorage.getItem("vk_id");
    if (!vkId) {
      alert("Авторизуйтесь, чтобы отправить сообщение.");
      return;
    }

    const message = {
      senderVkId: vkId,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    sendMessageWebSocket(chatId, message); // Отправка сообщения через WebSocket
    setNewMessage(""); // Очистка поля ввода
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chat-room">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.senderVkId}</strong>: {msg.content}
            <div className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Введите сообщение..."
        />
        <button onClick={handleSendMessage}>Отправить</button>
      </div>
      <Navbar />
    </div>
  );
};

export default ChatRoom;

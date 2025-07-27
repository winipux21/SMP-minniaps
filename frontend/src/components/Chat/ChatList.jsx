import React, { useEffect, useState } from "react";
import { getUserChats } from "../../services/chatService";
import { useNavigate } from "react-router-dom";
import "./ChatList.css";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const vkId = localStorage.getItem("vk_id");
        if (!vkId) throw new Error("VK ID не найден. Авторизуйтесь.");

        const userChats = await getUserChats(vkId);
        setChats(userChats);
      } catch (err) {
        console.error("Ошибка загрузки чатов:", err);
        setError(err.message || "Не удалось загрузить чаты.");
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  if (loading) return <div className="chat-list-loading">Загрузка чатов...</div>;
  if (error) return <div className="chat-list-error">{error}</div>;

  return (
    <ul className="chat-list">
      {chats.length === 0 ? (
        <li>Чатов пока нет.</li>
      ) : (
        chats.map((chat) => (
          <li
            key={chat._id}
            className="chat-item"
            onClick={() => navigate(`/chat/${chat._id}`)}
          >
            <div className="chat-item-header">
              <strong>{chat.requestId || "Общий чат"}</strong>
            </div>
            <div className="chat-item-body">
              Последнее сообщение:{" "}
              {chat.messages.length
                ? chat.messages[chat.messages.length - 1].content
                : "Нет сообщений"}
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default ChatList;

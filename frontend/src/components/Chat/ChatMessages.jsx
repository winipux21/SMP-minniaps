import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChatMessages } from "../../services/chatService";

const ChatMessages = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getChatMessages(chatId);
        setMessages(data);
      } catch (err) {
        console.error("Ошибка загрузки сообщений:", err);
      }
    };

    fetchMessages();
  }, [chatId]);

  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>
          <strong>{msg.senderVkId}:</strong> {msg.content}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;

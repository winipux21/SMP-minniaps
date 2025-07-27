import React, { useState } from "react";
import { sendMessage } from "../../services/chatService";

const ChatInput = ({ chatId }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    try {
      const vkId = localStorage.getItem("vk_id");
      if (!vkId) {
        alert("Авторизуйтесь, чтобы отправить сообщение.");
        return;
      }

      await sendMessage(chatId, { senderVkId: vkId, content: message });
      alert("Сообщение отправлено!");
      setMessage("");
    } catch (err) {
      console.error("Ошибка отправки сообщения:", err);
      alert("Не удалось отправить сообщение. Попробуйте снова.");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Введите сообщение"
      />
      <button onClick={handleSendMessage}>Отправить</button>
    </div>
  );
};

export default ChatInput;

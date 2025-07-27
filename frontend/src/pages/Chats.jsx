import React, { useState } from "react";
import ChatList from "../components/Chat/ChatList";
import ChatMessages from "../components/Chat/ChatMessages";
import ChatInput from "../components/Chat/ChatInput";
import Navbar from "../components/Navbar/Navbar";

const Chats = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="chats-page">
      <div className="chat-list-container">
        <ChatList onSelectChat={setSelectedChat} />
      </div>
      {selectedChat ? (
        <div className="chat-container">
          <ChatMessages chatId={selectedChat} />
          <ChatInput chatId={selectedChat} />
        </div>
      ) : (
        <div className="chat-placeholder">Выберите чат, чтобы начать общение</div>
      )}
            <Navbar />

    </div>
  );
};

export default Chats;

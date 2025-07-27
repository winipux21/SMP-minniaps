import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chats from './pages/Chats';
import Profile from './pages/Profile';
import RequestDetails from './pages/RequestDetails';
import ChatRoom from "./components/Chat/ChatRoom"; // Импорт компонента чата
import ChatMessages from './components/Chat/ChatMessages'; // Импортируем компонент для сообщений
import RequestForm from "./components/Forms/RequestForm";
import PetForm from "./components/Forms/PetForm"; // Импорт формы для питомца

const AppRoutes = () => (
    <Routes>
        {/* Основная страница */}
        <Route path="/" element={<Home />} />
        
        {/* Страницы чатов */}
        <Route path="/chats" element={<Chats />} />
        <Route path="/chat/:chatId" element={<ChatRoom />} />

        {/* Профиль пользователя */}
        <Route path="/profile" element={<Profile />} />

        {/* Форма заявок */}
        <Route path="/request/new" element={<RequestForm />} /> {/* Форма для людей */}
        <Route path="/request/pet/new" element={<PetForm />} /> {/* Форма для питомцев */}

        {/* Детали заявки */}
        <Route path="/request/:id" element={<RequestDetails />} />
    </Routes>
);

export default AppRoutes;

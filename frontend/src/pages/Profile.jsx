import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getRequestsByRole } from "../services/requestService";
import { createChat } from "../services/chatService";
import "./Profile.css";
import Navbar from "../components/Navbar/Navbar";
import { updateRequestStatus } from "../services/requestService"; // добавь эту строку

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user) return;

      try {
        const response = await getRequestsByRole(user.vkId);
        setRequests(response);
      } catch (err) {
        console.error("Ошибка при загрузке заявок:", err.message);
        setError(null); // Убираем ошибку, если она есть
        if (err.message === 'Заявки не найдены.') {
          setRequests([]); // Устанавливаем пустой список заявок
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  const handleStatusChange = async (id, status) => {
    try {
      if (!user) {
        alert("Не удалось получить данные пользователя.");
        return;
      }

      const updatedRequest = await updateRequestStatus(id, {
        status,
        vkId: user.vkId,
        firstName: user.firstName,
        lastName: user.lastName,
      });

      if (status === "approved") {
        console.log("Статус изменён на approved. Создаём чат...");
        await createChat(id);
        console.log("Чат успешно создан.");
      }

      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? updatedRequest.data : request
        )
      );
    } catch (error) {
      console.error("Ошибка обновления статуса или создания чата:", error);
      alert("Не удалось обновить статус или создать чат.");
    }
  };

  if (!user) {
    return <div className="profile-loading">Загрузка профиля...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-info">
        <img
          src={user.photo}
          alt={`${user.firstName} ${user.lastName}`}
          className="profile-avatar"
        />
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <p>ID: {user.vkId}</p>
        <p>Роль: {user.role === "moderator" ? "Модератор" : "Пользователь"}</p>
      </div>

      <div className="profile-requests">
        <h2>{user.role === "moderator" ? "Все заявки" : "Ваши заявки:"}</h2>
        {loading ? (
          <p>Загрузка заявок...</p>
        ) : requests.length === 0 ? (
          <p className="no-requests">У вас пока что нет заявок.</p> // Новое сообщение
        ) : (
          <ul>
            {requests.map((req) => (
              <li key={req._id} className={`request-item status-${req.status}`}>
                <h3>{req.type === "human" ? "Пропавший человек" : "Пропавший питомец"}</h3>
                <p>
                  <strong>Имя:</strong>{" "}
                  {req.type === "human"
                    ? req.details.missingPerson.fullName
                    : req.details.missingPet.name}
                </p>
                <p>
                  <strong>Статус:</strong> {req.status}
                </p>
                {user.role === "moderator" && req.status === "pending" && (
                  <div>
                    <button
                      className="approve-button"
                      onClick={() => handleStatusChange(req._id, "approved")}
                    >
                      Принять
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handleStatusChange(req._id, "rejected")}
                    >
                      Отклонить
                    </button>
                  </div>
                )}
                {req.status === "approved" && (
                  <button
                    className="complete-button"
                    onClick={() => handleStatusChange(req._id, "completed")}
                  >
                    Завершить
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Navbar />
    </div>
  );
};

export default Profile;

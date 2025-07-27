import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { useStyle } from "../../contexts/StyleContext";
import { getRequests } from "../../services/requestService";
import { joinChat } from "../../services/chatService";

import menIcon from "../../assets/menface.png";
import dogIcon from "../../assets/dogface.png";
import "./MapView.css";

const MapView = () => {
  const { style } = useStyle(); // Получаем текущий стиль (human или pet)
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getRequests(); // Получаем данные заявок
        const filteredReports = data.filter(
          (item) => item.type === style && item.details
        );
        setReports(filteredReports);
      } catch (err) {
        console.error("Ошибка при получении данных для карты:", err);
        setError("Не удалось загрузить данные для карты.");
      }
    };

    fetchReports();
  }, [style]);

  // Функция для присоединения к чату
  const handleJoinChat = async (chatId) => {
    try {
      const vkId = localStorage.getItem("vk_id"); // Получение VK ID из localStorage
      if (!vkId) {
        alert("Пожалуйста, авторизуйтесь, чтобы присоединиться к чату.");
        return;
      }

      const firstName = localStorage.getItem("vk_first_name") || "Имя";
      const lastName = localStorage.getItem("vk_last_name") || "Фамилия";

      await joinChat(chatId, { vkId, firstName, lastName }); // Используем _id чата
      alert("Вы успешно присоединились к чату!");
    } catch (error) {
      console.error("Ошибка присоединения к чату:", error);
      alert("Не удалось присоединиться к чату. Попробуйте снова.");
    }
  };

  const formatDetails = (details, type) => {
    if (type === "human") {
      return `
        <p><strong>ФИО пропавшего:</strong> ${details?.fullName || "Не указано"}</p>
        <p><strong>Пол:</strong> ${details?.gender || "Не указано"}</p>
        <p><strong>Дата рождения:</strong> ${details?.birthDate || "Не указано"}</p>
        <p><strong>Адрес пропажи:</strong> ${details?.locationPerson?.address || "Не указано"}</p>
        <p><strong>Дата пропажи:</strong> ${details?.disappearanceDate || "Не указано"}</p>
        <p><strong>Время пропажи:</strong> ${details?.disappearanceTime || "Не указано"}</p>
        <p><strong>Состояние здоровья:</strong> ${details?.healthStatus || "Не указано"}</p>
        <p><strong>Доп. информация:</strong> ${details?.additionalInfo || "Не указано"}</p>
        <p><strong>Телефон:</strong> ${details?.phoneNumber || "Не указано"}</p>
      `;
    } else {
      return `
        <p><strong>Имя питомца:</strong> ${details?.name || "Не указано"}</p>
        <p><strong>Вид:</strong> ${details?.species || "Не указано"}</p>
        <p><strong>Порода:</strong> ${details?.breed || "Не указано"}</p>
        <p><strong>Пол:</strong> ${details?.gender || "Не указано"}</p>
        <p><strong>Дата рождения:</strong> ${details?.birthDate || "Не указано"}</p>
        <p><strong>Адрес пропажи:</strong> ${details?.locationPet?.address || "Не указано"}</p>
        <p><strong>Дата пропажи:</strong> ${details?.disappearanceDate || "Не указано"}</p>
        <p><strong>Приметы:</strong> ${details?.specialTraits || "Не указано"}</p>
        <p><strong>Телефон:</strong> ${details?.phoneNumber || "Не указано"}</p>
      `;
    }
  };

  return (
    <div className="map-container">
      {error && <p className="map-error">{error}</p>}
      <YMaps>
        <Map
          defaultState={{ center: [56.326887, 44.005986], zoom: 12 }}
          width="100%"
          height="600px"
        >
          {reports.map((report) => {
            const { missingPerson, missingPet } = report.details || {};
            const details = style === "human" ? missingPerson : missingPet;

            const coordinates = details?.locationPerson?.coordinates || details?.locationPet?.coordinates;

            if (!coordinates) {
              console.warn(`Отсутствуют координаты для отчёта с ID: ${report._id}`);
              return null; // Пропускаем элементы без координат
            }

            return (
              <Placemark
                key={report._id}
                geometry={[coordinates.latitude, coordinates.longitude]}
                options={{
                  iconLayout: "default#image",
                  iconImageHref: style === "human" ? menIcon : dogIcon,
                  iconImageSize: [40, 40],
                  iconImageOffset: [-20, -20],
                }}
                properties={{
                  balloonContentHeader: `<strong>Заявка #${report._id}</strong>`,
                  balloonContentBody: formatDetails(details, style),
                }}
                modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
                onBalloonOpen={() => {
                  const chatId = report._id;
                  const button = document.createElement("button");
                  button.textContent = "Присоединиться к чату";
                  button.onclick = () => handleJoinChat(chatId);
                  document.querySelector(".ymaps-2-1-79-balloon__content")?.appendChild(button);
                }}
              />
            );
          })}
        </Map>
      </YMaps>
    </div>
  );
};

export default MapView;

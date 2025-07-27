import React, { useState } from "react";
import { createRequest } from "../../services/requestService";

const HumanForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    applicantName: "",
    missingName: "",
    gender: "М", // Исправлено значение по умолчанию
    birthDate: "",
    location: "",
    phone: "",
    disappearanceDate: "",
    disappearanceTime: "",
    healthStatus: "Нормальное",
    additionalInfo: "",
    clothingTop: "",
    clothingBottom: "",
    hair: "",
    belongings: "",
    photo: null,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const validateForm = () => {
    if (!formData.applicantName || !formData.missingName || !formData.phone || !formData.location) {
      setErrorMessage("Пожалуйста, заполните все обязательные поля.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
  
    if (!validateForm()) return;
  
    try {
      const details = {
        missingPerson: {
          fullName: formData.missingName,
          gender: formData.gender, // Передаём исправленное значение
          birthDate: formData.birthDate,
          locationPerson: { address: formData.location },
          phoneNumber: formData.phone,
          disappearanceDate: formData.disappearanceDate,
          disappearanceTime: formData.disappearanceTime,
          healthStatus: formData.healthStatus,
          additionalInfo: formData.additionalInfo,
          clothingTop: formData.clothingTop,
          clothingBottom: formData.clothingBottom,
          hair: formData.hair,
          belongings: formData.belongings,
        },
      };
  
      const data = new FormData();
      data.append("applicantName", formData.applicantName);
      data.append("vkId", localStorage.getItem("vk_id")); // Добавляем VK ID
      data.append("type", "human");
      data.append("details", JSON.stringify(details)); // Преобразуем объект в строку JSON
      if (formData.photo) {
        data.append("photo", formData.photo);
      }
  
      console.log("Данные отправлены на сервер:", Array.from(data.entries()));
  
      await createRequest(data);
      alert("Заявка успешно отправлена!");
      onClose();
    } catch (error) {
      console.error("Ошибка отправки заявки:", error);
      setErrorMessage("Не удалось отправить заявку. Попробуйте снова.");
    }
  };

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <h2>Заявка на поиск человека</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <label>Ваше ФИО:</label>
      <input
        type="text"
        name="applicantName"
        value={formData.applicantName}
        onChange={handleChange}
        required
      />

      <label>ФИО пропавшего:</label>
      <input
        type="text"
        name="missingName"
        value={formData.missingName}
        onChange={handleChange}
        required
      />

      <label>Пол:</label>
      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="М">Мужской</option> {/* Исправлено значение */}
        <option value="Ж">Женский</option> {/* Исправлено значение */}
      </select>

      <label>Дата рождения:</label>
      <input
        type="date"
        name="birthDate"
        value={formData.birthDate}
        onChange={handleChange}
      />

      <label>Место пропажи:</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <label>Контактный телефон:</label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+7 (XXX) XXX-XX-XX"
        required
      />

      <label>Дата пропажи:</label>
      <input
        type="date"
        name="disappearanceDate"
        value={formData.disappearanceDate}
        onChange={handleChange}
      />

      <label>Время пропажи:</label>
      <input
        type="time"
        name="disappearanceTime"
        value={formData.disappearanceTime}
        onChange={handleChange}
      />

      <label>Состояние здоровья:</label>
      <input
        type="text"
        name="healthStatus"
        value={formData.healthStatus}
        onChange={handleChange}
      />

      <label>Дополнительная информация:</label>
      <textarea
        name="additionalInfo"
        value={formData.additionalInfo}
        onChange={handleChange}
        rows="4"
      ></textarea>

      <label>Фото:</label>
      <input type="file" name="photo" onChange={handleFileChange} />

      <div className="form-buttons">
        <button type="submit">Отправить</button>
        <button type="button" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </form>
  );
};

export default HumanForm;

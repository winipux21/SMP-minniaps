import React from "react";
import "./RequestForm.css";

// Функция для форматирования телефонного номера
const formatPhoneNumber = (input) => {
  input = input.replace(/\D/g, ""); // Удаляем все нечисловые символы
  if (input.startsWith("7") || input.startsWith("8")) {
    input = input.slice(1); // Убираем первую цифру, если это 7 или 8
  }
  if (input.length > 10) {
    input = input.slice(0, 10); // Ограничиваем длину до 10 цифр
  }
  return `+7 (${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 8)}-${input.slice(8, 10)}`;
};

const RequestFormPageTwo = ({ formData, handleChange, onBack, onSubmit }) => {
  return (
    <div className="form-container">
      <h2 className="form-title">Контакты заявителя</h2>
      <div className="form-group">
        <label>Как к вам обращаться?</label>
        <input
          type="text"
          value={formData.applicantName}
          onChange={(e) => handleChange("applicantName", e.target.value)}
          placeholder="Введите имя"
        />
      </div>
      <div className="form-group">
        <label>Номер телефона для связи:</label>
        <input
          type="tel"
          value={formData.applicantPhone}
          onChange={(e) =>
            handleChange("applicantPhone", formatPhoneNumber(e.target.value))
          }
          placeholder="+7 (XXX) XXX-XX-XX"
        />
      </div>
      <div className="form-group">
        <label>Номер телефона пропавшего:</label>
        <input
          type="tel"
          value={formData.missingPhone}
          onChange={(e) =>
            handleChange("missingPhone", formatPhoneNumber(e.target.value))
          }
          placeholder="+7 (XXX) XXX-XX-XX"
        />
      </div>
      <div className="form-group">
        <label>Фотография пропавшего:</label>
        <input
          type="file"
          onChange={(e) => handleChange("photo", e.target.files[0])}
          accept="image/*"
        />
      </div>
      <div className="form-group">
        <label>Дополнительная информация:</label>
        <textarea
          value={formData.additionalInfo}
          onChange={(e) => handleChange("additionalInfo", e.target.value)}
          placeholder="Опишите обстоятельства пропажи"
        />
      </div>
      <div className="form-buttons">
        <button className="exit" onClick={onBack}>
          Назад
        </button>
        <button className="next" onClick={onSubmit}>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default RequestFormPageTwo;

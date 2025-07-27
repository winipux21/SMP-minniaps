import React from "react";
import "./RequestForm.css";

const RequestFormPageOne = ({ formData, handleChange, onNext, onExit }) => {
  return (
    <div className="form-container">
      <h2 className="form-title">Информация о пропавшем</h2>
      <div className="form-group">
        <label>ФИО пропавшего:</label>
        <input
          type="text"
          value={formData.missingFullName}
          onChange={(e) => handleChange("missingFullName", e.target.value)}
          placeholder="Введите имя"
        />
      </div>
      <div className="form-group">
        <label>Пол пропавшего:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="Мужской"
              checked={formData.gender === "Мужской"}
              onChange={() => handleChange("gender", "Мужской")}
            />
            Мужской
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Женский"
              checked={formData.gender === "Женский"}
              onChange={() => handleChange("gender", "Женский")}
            />
            Женский
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Адрес пропажи:</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="Введите адрес"
        />
      </div>
      <div className="form-group">
        <label>Дата рождения:</label>
        <input
          type="date"
          value={formData.birthDate}
          onChange={(e) => handleChange("birthDate", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Дата и время пропажи:</label>
        <input
          type="date"
          value={formData.disappearanceDate}
          onChange={(e) => handleChange("disappearanceDate", e.target.value)}
        />
        <input
          type="time"
          value={formData.disappearanceTime}
          onChange={(e) => handleChange("disappearanceTime", e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Состояние здоровья:</label>
        <select
          value={formData.healthStatus}
          onChange={(e) => handleChange("healthStatus", e.target.value)}
        >
          <option value="Нормальное">Нормальное</option>
          <option value="Плохое">Плохое</option>
          <option value="Хорошее">Хорошее</option>
        </select>
      </div>
      <div className="form-buttons">
        <button className="exit" onClick={onExit}>
          Выйти
        </button>
        <button className="next" onClick={onNext}>
          Далее
        </button>
      </div>
    </div>
  );
};

export default RequestFormPageOne;

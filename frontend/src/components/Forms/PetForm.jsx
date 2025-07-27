import React, { useState } from "react";
import { createRequest } from "../../services/requestService";
import { useNavigate } from "react-router-dom";
import "./PetForm.css";

const PetForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    applicantName: "",
    phoneNumber: "",
    petType: "", // Выбор из допустимых значений
    petName: "",
    petBreed: "",
    petColor: "",
    disappearanceAddress: "",
    photo: null,
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Форматирование телефонного номера
  const formatPhoneNumber = (input) => {
    input = input.replace(/\D/g, "");
    if (input.startsWith("7") || input.startsWith("8")) {
      input = input.slice(1);
    }
    if (input.length > 10) {
      input = input.slice(0, 10);
    }
    return `+7 (${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 8)}-${input.slice(8, 10)}`;
  };

  // Обработка изменения данных
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Обработка изменения файла
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  // Валидация формы
  const validateForm = () => {
    const { applicantName, phoneNumber, petType, petName, disappearanceAddress } = formData;
    if (!applicantName || !phoneNumber || !petType || !petName || !disappearanceAddress) {
      setErrorMessage("Пожалуйста, заполните все обязательные поля.");
      return false;
    }
    return true;
  };

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    try {
      const details = {
        missingPet: {
          name: formData.petName,
          species: formData.petType, // Убедитесь, что это соответствует серверным значениям
          breed: formData.petBreed,
          locationPet: { address: formData.disappearanceAddress },
          color: formData.petColor,
        },
      };

      const data = new FormData();
      data.append("applicantName", formData.applicantName);
      data.append("vkId", localStorage.getItem("vk_id"));
      data.append("type", "pet");
      data.append("details", JSON.stringify(details));
      if (formData.photo) {
        data.append("photo", formData.photo);
      }

      await createRequest(data);
      alert("Заявка успешно отправлена!");
      navigate("/");
    } catch (error) {
      console.error("Ошибка отправки заявки:", error.response?.data || error.message);
      setErrorMessage("Не удалось отправить заявку. Проверьте введённые данные.");
    }
  };

  return (
    <form className="pet-form" onSubmit={handleSubmit}>
      <h2>Заявка на поиск питомца</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}

      <label>Ваше ФИО:</label>
      <input
        type="text"
        name="applicantName"
        value={formData.applicantName}
        onChange={handleChange}
        required
      />

      <label>Номер телефона для связи:</label>
      <input
        type="tel"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            phoneNumber: formatPhoneNumber(e.target.value),
          }))
        }
        placeholder="+7 (XXX) XXX-XX-XX"
        required
      />

      <label>Тип питомца:</label>
      <select
        name="petType"
        value={formData.petType}
        onChange={handleChange}
        required
      >
        <option value="">Выберите тип питомца</option>
        <option value="Кошка">Кошка</option>
        <option value="Собака">Собака</option>
        <option value="Попугай">Попугай</option>
        <option value="Рыбка">Рыбка</option>
        <option value="Хомяк">Хомяк</option>
        {/* Добавьте другие допустимые значения */}
      </select>

      <label>Кличка питомца:</label>
      <input
        type="text"
        name="petName"
        value={formData.petName}
        onChange={handleChange}
        required
      />

      <label>Порода питомца:</label>
      <input
        type="text"
        name="petBreed"
        value={formData.petBreed}
        onChange={handleChange}
      />

      <label>Цвет питомца:</label>
      <select
        name="petColor"
        value={formData.petColor}
        onChange={handleChange}
        required
      >
        <option value="">Выберите цвет</option>
        <option value="Красный">Красный</option>
        <option value="Оранжевый">Оранжевый</option>
        <option value="Желтый">Желтый</option>
        <option value="Зеленый">Зеленый</option>
        <option value="Голубой">Голубой</option>
        <option value="Синий">Синий</option>
        <option value="Фиолетовый">Фиолетовый</option>
        <option value="Чёрный">Чёрный</option>
        <option value="Белый">Белый</option>
      </select>

      <label>Адрес пропажи:</label>
      <input
        type="text"
        name="disappearanceAddress"
        value={formData.disappearanceAddress}
        onChange={handleChange}
        required
      />

      <label>Фотография питомца:</label>
      <input type="file" name="photo" onChange={handleFileChange} />

      <div className="form-buttons">
        <button type="button" className="exit" onClick={() => navigate("/")}>
          Выйти
        </button>
        <button type="submit" className="submit">
          Отправить
        </button>
      </div>
    </form>
  );
};

export default PetForm;

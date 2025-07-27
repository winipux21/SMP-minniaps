import React, { useState } from "react";
import RequestFormPageOne from "./RequestFormPageOne";
import RequestFormPageTwo from "./RequestFormPageTwo";
import PetForm from "./PetForm";
import { useStyle } from "../../contexts/StyleContext";
import { createRequest } from "../../services/requestService";
import { useNavigate } from "react-router-dom";

const RequestForm = () => {
  const { style } = useStyle(); // Получаем текущий стиль (human/pet)
  const navigate = useNavigate(); // Для перехода на главную страницу
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница для человека

  // Данные для формы человека
  const [formData, setFormData] = useState({
    missingFullName: "",
    gender: "М",
    address: "",
    birthDate: "",
    disappearanceDate: "",
    disappearanceTime: "",
    healthStatus: "Нормальное",
    applicantName: "",
    applicantPhone: "",
    missingPhone: "",
    additionalInfo: "",
    photo: null,
  });

  // Обработка изменения данных
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Переход между страницами формы для человека
  const handleNext = () => setCurrentPage(2);
  const handleBack = () => setCurrentPage(1);

  // Обработка отправки формы человека
  const handleSubmit = async () => {
    const { applicantName, applicantPhone, missingFullName, gender, address } = formData;

    // Проверяем обязательные поля перед отправкой
    if (!applicantName || !applicantPhone || !missingFullName || !gender || !address) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    try {
      const data = new FormData();
      data.append("applicantName", formData.applicantName);
      data.append("vkId", localStorage.getItem("vk_id"));
      data.append("type", "human");
      data.append(
        "details",
        JSON.stringify({
          missingPerson: {
            fullName: formData.missingFullName,
            gender: formData.gender === "Мужской" ? "М" : "Ж", // Преобразование гендера
            birthDate: formData.birthDate,
            locationPerson: { address: formData.address },
            phoneNumber: formData.missingPhone,
            disappearanceDate: formData.disappearanceDate,
            disappearanceTime: formData.disappearanceTime,
            healthStatus: formData.healthStatus,
            additionalInfo: formData.additionalInfo,
          },
        })
      );
      if (formData.photo) data.append("photo", formData.photo);

      await createRequest(data);
      alert("Заявка успешно отправлена!");
      navigate("/");
    } catch (error) {
      console.error("Ошибка отправки заявки:", error);
      alert("Не удалось отправить заявку. Попробуйте снова.");
    }
  };

  return (
    <div>
      {/* Проверяем текущий стиль */}
      {style === "human" ? (
        currentPage === 1 ? (
          <RequestFormPageOne
            formData={formData}
            handleChange={handleChange}
            onNext={handleNext}
            onExit={() => navigate("/")} // Переход на главную при нажатии "Выйти"
          />
        ) : (
          <RequestFormPageTwo
            formData={formData}
            handleChange={handleChange}
            onBack={handleBack}
            onSubmit={handleSubmit} // Обработчик отправки формы человека
          />
        )
      ) : (
        <PetForm onExit={() => navigate("/")} /> // Форма для питомца с кнопкой "Выйти"
      )}
    </div>
  );
};

export default RequestForm;

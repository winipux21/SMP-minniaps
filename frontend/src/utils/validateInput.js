// src/utils/validateInput.js

/**
 * Валидация первой страницы формы
 * @param {Object} formData - Данные формы
 * @returns {Object} errors - Объект с ошибками
 */
export const validateHumanFormPage1 = (formData) => {
  const errors = {};

  if (!formData.missingFullName.trim()) {
    errors.missingFullName = "Введите ФИО пропавшего.";
  }
  if (!formData.gender) {
    errors.gender = "Укажите пол пропавшего.";
  }
  if (!formData.missingAddress.trim()) {
    errors.missingAddress = "Введите адрес пропажи.";
  }
  if (!formData.missingDate) {
    errors.missingDate = "Выберите дату пропажи.";
  }

  return errors;
};

/**
 * Валидация второй страницы формы
 * @param {Object} formData - Данные формы
 * @returns {Object} errors - Объект с ошибками
 */
export const validateHumanFormPage2 = (formData) => {
  const errors = {};

  if (!formData.applicantName.trim()) {
    errors.applicantName = "Введите, как к вам обращаться.";
  }
  if (!/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(formData.applicantPhone)) {
    errors.applicantPhone =
      "Введите номер телефона в формате +7 (XXX) XXX-XX-XX.";
  }

  return errors;
};

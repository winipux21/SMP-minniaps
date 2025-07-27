const Request = require("../models/Request");
const { getCoordinates } = require("../utils/geocoder");
const { logAction } = require("../utils/logger");
const User = require("../models/User");

// Получение заявок пользователя
const getUserRequests = async (req, res) => {
  const { vkId } = req.params;

  try {
    if (!vkId) {
      console.error("VK ID не предоставлен.");
      return res.status(400).json({ message: "VK ID обязателен." });
    }

    console.log(`Получение заявок для VK ID: ${vkId}`);

    // Преобразование vkId к строке для надёжного поиска
    const userRequests = await Request.find({ vkId: String(vkId) });

    if (!userRequests || userRequests.length === 0) {
      console.warn(`Заявки для пользователя VK ID ${vkId} не найдены.`);
      return res.status(404).json({ message: "Заявки не найдены." });
    }

    console.log("Найденные заявки:", userRequests);
    res.status(200).json(userRequests);
  } catch (error) {
    console.error("Ошибка при выполнении getUserRequests:", error.stack);
    res.status(500).json({
      message: "Ошибка на сервере при получении заявок пользователя.",
    });
  }
};

const getRequestsByRole = async (req, res) => {
  const { vkId } = req.params;

  try {
    if (!vkId) {
      return res.status(400).json({ message: "VK ID обязателен." });
    }

    // Получаем пользователя из базы данных
    const user = await User.findOne({ vkId });
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден." });
    }

    // Проверяем роль пользователя
    let requests;
    if (user.role === "moderator") {
      // Если модератор, возвращаем все заявки
      requests = await Request.find();
    } else {
      // Если обычный пользователь, возвращаем только его заявки
      requests = await Request.find({ vkId });
    }

    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "Заявки не найдены." });
    }

    res.status(200).json(requests);
  } catch (error) {
    console.error("Ошибка при выполнении getRequestsByRole:", error.message);
    res.status(500).json({ message: "Ошибка на сервере." });
  }
};

// Создание новой заявки
const createRequest = async (req, res) => {
  try {
    const { applicantName, vkId, type, details } = req.body;

    // Проверка обязательных полей
    if (!applicantName || !vkId || !type || !details) {
      return res.status(400).json({
        message: "Все поля (applicantName, vkId, type, details) обязательны.",
      });
    }

    // Парсинг JSON из details
    let parsedDetails;
    try {
      parsedDetails =
        typeof details === "string" ? JSON.parse(details) : details;
      console.log("Parsed details:", parsedDetails);
    } catch (error) {
      console.error("Ошибка парсинга details:", error.message);
      return res.status(400).json({ message: "Некорректный формат details." });
    }

    // Проверка на наличие файла (опционально)
    let photoPath = null;
    if (req.file) {
      photoPath = `/uploads/${req.file.filename}`;
    }

    // Создание новой заявки
    const newRequest = new Request({
      applicantName,
      vkId,
      type,
      details: {
        ...parsedDetails,
        photo: photoPath,
      },
    });

    await newRequest.save();
    res
      .status(201)
      .json({ message: "Заявка успешно создана", data: newRequest });
  } catch (error) {
    console.error("Ошибка создания заявки:", error.message);
    res.status(500).json({ message: "Ошибка на сервере при создании заявки" });
  }
};

// Получение всех заявок
const getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Получение заявок по типу
const getRequestsByType = async (req, res) => {
  const { type } = req.query;

  try {
    const requests = await Request.find({ type });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status, vkId, firstName, lastName } = req.body;

  try {
    // Проверяем, входит ли статус в разрешённые значения
    const validStatuses = ["pending", "approved", "rejected", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Недопустимый статус" });
    }

    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Заявка не найдена" });
    }

    if (status === "approved") {
      // Обновляем координаты, если их нет
      const address =
        request.type === "human"
          ? request.details.missingPerson.locationPerson?.address
          : request.details.missingPet.locationPet?.address;

      if (address && !request.details.missingPerson?.coordinates) {
        const coordinates = await getCoordinates(address);
        if (!coordinates) {
          return res
            .status(400)
            .json({ message: "Не удалось получить координаты для адреса" });
        }

        if (request.type === "human") {
          request.details.missingPerson.locationPerson.coordinates =
            coordinates;
        } else if (request.type === "pet") {
          request.details.missingPet.locationPet.coordinates = coordinates;
        }
      }
    }

    const previousStatus = request.status;
    request.status = status;
    await request.save();

    await logAction(
      "updateStatus",
      {
        requestId: id,
        previousStatus,
        newStatus: status,
      },
      vkId || "system" // Если `vkId` отсутствует, указываем "system"
    );

    res.json({ message: "Статус обновлён", data: request });
  } catch (error) {
    console.error("Ошибка обновления статуса:", error.message);
    res.status(500).json({ message: "Ошибка на сервере" });
  }
};

// Удаление заявки
const deleteRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRequest = await Request.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: "Заявка не найдена" });
    }

    res.json({ message: "Заявка удалена", data: deletedRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Завершение дела
const completeRequest = async (req, res) => {
  const { id } = req.params;
  const performedBy = req.body.vkId || "system";

  try {
    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Заявка не найдена" });
    }

    request.status = "completed";
    await request.save();

    await logAction("completeRequest", { requestId: id }, performedBy);

    res.json({ message: "Дело завершено", data: request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRequest,
  getRequests,
  getRequestsByType,
  updateRequestStatus,
  deleteRequest,
  completeRequest,
  getUserRequests,
  getRequestsByRole,
};

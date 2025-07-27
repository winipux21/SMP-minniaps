const Request = require("../models/Request");
const { logAction } = require("../utils/logger");
const Chat = require("../models/Chat");

// Получение заявок в статусе "pending"
const getPendingRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: "pending" });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Одобрение заявки и создание чата
// Одобрение заявки и создание чата
const approveRequest = async (req, res) => {
  const { id } = req.params; // ID заявки
  const { vkId, firstName, lastName } = req.body; // Данные модератора

  try {
    console.log(`Начало обработки одобрения заявки: ${id}`);

    const request = await Request.findById(id);
    if (!request) {
      console.log("Заявка не найдена");
      return res.status(404).json({ message: "Заявка не найдена" });
    }

    if (request.status !== "pending") {
      console.log("Заявка уже обработана");
      return res.status(400).json({ message: "Заявка уже обработана" });
    }

    // Обновление статуса заявки
    request.status = "approved";
    await request.save();
    console.log("Статус заявки обновлён на approved");

    // Создание чата
    const chat = new Chat({
      requestId: id,
      participants: [
        {
          vkId, // ID модератора
          firstName,
          lastName,
        },
      ],
    });

    await chat.save();
    console.log("Чат успешно создан:", chat);

    res.json({
      message: "Заявка одобрена и чат создан",
      request,
      chat,
    });
  } catch (error) {
    console.error("Ошибка при одобрении заявки:", error);
    res.status(500).json({ message: "Ошибка на сервере" });
  }
};

// Отклонение заявки
const rejectRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Заявка не найдена" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Заявка уже обработана" });
    }

    request.status = "rejected";
    await request.save();

    res.json({ message: "Заявка отклонена", data: request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Завершение дела
const completeRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Заявка не найдена" });
    }

    if (request.status !== "approved") {
      return res
        .status(400)
        .json({ message: "Заявка не может быть завершена" });
    }

    request.status = "completed";
    await request.save();

    res.json({ message: "Дело завершено", data: request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPendingRequests,
  approveRequest,
  rejectRequest,
  completeRequest,
};

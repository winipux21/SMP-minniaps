const express = require("express");
const {
  getUserChats,
  joinChat,
  sendMessage,
  getChatParticipants,
  leaveChat,
  getChatMessages,
} = require("../controllers/chatController");
const Chat = require("../models/Chat");
const Request = require("../models/Request");

const router = express.Router();

// GET: Получить чаты пользователя
router.get("/:vkId", getUserChats);

// POST: Создать чат по ID заявки
router.post("/", async (req, res) => {
  const { requestId } = req.body;

  try {
    // Проверяем, существует ли заявка
    const existingRequest = await Request.findById(requestId);
    if (!existingRequest) {
      return res.status(404).json({ error: "Заявка не найдена" });
    }

    // Проверяем, существует ли уже чат для этой заявки
    const existingChat = await Chat.findOne({ requestId });
    if (existingChat) {
      return res
        .status(400)
        .json({ error: "Чат для этой заявки уже существует" });
    }

    // Создаём новый чат
    const newChat = new Chat({
      requestId,
      participants: [], // Участники добавляются позже
      messages: [],
    });

    await newChat.save();
    res.status(201).json({ message: "Чат успешно создан", chat: newChat });
  } catch (error) {
    console.error("Ошибка создания чата:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// POST: Присоединиться к чату
router.post("/:chatId/join", joinChat);

// POST: Отправить сообщение
router.post("/:chatId/messages", sendMessage);
// GET: Получить сообщения из чата
router.get("/:chatId/messages", getChatMessages);
// GET: Получить участников чата
router.get("/:chatId/participants", getChatParticipants);

// DELETE: Удалить участника из чата
router.delete("/:chatId/leave", leaveChat);

module.exports = router;

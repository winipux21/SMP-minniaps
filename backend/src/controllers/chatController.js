const Chat = require("../models/Chat");

// Получение всех чатов пользователя
const getUserChats = async (req, res) => {
  const { vkId } = req.params;

  try {
    if (!vkId) {
      return res.status(400).json({ message: "VK ID не предоставлен" });
    }

    const chats = await Chat.find({ "participants.vkId": vkId });

    if (!chats.length) {
      return res.status(404).json({ message: "Чаты не найдены" });
    }

    res.json(chats);
  } catch (error) {
    console.error("Ошибка получения чатов:", error.message);
    res.status(500).json({ message: "Ошибка на сервере при получении чатов" });
  }
};

// Получение участников чата
const getChatParticipants = async (req, res) => {
  const { chatId } = req.params;

  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Чат не найден" });
    }

    res.json(chat.participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Удаление участника из чата
const leaveChat = async (req, res) => {
  const { chatId } = req.params;
  const { vkId } = req.body;

  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Чат не найден" });
    }

    // Удаляем участника
    chat.participants = chat.participants.filter(
      (participant) => participant !== vkId
    );

    if (chat.participants.length === 0) {
      // Удаляем чат, если в нём больше нет участников
      await chat.remove();
      return res.json({ message: "Чат удалён, так как нет участников" });
    }

    await chat.save();
    res.json({ message: "Участник удалён из чата", data: chat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Присоединение пользователя к чату
const joinChat = async (req, res) => {
  const { chatId } = req.params; // Это может быть либо `_id` чата, либо `requestId`
  const { vkId, firstName, lastName } = req.body;

  try {
    console.log(`Проверяем чат с ID: ${chatId}`);

    // Проверяем, является ли `chatId` `_id` чата
    let chat = await Chat.findById(chatId);

    // Если чат не найден, ищем его по `requestId`
    if (!chat) {
      console.log("Чат не найден, пытаемся найти по requestId...");
      chat = await Chat.findOne({ requestId: chatId });
    }

    // Если всё ещё нет результата, возвращаем 404
    if (!chat) {
      console.log("Чат всё ещё не найден");
      return res.status(404).json({ message: "Чат не найден" });
    }

    console.log(`Проверяем участника: ${vkId}`);
    const isParticipant = chat.participants.some(
      (participant) => participant.vkId === vkId
    );
    if (isParticipant) {
      console.log("Пользователь уже в чате");
      return res.status(400).json({ message: "Пользователь уже в чате" });
    }

    console.log(`Добавляем пользователя в чат: ${vkId}`);
    chat.participants.push({ vkId, firstName, lastName });
    await chat.save();

    res.json({ message: "Пользователь успешно добавлен в чат", chat });
  } catch (error) {
    console.error("Ошибка при добавлении пользователя в чат:", error);
    res.status(500).json({ message: "Ошибка на сервере" });
  }
};

const sendMessage = async (req, res) => {
  const { chatId } = req.params;
  const { senderVkId, content } = req.body;

  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Чат не найден" });
    }

    if (!senderVkId || !content) {
      return res
        .status(400)
        .json({ message: "Поля senderVkId и content обязательны" });
    }

    // Добавляем сообщение в базу данных
    const newMessage = { senderVkId, content, timestamp: new Date() };
    chat.messages.push(newMessage);
    await chat.save();

    res
      .status(201)
      .json({ message: "Сообщение отправлено", messages: chat.messages });
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
    res.status(500).json({ message: "Ошибка на сервере" });
  }
};

// Получение сообщений
const getChatMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Чат не найден" });
    }

    res.json(chat.messages);
  } catch (error) {
    console.error("Ошибка при получении сообщений:", error);
    res.status(500).json({ message: "Ошибка на сервере" });
  }
};

module.exports = {
  getUserChats,
  joinChat,
  sendMessage,
  getChatParticipants,
  leaveChat,
  getChatMessages,
};

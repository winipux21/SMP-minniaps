const Chat = require("../models/Chat");

const createChatForRequest = async (requestId, moderator) => {
  try {
    console.log(
      `[createChatForRequest] Создание чата для заявки ID: ${requestId}`
    );
    const chat = new Chat({
      requestId,
      participants: [
        {
          vkId: moderator.vkId,
          firstName: moderator.firstName,
          lastName: moderator.lastName,
        },
      ],
    });

    await chat.save();
    console.log(`[createChatForRequest] Чат создан: ${chat._id}`);
    return chat;
  } catch (error) {
    console.error(
      `[createChatForRequest] Ошибка создания чата: ${error.message}`
    );
    throw error;
  }
};

module.exports = { createChatForRequest };

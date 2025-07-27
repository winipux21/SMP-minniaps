const User = require("../models/User");
// Список модераторов (ID VK пользователей)
const MODERATOR_IDS = ["317295271", "160615679", "205925815"];
/*const MODERATOR_IDS = process.env.MODERATOR_IDS.split(",");*/
const checkModeratorRole = async (req, res, next) => {
  const { vkId } = req.body; // ID пользователя, передаваемый в запросе

  if (!vkId) {
    return res.status(400).json({ message: "Не указан VK ID пользователя." });
  }

  // Проверяем, является ли пользователь модератором
  if (!MODERATOR_IDS.includes(vkId)) {
    return res
      .status(403)
      .json({ message: "Доступ запрещён. Вы не модератор." });
  }

  // Если модератор, продолжаем обработку запроса
  next();
};

module.exports = { checkModeratorRole };

const express = require("express");
const {
  addUser,
  getUserById,
  getUserRequests,
  getUserChats,
} = require("../controllers/userController");
const router = express.Router();

// POST: Добавить нового пользователя
router.post("/", addUser);

// GET: Получить информацию о пользователе по VK ID
router.get("/:vkId", getUserById);

// GET: Получить заявки пользователя
router.get("/:vkId/requests", getUserRequests);

// GET: Получить чаты пользователя
router.get("/:vkId/chats", getUserChats);

module.exports = router;

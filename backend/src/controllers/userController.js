const User = require("../models/User");
const MODERATOR_IDS = ["317295271", "160615679", "205925815"];
// Добавление нового пользователя
const addUser = async (req, res) => {
  const { vkId, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ vkId });
    if (existingUser) {
      return res.status(400).json({ message: "Пользователь уже существует" });
    }

    // Проверяем, является ли пользователь модератором
    const role = MODERATOR_IDS.includes(vkId.toString()) ? "moderator" : "user";

    const newUser = new User({ vkId, firstName, lastName, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Получение информации о пользователе
const getUserById = async (req, res) => {
  const { vkId } = req.params;

  try {
    const user = await User.findOne({ vkId });
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    // Добавление аватарки пользователя через VK API
    const avatarUrl = `https://avatars.vk.com/${vkId}.png`;

    res.json({ ...user.toObject(), avatarUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Получение заявок пользователя
const getUserRequests = async (req, res) => {
  const { vkId } = req.params;

  try {
    const requests = await Request.find({ applicantName: vkId });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Получение чатов пользователя
const getUserChats = async (req, res) => {
  const { vkId } = req.params;

  try {
    const chats = await Chat.find({ participants: vkId });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addUser, getUserById, getUserRequests, getUserChats };

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const cors = require("cors");
const http = require("http"); // Для создания HTTP-сервера
const { Server } = require("socket.io");
const { cleanOldRequests } = require("./src/utils/cleaner");
const Chat = require("./src/models/Chat"); // Импорт модели чата
dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // Создаём HTTP-сервер
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// WebSocket логика
io.on("connection", (socket) => {
  console.log(`Пользователь подключился: ${socket.id}`);

  socket.on("joinRoom", (chatId) => {
    socket.join(chatId);
    console.log(`Пользователь присоединился к комнате: ${chatId}`);
  });

  socket.on("sendMessage", async (data) => {
    const { chatId, message } = data;

    try {
      // Сохраняем сообщение в базе данных
      const chat = await Chat.findById(chatId);
      if (!chat) {
        console.log("Чат не найден");
        return;
      }

      const newMessage = {
        senderVkId: message.senderVkId,
        content: message.content,
        timestamp: new Date(),
      };

      chat.messages.push(newMessage);
      await chat.save();

      // Отправляем сообщение всем участникам комнаты
      io.to(chatId).emit("newMessage", newMessage);
    } catch (error) {
      console.error("Ошибка при сохранении сообщения:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Пользователь отключился: ${socket.id}`);
  });
});

// Подключение маршрутов
app.use("/chat", require("./src/routes/chatRoutes"));
app.use("/users", require("./src/routes/userRoutes"));
app.use("/requests", require("./src/routes/requestRoutes"));
app.use("/moderators", require("./src/routes/moderatorRoutes"));
app.use("/map", require("./src/routes/mapRoutes"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

// Запускаем задачу очистки раз в сутки
setInterval(cleanOldRequests, 24 * 60 * 60 * 1000); // 24 часа

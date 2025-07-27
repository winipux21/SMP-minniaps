const Request = require("../models/Request");

// Очистка заявок со статусом "rejected" и "completed"
const cleanOldRequests = async () => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    // Удаляем отклонённые заявки старше 1 дня
    const rejectedRequests = await Request.deleteMany({
      status: "rejected",
      updatedAt: { $lt: oneDayAgo },
    });

    console.log(`${rejectedRequests.deletedCount} отклонённых заявок удалено.`);

    // Удаляем завершённые заявки старше 30 дней
    const completedRequests = await Request.deleteMany({
      status: "completed",
      updatedAt: { $lt: thirtyDaysAgo },
    });

    console.log(
      `${completedRequests.deletedCount} завершённых заявок удалено.`
    );
  } catch (error) {
    console.error("Ошибка очистки заявок:", error.message);
  }
};

module.exports = { cleanOldRequests };

const Log = require("../models/Log");

// Логирование действий
const logAction = async (action, details, performedBy) => {
  try {
    if (!performedBy) {
      throw new Error("performedBy is required for logging.");
    }
    const log = new Log({ action, details, performedBy });
    await log.save();
    console.log("Действие залогировано:", action);
  } catch (error) {
    console.error("Ошибка логирования:", error.message);
  }
};

module.exports = { logAction };

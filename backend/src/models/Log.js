const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  action: { type: String, required: true }, // Например: "updateStatus", "addCoordinates"
  details: { type: Object, required: true }, // Подробности действия
  performedBy: { type: String, required: true }, // VK ID пользователя
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Log", LogSchema);

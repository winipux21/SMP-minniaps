const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Request", // Связь с моделью заявки
    required: true,
  },
  participants: [
    {
      vkId: { type: String, required: true },
      firstName: { type: String },
      lastName: { type: String },
    },
  ],
  messages: [
    {
      senderVkId: { type: String, required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chat", ChatSchema);

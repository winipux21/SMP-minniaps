const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  vkId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, default: "user" }, // user | moderator
});

module.exports = mongoose.model("User", UserSchema);

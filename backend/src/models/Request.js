const mongoose = require("mongoose");

const MissingPersonSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gender: { type: String, enum: ["М", "Ж"], required: true },
  birthDate: { type: Date },
  locationPerson: {
    address: { type: String, required: true },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
  },
  phoneNumber: { type: String, required: true },
  disappearanceDate: { type: Date },
  disappearanceTime: { type: String },
  healthStatus: { type: String },
  additionalInfo: { type: String },
  clothingTop: { type: String },
  clothingBottom: { type: String },
  hair: { type: String },
  belongings: { type: String },
  photo: { type: String },
});

const MissingPetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String },
  gender: { type: String, enum: ["М", "Ж"] },
  birthDate: { type: Date },
  locationPet: {
    address: { type: String, required: true },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
  },
  disappearanceDate: { type: Date },
  disappearanceTime: { type: String },
  healthStatus: { type: String },
  specialTraits: { type: String },
  color: { type: String },
  size: { type: String },
  collarInfo: { type: String },
  belongings: { type: String },
  photo: { type: String },
});

const RequestSchema = new mongoose.Schema({
  applicantName: { type: String, required: true },
  vkId: { type: String, required: true }, // Связь с VK ID пользователя
  type: { type: String, enum: ["human", "pet"], required: true },
  details: {
    missingPerson: {
      type: MissingPersonSchema,
      required: function () {
        return this.type === "human";
      },
    },
    missingPet: {
      type: MissingPetSchema,
      required: function () {
        return this.type === "pet";
      },
    },
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "completed"],
    default: "pending", // По умолчанию статус "в рассмотрении"
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Request", RequestSchema);

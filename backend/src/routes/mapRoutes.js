const express = require("express");
const {
  getMapMarkers,
  updateMarkerCoordinates,
} = require("../controllers/mapController");
const router = express.Router();

// GET: Получить заявки для карты с координатами
router.get("/", getMapMarkers);

// PATCH: Обновить координаты маркера
router.patch("/:id", updateMarkerCoordinates);

module.exports = router;

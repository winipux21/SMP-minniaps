const express = require("express");
const {
  createRequest,
  getRequests,
  getRequestsByType,
  updateRequestStatus,
  deleteRequest,
  completeRequest,
  getUserRequests,
  getRequestsByRole,
} = require("../controllers/requestController");
const upload = require("../utils/upload");
const router = express.Router();

// POST: Создать заявку
router.post("/", upload, createRequest);

// GET: Получить все заявки
router.get("/", getRequests);
router.get("/users/:vkId/requests", getRequestsByRole);
// GET: Получить заявки по типу
router.get("/filter", getRequestsByType);

// PATCH: Обновить статус заявки
router.patch("/:id", updateRequestStatus);

// DELETE: Удалить заявку
router.delete("/:id", deleteRequest);

// PATCH: Завершить дело
router.patch("/:id/complete", completeRequest);

module.exports = router;
